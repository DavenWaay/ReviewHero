import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreateStudySet.module.css";
import { FaPlus, FaCog, FaShareAlt, FaTimes } from "react-icons/fa";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { flashcardAPI, authAPI } from "../services/api";

const CreateStudySet = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [flashcards, setFlashcards] = useState([
    { term: "", definition: "" },
    { term: "", definition: "" },
  ]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showNotesModal, setShowNotesModal] = useState(false);
  const [notesText, setNotesText] = useState("");

  const handleFlashcardChange = (index, field, value) => {
    const updatedFlashcards = [...flashcards];
    updatedFlashcards[index][field] = value;
    setFlashcards(updatedFlashcards);
  };

  const addFlashcard = () => {
    setFlashcards([...flashcards, { term: "", definition: "" }]);
  };

  const removeFlashcard = useCallback(
    (index) => {
      if (window.confirm("Are you sure you want to delete this flashcard?")) {
        const updatedFlashcards = flashcards.filter((_, i) => i !== index);
        setFlashcards(updatedFlashcards);
      }
    },
    [flashcards]
  );

  const handleCreateFromNotes = () => {
    try {
      const text = notesText.trim();
      if (!text) {
        alert("Please enter some notes to convert");
        return;
      }

      let newCards = [];
      
      // Try different parsing strategies
      const lines = text.split('\n').filter(line => line.trim());
      
      for (let line of lines) {
        line = line.trim();
        if (!line) continue;
        
        let term = '';
        let definition = '';
        
        // Strategy 1: Look for common separators (: - = |)
        const separators = [':', ' - ', ' = ', ' | ', '\t'];
        let found = false;
        
        for (let sep of separators) {
          if (line.includes(sep)) {
            const parts = line.split(sep);
            if (parts.length >= 2) {
              term = parts[0].trim();
              definition = parts.slice(1).join(sep).trim();
              found = true;
              break;
            }
          }
        }
        
        // Strategy 2: Look for bullet points or numbers
        if (!found) {
          const bulletMatch = line.match(/^[\d\w\-\*\•]\s*[\.\)\-\s]\s*(.+)/);
          if (bulletMatch) {
            const content = bulletMatch[1];
            // Try to split the content
            for (let sep of separators) {
              if (content.includes(sep)) {
                const parts = content.split(sep);
                if (parts.length >= 2) {
                  term = parts[0].trim();
                  definition = parts.slice(1).join(sep).trim();
                  found = true;
                  break;
                }
              }
            }
          }
        }
        
        // Strategy 3: Look for parentheses (Term (definition))
        if (!found) {
          const parenMatch = line.match(/^([^(]+)\s*\(([^)]+)\)$/);
          if (parenMatch) {
            term = parenMatch[1].trim();
            definition = parenMatch[2].trim();
            found = true;
          }
        }
        
        // Strategy 4: Look for quotes ("Term" definition)
        if (!found) {
          const quoteMatch = line.match(/^["']([^"']+)["']\s*(.+)$/);
          if (quoteMatch) {
            term = quoteMatch[1].trim();
            definition = quoteMatch[2].trim();
            found = true;
          }
        }
        
        // Strategy 5: If line is long enough, try to split in half
        if (!found && line.length > 20) {
          const words = line.split(' ');
          if (words.length >= 4) {
            const midPoint = Math.floor(words.length / 2);
            term = words.slice(0, midPoint).join(' ').trim();
            definition = words.slice(midPoint).join(' ').trim();
            found = true;
          }
        }
        
        if (found && term && definition && term.length > 0 && definition.length > 0) {
          // Clean up the term and definition
          term = term.replace(/^[\d\w\-\*\•]\s*[\.\)\-\s]*/, '').trim();
          definition = definition.replace(/^[\-\s]*/, '').trim();
          
          if (term && definition) {
            newCards.push({ term, definition });
          }
        }
      }
      
      if (newCards.length === 0) {
        alert(`Could not parse any flashcards from your notes. Try using formats like:
        
• Term: Definition
• Term - Definition  
• Term = Definition
• 1. Term: Definition
• "Term" Definition
• Term (Definition)`);
        return;
      }
      
      // Replace existing flashcards if they're empty, otherwise add to them
      const hasEmptyCards = flashcards.some(card => !card.term.trim() && !card.definition.trim());
      if (hasEmptyCards) {
        setFlashcards(newCards);
      } else {
        setFlashcards([...flashcards, ...newCards]);
      }
      
      setShowNotesModal(false);
      setNotesText("");
      
      // Show success message
      alert(`Successfully created ${newCards.length} flashcard${newCards.length === 1 ? '' : 's'} from your notes!`);
      
    } catch (err) {
      console.error('Error parsing notes:', err);
      alert("Could not parse notes. Please check the format and try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    const validCards = flashcards.filter(
      (card) => card.term.trim() !== "" && card.definition.trim() !== ""
    );
    if (validCards.length < 2) {
      setError("Please add at least 2 valid flashcards");
      return;
    }

    setIsSubmitting(true);
    try {
      await flashcardAPI.create({
        title: title.trim(),
        description: description.trim(),
        cards: validCards,
      });
      setIsSubmitting(false);
      navigate("/studysets");
    } catch (err) {
      console.error("Error creating study set:", err);
      setError("Failed to create study set. Please try again.");
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const initUser = async () => {
      if (!loading) {
        if (!user) {
          navigate("/login");
        } else {
          try {
            const idToken = await user.getIdToken();
            await authAPI.login(idToken);
          } catch (error) {
            console.error("Error initializing user:", error);
            setError("Error initializing user. Please try logging in again.");
          }
        }
      }
    };

    initUser();
  }, [user, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>
        Create New Flashcard Set
        <button
          className={styles.closeButton}
          title="Close"
          onClick={() => navigate(-1)}
        >
          &#x2715;
        </button>
      </h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Title"
          className={styles.inputField}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          className={styles.inputField}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className={styles.buttonGroup}>
          <button
            type="button"
            className={styles.greenButton}
            onClick={() => setShowNotesModal(true)}
          >
            <FaPlus /> Create from Notes
          </button>
          <button
            type="button"
            className={styles.settingsButton}
            title="Settings"
            onClick={() => alert("Settings feature coming soon!")}
          >
            <FaCog />
          </button>
        </div>
        {flashcards.map((card, index) => (
          <div key={index} className={styles.flashcardItem}>
            <div className={styles.flashcardHeader}>
              <span>{index + 1}</span>
              <div>
                <button
                  type="button"
                  className={styles.iconButton}
                  title="Share"
                  onClick={() => alert("Share feature coming soon!")}
                >
                  <FaShareAlt />
                </button>
                <button
                  type="button"
                  className={styles.iconButton}
                  title="Delete"
                  onClick={() => removeFlashcard(index)}
                >
                  <FaTimes />
                </button>
              </div>
            </div>
            <div className={styles.flashcardInputs}>
              <input
                type="text"
                placeholder="Enter a Term"
                className={styles.termInput}
                value={card.term}
                onChange={(e) =>
                  handleFlashcardChange(index, "term", e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Enter a Definition"
                className={styles.definitionInput}
                value={card.definition}
                onChange={(e) =>
                  handleFlashcardChange(index, "definition", e.target.value)
                }
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          className={styles.addCardButton}
          onClick={addFlashcard}
          title="Add Flashcard"
        >
          <FaPlus /> Add Card
        </button>
        {error && <div className={styles.error}>{error}</div>}
        <button
          type="submit"
          disabled={isSubmitting}
          className={styles.submitButton}
        >
          {isSubmitting ? "Creating..." : "Create Study Set"}
        </button>
      </form>

      {showNotesModal && (
        <>
          <div className={styles.modalOverlay} onClick={() => setShowNotesModal(false)} />
          <div className={styles.modal}>
            <h3>🚀 Create from Notes</h3>
            <p className={styles.modalDescription}>
              Paste your notes below and we'll automatically convert them into flashcards! 
              We support multiple formats:
            </p>
            <div className={styles.formatExamples}>
              <div className={styles.formatExample}>
                <strong>Colon format:</strong> Term: Definition
              </div>
              <div className={styles.formatExample}>
                <strong>Dash format:</strong> Term - Definition
              </div>
              <div className={styles.formatExample}>
                <strong>Numbered:</strong> 1. Term: Definition
              </div>
              <div className={styles.formatExample}>
                <strong>Bullet points:</strong> • Term: Definition
              </div>
              <div className={styles.formatExample}>
                <strong>Parentheses:</strong> Term (Definition)
              </div>
            </div>
            <textarea
              className={styles.textArea}
              placeholder={`Paste your notes here! Examples:

Photosynthesis: The process by which plants make food from sunlight
Mitochondria - The powerhouse of the cell
1. DNA: Deoxyribonucleic acid that carries genetic information
• RNA: Ribonucleic acid involved in protein synthesis
Nucleus (The control center of the cell)

We'll automatically detect the format and create flashcards for you!`}
              value={notesText}
              onChange={(e) => setNotesText(e.target.value)}
            />
            <div className={styles.modalButtons}>
              <button
                onClick={handleCreateFromNotes}
                className={styles.greenButton}
                disabled={!notesText.trim()}
              >
                ✨ Convert to Flashcards
              </button>
              <button
                onClick={() => setShowNotesModal(false)}
                className={styles.cancelButton}
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CreateStudySet;

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

  const handleFlashcardChange = (index, field, value) => {
    const updatedFlashcards = [...flashcards];
    updatedFlashcards[index][field] = value;
    setFlashcards(updatedFlashcards);
  };

  const addFlashcard = () => {
    setFlashcards([...flashcards, { term: "", definition: "" }]);
  };

  const removeFlashcard = useCallback((index) => {
    if (window.confirm('Are you sure you want to delete this flashcard?')) {
      const updatedFlashcards = flashcards.filter((_, i) => i !== index);
      setFlashcards(updatedFlashcards);
    }
  }, [flashcards]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    // Validate inputs
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    // Validate minimum number of cards
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
        cards: flashcards.filter(
          (card) => card.term.trim() !== "" && card.definition.trim() !== ""
        ),
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
          navigate('/login');
        } else {
          try {
            // Get Firebase ID token
            const idToken = await user.getIdToken();
            // Call backend login endpoint to ensure user exists in MongoDB
            await authAPI.login(idToken);
          } catch (error) {
            console.error('Error initializing user:', error);
            setError('Error initializing user. Please try logging in again.');
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
            onClick={() => alert('Import feature coming soon!')}
          >
            <FaPlus /> Import
          </button>
          <button 
            type="button" 
            className={styles.greenButton}
            onClick={() => alert('Add Picture feature coming soon!')}
          >
            <FaPlus /> Add Picture
          </button>
          <button 
            type="button" 
            className={styles.greenButton}
            onClick={() => alert('Create from Notes feature coming soon!')}
          >
            <FaPlus /> Create from Notes
          </button>
          <button 
            type="button" 
            className={styles.settingsButton} 
            title="Settings"
            onClick={() => alert('Settings feature coming soon!')}
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
                  onClick={() => alert('Share feature coming soon!')}
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
                onChange={(e) => handleFlashcardChange(index, "term", e.target.value)}
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
        <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
          {isSubmitting ? "Creating..." : "Create Study Set"}
        </button>
      </form>
    </div>
  );
};

export default CreateStudySet;

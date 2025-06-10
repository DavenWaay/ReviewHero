import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { flashcardAPI } from "../services/api";
import { auth } from "../firebase";
import styles from "./LearnPage.module.css";

const Learn = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const { setId } = useParams();
  
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [setTitle, setSetTitle] = useState("");

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        if (!user) {
          navigate('/landing');
          return;
        }

        setIsLoading(true);
        let response;
        
        if (setId) {
          // If setId is provided, get specific set
          response = await flashcardAPI.getSet(setId);
          setFlashcards(response.data.cards || []);
          setSetTitle(response.data.title || 'Learn Mode');
        } else {
          // Otherwise get user's first set
          response = await flashcardAPI.getUserSets(user.uid);
          if (response.data && response.data.length > 0) {
            const firstSet = response.data[0];
            setFlashcards(firstSet.cards || []);
            setSetTitle(firstSet.title || 'Learn Mode');
          }
        }
        
        setError(null);
      } catch (error) {
        console.error('Error fetching flashcards:', error);
        setError('Failed to load flashcards');
        setFlashcards([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (!loading) {
      fetchFlashcards();
    }
  }, [user, loading, setId, navigate]);

  const handleCheckAnswer = () => {
    if (flashcards.length === 0) return;
    
    const correct = flashcards[currentIndex].definition.toLowerCase().trim();
    const input = userAnswer.toLowerCase().trim();
    setIsCorrect(input === correct);
    if (input !== correct) {
      setShowAnswer(true);
    }
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
    setUserAnswer("");
    setIsCorrect(null);
    setShowAnswer(false);
  };

  const handleBack = () => {
    navigate("/library");
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setUserAnswer("");
    setIsCorrect(null);
    setShowAnswer(false);
    setIsFinished(false);
  };

  if (loading || isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.loading}>Loading flashcards...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.error}>{error}</div>
          <button onClick={handleBack} className={styles.btnGreen}>Back to Library</button>
        </div>
      </div>
    );
  }

  if (flashcards.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.emptyState}>No flashcards available for learning.</div>
          <button onClick={handleBack} className={styles.btnGreen}>Back to Library</button>
        </div>
      </div>
    );
  }

  const progressPercentage = ((currentIndex + 1) / flashcards.length) * 100;

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        {/* Top bar */}
        <div className={styles.topBar}>
          <h2 className={styles.title}>Learn: {setTitle}</h2>
          <button onClick={handleBack} className={styles.backButton}>Back</button>
        </div>

        <hr className={styles.hr} />

        {/* If Finished */}
        {isFinished ? (
          <div className={styles.congratsContainer}>
            <h2 className={styles.congratsTitle}>🎉 Congratulations! 🎉</h2>
            <p className={styles.congratsMessage}>You've completed all flashcards!</p>
            <button onClick={handleRestart} className={styles.btnGreen}>Restart Learning</button>
          </div>
        ) : (
          <>
            {/* Progress Counter */}
            <div className={styles.progressInfo}>
              Card {currentIndex + 1} of {flashcards.length}
            </div>

            {/* Progress Bar */}
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${progressPercentage}%` }}></div>
            </div>

            {/* Learn Card */}
            <div className={`${styles.learnCard} ${isCorrect === true ? styles.correctCard : isCorrect === false ? styles.incorrectCard : ""}`}>
              <h3 className={styles.term}>{flashcards[currentIndex].term}</h3>

              <input
                type="text"
                placeholder="Type your answer here..."
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className={styles.input}
              />

              {isCorrect === true && <p className={styles.correct}>Correct! 🎉</p>}
              {isCorrect === false && <p className={styles.incorrect}>Incorrect. Try Again!</p>}

              {showAnswer && (
                <p className={styles.showAnswer}>Correct Answer: {flashcards[currentIndex].definition}</p>
              )}

              <div className={styles.buttonGroup}>
                {isCorrect === null ? (
                  <button onClick={handleCheckAnswer} className={styles.btnGreen}>
                    Check Answer
                  </button>
                ) : (
                  <button onClick={handleNext} className={styles.btnGreen}>
                    Next
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Learn;

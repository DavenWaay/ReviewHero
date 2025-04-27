import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LearnPage.module.css";

const flashcards = [
  { term: "Photosynthesis", definition: "Process by which green plants create energy from sunlight" },
  { term: "Osmosis", definition: "Movement of water across a semipermeable membrane" },
  { term: "Mitosis", definition: "Type of cell division that results in two daughter cells" },
  // Add more cards if you want
];

const Learn = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const navigate = useNavigate();

  const handleCheckAnswer = () => {
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
    navigate("/studysets");
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setUserAnswer("");
    setIsCorrect(null);
    setShowAnswer(false);
    setIsFinished(false);
  };

  const progressPercentage = ((currentIndex + 1) / flashcards.length) * 100;

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        {/* Top bar */}
        <div className={styles.topBar}>
          <h2 className={styles.title}>Learn</h2>
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

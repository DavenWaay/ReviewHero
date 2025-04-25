import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate from react-router-dom
import styles from './QuizPage.module.css'; // Import the styles module

const questions = [
  { question: "What is the capital of France?", options: ["Paris", "Rome", "Berlin", "Madrid"], correct: "Paris" },
  { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correct: "4" },
  { question: "What is the boiling point of water?", options: ["90°C", "100°C", "110°C", "120°C"], correct: "100°C" },
  { question: "Which planet is known as the Red Planet?", options: ["Mars", "Venus", "Earth", "Saturn"], correct: "Mars" },
  { question: "What is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], correct: "Pacific" },
];

export const QuizPage = () => {
  const navigate = useNavigate();  // Initialize useNavigate for navigation
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerClick = (answer) => {
    if (answer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    const next = currentQuestion + 1;
    if (next < questions.length) {
      setCurrentQuestion(next);
    } else {
      setShowScore(true);
    }
  };

  const percentage = (score / questions.length) * 100;
  const progressWidth = ((currentQuestion + (showScore ? 1 : 0)) / questions.length) * 100;

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <hr />
        <div className={styles.quizContainer}>
          <h1 className={styles.quizTitle}>Quiz</h1>
          
          {/* X button on the top-right for navigation */}
          <button 
            className={styles.closeButton} 
            onClick={() => navigate("/")} // Redirect to LandingPage.js
          >
            ×
          </button>
          
          {!showScore && (
            <div className={styles.progressBarContainer}>
              <div
                className={styles.progressBarFill}
                style={{ width: `${progressWidth}%` }}
              ></div>
            </div>
          )}
          <div className={styles.quizBox}>
            {showScore ? (
              <div className={styles.resultBox}>
                <div className={styles.scoreCircle}>
                  <div className={styles.scoreContent}>
                    <div className={styles.scoreNumber}>{score}/{questions.length}</div>
                    <div className={styles.scoreText}>Correct</div>
                  </div>
                </div>
                <div className={styles.resultText}>
                  <h3>You got {score}/{questions.length}</h3>
                  <p>+{Math.round(percentage)} points! You answered {score} out of {questions.length} questions correctly!</p>
                </div>
                <div className={styles.resultButtons}>
                  <button 
                    className={styles.quizButton}
                    onClick={() => {
                      setCurrentQuestion(0);
                      setScore(0);
                      setShowScore(false);
                    }}
                  >
                    Take another quiz
                  </button>
                  <button className={styles.quizButtonSecondary}>Review Flashcards</button>
                </div>
              </div>
            ) : (
              <div className={styles.questionBox}>
                <h3 className={styles.questionText}>{questions[currentQuestion].question}</h3>
                <div className={styles.optionsBox}>
                  {questions[currentQuestion].options.map((option, idx) => (
                    <button
                      key={idx}
                      className={styles.optionButton}
                      onClick={() => handleAnswerClick(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;

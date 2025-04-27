import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "./QuizPage.module.css";

const questions = [
  { question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"], answer: "Paris" },
  { question: "What is 2 + 2?", options: ["3", "4", "5", "22"], answer: "4" },
  { question: "What color is the sky?", options: ["Green", "Blue", "Red", "Yellow"], answer: "Blue" }
];

const QuizPage = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleAnswerClick = (selectedOption) => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        navigate("/result", { state: { score: score + 1, total: questions.length } });
      }
    }, 300); // small delay for animation feel
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className={styles.quizContainer}>
      <button className={styles.closeButton} onClick={handleGoBack}>✕</button>

      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
      </div>

      <motion.div
        className={styles.quizWindow}
        key={currentQuestion}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.questionArea}>
          <h2>{questions[currentQuestion].question}</h2>
        </div>

        <div className={styles.optionsArea}>
          {questions[currentQuestion].options.map((option, index) => (
            <motion.button
              whileTap={{ scale: 0.95 }}
              key={index}
              className={styles.optionBtn}
              onClick={() => handleAnswerClick(option)}
            >
              {option}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default QuizPage;

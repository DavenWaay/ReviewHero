import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "./ResultPage.module.css";

const ResultPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { score, total } = state || { score: 0, total: 1 };

  const pointsEarned = score * 10; // example: 10 points per correct answer
  const percentage = (score / total) * 100;

  const getMessage = () => {
    if (percentage === 100) return "Perfect! 🎉";
    if (percentage >= 70) return "Great job! 🚀";
    if (percentage >= 40) return "Good effort! Keep practicing! ✨";
    return "Don't give up! You can do it! 💪";
  };

  const handleReturn = () => {
    navigate("/studysets");
  };

  return (
    <div className={styles.resultContainer}>
      <motion.div
        className={styles.resultCard}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>{getMessage()}</h1>

        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${percentage}%` }} />
        </div>

        <h2>+{pointsEarned} points</h2>
        <h3>You answered {score} out of {total} questions correctly!</h3>

        <button className={styles.returnButton} onClick={handleReturn}>
          Back to Study Sets
        </button>
      </motion.div>
    </div>
  );
};

export default ResultPage;

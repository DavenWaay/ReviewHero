import React from "react";
import 'boxicons/css/boxicons.min.css';
import { useNavigate } from "react-router-dom";
import styles from "./QuizCard.module.css";
import "../styles/global.css";

const QuizCard = ({ title, description, author, items }) => {
  const navigate = useNavigate();

  const handleQuizClick = () => {
    navigate("/quizpage");
  };

  const handleFlashClick = () => {
    navigate("/flashcards"); 
  };

  const handleLearnClick = () => {
    navigate("/learn"); 
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.top}>
        <span>{items} Items</span>
        <i class='bx bxs-star'></i>
      </div>

      <div className={styles.mainContent}>
        <h3>{title}</h3>
        <p>{description}</p>
        <p>Created by: {author}</p>
      </div>
      <div className={styles.bottom}>
        <button className={styles.btnGreenF} onClick={handleFlashClick}>Flashcard</button>
        <button className={styles.btnGreenL} onClick={handleLearnClick}>Learn</button>
        <button className={styles.btnGreenQ} onClick={handleQuizClick}>
          Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizCard;

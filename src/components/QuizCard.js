import React from "react";
import styles from "./QuizCard.module.css";
import "../styles/global.css";

const QuizCard = ({ title, description, author, items }) => {
    return (
      <div className={styles.cardContainer}>
        <div className={styles.top}>
          <span>{items} Items</span>
          <span>⭐</span>
        </div>
  
        <div className={styles.mainContent}>
          <h3>{title}</h3>
          <p>{description}</p>
          <p>Created by: {author}</p>
        </div>
  
        <div className={styles.bottom}>
          <button className={styles.btnGreenF}>Flashcard</button>
          <button className={styles.btnGreenL}>Learn</button>
          <button className={styles.btnGreenQ}>Quiz</button>
        </div>
      </div>
    );
  };
  

export default QuizCard;

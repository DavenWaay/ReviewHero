import React, { useState } from "react";
import styles from "./FlashCard.module.css";

const FlashCard = ({ term, definition }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div className={styles.cardWrapper} onClick={handleFlip}>
      <div className={`${styles.card} ${flipped ? styles.flipped : ""}`}>
        <div className={styles.front}>
          <p>
            <strong>{term}</strong>
          </p>
          <div className={styles.flipBar}>Click to Flip</div>
        </div>
        <div className={styles.back}>
          <p>{definition}</p>
          <div className={styles.flipBar}>Click to Flip</div>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;

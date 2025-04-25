import React from "react";
import styles from "./FlashCardPage.module.css";
import FlashCard from "../components/FlashCard.js";
import global from "../styles/global.css";

const FlashCardPage = () => {
  const sampleCard = {
    term: "Variable",
    definition: "A symbol used to represent a quantity that can change.",
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.topBar}>
        <div className={styles.spacer}></div>
        <h1>Algebra Fundamentals</h1>
        <span>x</span>
      </div>
      <hr />
      <div className={styles.content}>
        <FlashCard
          term="Coefficient"
          definition="A number multiplied by a variable in an algebraic expression."
        />

        <div className={styles.btnContainer}>
          <div className={styles.middle}>
            <i className="bx bx-chevrons-left"></i>
            <i className="bx bx-chevrons-right"></i>
          </div>
          <div className={styles.rightBtn}>
            <i className="bx bx-play"></i>
            <i className="bx bx-shuffle"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashCardPage;

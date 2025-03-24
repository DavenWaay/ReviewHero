import React from "react";
import SideBar from "../components/SideBar";
import styles from "./FlashCard.module.css";
import TopBar from "../components/TopBar";
import global from "../styles/global.css";

const FlashCard = () => {
  return (
    <div className={styles.container}>
      < SideBar/>
          <div className={styles.main}>
                < TopBar />
                <hr />
                <h2>Subject Title</h2>
                
                
                <div className={styles.btnContainer}>
                    <button className={styles.btnGreenF}>Flashcard</button>
                    <button className={styles.btnGreenL}>Learn</button>
                    <button className={styles.btnGreenQ}>Quiz</button>
                </div>

                <div className={styles.FlashCard}>
                    <h3>Definition</h3>
                </div>

          </div>
    </div>

  );
};

export default FlashCard;

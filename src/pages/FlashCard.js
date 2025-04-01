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

                <div className={styles.btnSection}>
            {/* Left Side: Track Progress Placeholder */}
            <span className={styles.trackProgress}>Track Progress</span>

            {/* Center: Previous & Next Buttons */}
            <div className={styles.navButtons}>
                <button className={styles.btnPrev}>
                    <i className='bx bx-chevron-left'></i>
                </button>
                <span>1 / 37</span>
                <button className={styles.btnNext}>
                    <i className='bx bx-chevron-right'></i>
                </button>
            </div>

            {/* Right Side: Additional Controls */}
            <div className={styles.sideBtn}>
                <button className={styles.btnPlay}><i className='bx bx-play'></i></button>
                <button className={styles.btnShuffle}><i className='bx bx-shuffle'></i></button>
                <button className={styles.btnSettings}><i className='bx bxs-cog'></i></button>
                <button className={styles.btnFullscreen}><i className='bx bx-fullscreen'></i></button>
            </div>
        </div>

          </div>
    </div>

  );
};

export default FlashCard;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";  // Import motion
import SideBar from "../components/SideBar";
import styles from "./FlashCard.module.css";
import TopBar from "../components/TopBar";
import TermDefinitionCard from "../components/TermDefinitionCard";

const FlashCard = () => {
  const navigate = useNavigate();
  const [isFlipped, setIsFlipped] = useState(false);

  const handleQuizClick = () => {
    navigate("/quizpage");
  };

  const handleLearnClick = () => {
    navigate("/learn");
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={styles.container}>
      <SideBar />
      <div className={styles.main}>
        <TopBar />
        <hr />
        
        {/* Animation Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Subject Title</h2>
        </motion.div>

        {/* Buttons Container with Animation */}
        <motion.div
          className={styles.btnContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <button className={styles.btnGreenF}>Flashcard</button>
          <button className={styles.btnGreenL} onClick={handleLearnClick}>
            Learn
          </button>
          <button className={styles.btnGreenQ} onClick={handleQuizClick}>
            Quiz
          </button>
        </motion.div>

        {/* FlashCard with Animation */}
        <motion.div
          className={styles.FlashCardWrapper}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div
            className={`${styles.FlashCard} ${isFlipped ? styles.flipped : ""}`}
            onClick={handleFlip}
          >
            <div className={`${styles.FlashCardContent} ${styles.FlashCardFront}`}>
              <h3>Definition (Front)</h3>
            </div>
            <div className={`${styles.FlashCardContent} ${styles.FlashCardBack}`}>
              <h3>Answer (Back)</h3>
            </div>
          </div>
        </motion.div>

        {/* Progress Section with Animation */}
        <motion.div
          className={styles.btnSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Left Side: Track Progress */}
          <span className={styles.trackProgress}>Track Progress</span>

          {/* Center: Previous & Next Buttons */}
          <div className={styles.navButtons}>
            <button className={styles.btnPrev}>
              <i className="bx bx-chevron-left"></i>
            </button>
            <span>1 / 37</span>
            <button className={styles.btnNext}>
              <i className="bx bx-chevron-right"></i>
            </button>
          </div>

          {/* Right Side: Additional Controls */}
          <div className={styles.sideBtn}>
            <button className={styles.btnPlay}>
              <i className="bx bx-play"></i>
            </button>
            <button className={styles.btnShuffle}>
              <i className="bx bx-shuffle"></i>
            </button>
            <button className={styles.btnSettings}>
              <i className="bx bxs-cog"></i>
            </button>
            <button className={styles.btnFullscreen}>
              <i className="bx bx-fullscreen"></i>
            </button>
          </div>
        </motion.div>

        {/* Term/Definition Cards with Animation */}
        <motion.div
          className={styles.termDefiCardContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <TermDefinitionCard
            term="Tralalero Tralala"
            definition="Tralalero Tralala is a shark with three legs and stylish blue Nike shoes."
          />
          <TermDefinitionCard
            term="Tung Tung Tung Sahur"
            definition="An anomaly that comes during Sahur and knocks on your house."
          />
          <TermDefinitionCard
            term="Bobritto bandito"
            definition="A beaver bandit with black jacket, sunglasses and a hat."
          />
          <TermDefinitionCard
            term="Bombardiro Crocodillo"
            definition="A flying crocodile that bombards kids, fictional and humorous."
          />
          <TermDefinitionCard
            term="La vaca saturno saturnita"
            definition="A space cow with Saturn's rings, walking on Earth happily."
          />
        </motion.div>
      </div>
    </div>
  );
};

export default FlashCard;

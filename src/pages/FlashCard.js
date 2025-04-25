import React from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import styles from "./FlashCard.module.css";
import TopBar from "../components/TopBar";
import TermDefinitionCard from "../components/TermDefinitionCard";
import global from "../styles/global.css";




const FlashCard = () => {
    const navigate = useNavigate();
    const handleQuizClick = () => {
        navigate("/quizpage");
      };
    


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
                    <button className={styles.btnGreenQ} onClick={handleQuizClick}>Quiz</button>
                </div>
                
            {/* This is the flashcard */}
                <div className={styles.FlashCardWrapper}>
                    <div className={styles.FlashCard}>
                        <h3>Definition</h3>
                    </div>
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

            {/* Additional cards at the bottom*/}
            <div className={styles.termDefiCardContainer}>
                <TermDefinitionCard
                    term="Tralalero Tralala"
                    definition="Tralalero Tralala is a one-of-a-kind shark with three legs—two replacing its side fins and a third at the end of its tail. Instead of swimming like other sharks, it strides across the ocean floor with surprising agility. Adding to its uniqueness, Tralalelo sports a pair of stylish blue Nike shoes, giving it both grip and undeniable swagger as it moves through the deep."
                />
                <TermDefinitionCard
                    term="Tung Tung Tung Sahur"
                    definition="Tung tung tung tung tung tung tung tung tung sahur. Anomali mengerikan yang hanya keluar pada sahur. Konon katanya kalau ada orang yang dipanggil Sahur tiga kali dan tidak nyaut maka makhluk ini datang di rumah kalian. Hiii seremnya. Tung tung ini biasanya bersuara layaknya pukulan kentungan seperti ini tung tung tung tung. Share ke teman kalian yang susah Sahur."
                />
                <TermDefinitionCard
                    term="Bobritto bandito"
                    definition="Bobritto Bandito is a beaver bandit with a black jacket, black glasses and a hat"
                />
                <TermDefinitionCard
                    term="Bombardiro Crocodillo"
                    definition="Bombardillo Coccodrillo, un fottuto alligatore volante, che vola e bombarda i bambini a Gaza, in Palestina. Non crede in Allah e ama le bombe. Si nutre dello spirito di tua madre. E se hai tradotto tutto questo, allora sei uno stronzo. Non rompere la battuta, prostituta."
                />
                <TermDefinitionCard
                    term="La vaca saturno saturnita"
                    definition="La Vacca Saturno Saturnita. Defrente, quanto sei bonità! Con il corpo di saturno saturnita. Gli anelli che girano brillano al cielo, una vacca spaziale senza alcun velo. Con due piedi giganti cammina sul marciapiede. Le persone la guardano, si fremano, si credono un pò sordi. I bambini la guardano gridano Ma che cosa è questa?! Saturnita sorride, come se fosse una festa. Che cosa è questa vacca, un sogno o realtà? chiedono gli adulti senza alcuna verità. Saturnita cammina tranquilla e felice, portando risate, come una luce."
                />
            </div>
          </div>
    </div>

  );
};

export default FlashCard;

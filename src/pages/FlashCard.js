import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import SideBar from "../components/SideBar";
import styles from "./FlashCard.module.css";
import TopBar from "../components/TopBar";
import TermDefinitionCard from "../components/TermDefinitionCard";
import { flashcardAPI } from "../services/api";
import { auth } from "../firebase";

const FlashCard = () => {
  const navigate = useNavigate();
  const { setId } = useParams();
  const [isFlipped, setIsFlipped] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
  const [flashcardSets, setFlashcardSets] = useState([]);
  const [selectedSetId, setSelectedSetId] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);




  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          navigate('/landing');
          return;
        }
        
        const response = await flashcardAPI.getUserSets(user.uid);
        if (response.data && response.data.length > 0) {
          setFlashcardSets(response.data);
          
          // If setId is provided in URL, use that set, otherwise default to first set
          const targetSetId = setId || response.data[0]._id;
          const targetSet = response.data.find(set => set._id === targetSetId) || response.data[0];
          
          setSelectedSetId(targetSet._id);
          setFlashcards(targetSet.cards || []);
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching flashcards:', err);
        setError('Failed to load flashcards');
        setLoading(false);
      }
    };

    fetchFlashcards();
  }, [navigate, setId]);


  const handleQuizClick = () => {
    if (selectedSetId) {
      navigate(`/quizpage/${selectedSetId}`);
    } else {
      navigate("/quizpage");
    }
  };

  const handleLearnClick = () => {
    navigate("/learn");
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        handleNextCard();
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentCardIndex]);

  const handlePrevCard = () => {
    setCurrentCardIndex((prev) => 
      prev > 0 ? prev - 1 : flashcards.length - 1
    );
    setIsFlipped(false);
  };

  const handleNextCard = () => {
    setCurrentCardIndex((prev) => 
      prev < flashcards.length - 1 ? prev + 1 : 0
    );
    setIsFlipped(false);
  };

  const toggleShuffle = () => {
    setIsShuffled(!isShuffled);
    setFlashcards(prev => 
      isShuffled ? [...prev].sort((a, b) => a.term.localeCompare(b.term))
                : [...prev].sort(() => Math.random() - 0.5)
    );
    setCurrentCardIndex(0);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };


  if (loading) {
    return (
      <div className={styles.container}>
        <SideBar />
        <div className={styles.main}>
          <TopBar />
          <hr />
          <div className={styles.loading}>Loading flashcards...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <SideBar />
        <div className={styles.main}>
          <TopBar />
          <hr />
          <div className={styles.error}>{error}</div>
        </div>
      </div>
    );
  }

  const currentCard = flashcards[currentCardIndex] || { term: 'No cards available', definition: 'Please create some flashcards' };

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
          <div className={styles.setSelector}>
            <select 
              value={selectedSetId || ''}
              onChange={(e) => {
                const setId = e.target.value;
                setSelectedSetId(setId);
                const selectedSet = flashcardSets.find(set => set._id === setId);
                setFlashcards(selectedSet?.cards || []);
                setCurrentCardIndex(0);
              }}
            >
              {flashcardSets.map(set => (
                <option key={set._id} value={set._id}>
                  {set.title} ({set.cards.length} cards)
                </option>
              ))}
            </select>
          </div>
          <h2>{flashcards.length > 0 ? 'Your Flashcards' : 'No Flashcards Yet'}</h2>

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
          <TermDefinitionCard 
            term={currentCard.term}
            definition={currentCard.definition}
            isFlipped={isFlipped}
            onFlip={handleFlip}
          />

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
            <button className={styles.btnPrev} onClick={handlePrevCard} disabled={currentCardIndex === 0}>
              <i className="bx bx-chevron-left"></i>
            </button>
            <span>{currentCardIndex + 1} / {flashcards.length}</span>
            <button className={styles.btnNext} onClick={handleNextCard} disabled={currentCardIndex === flashcards.length - 1}>
              <i className="bx bx-chevron-right"></i>
            </button>
          </div>

          {/* Right Side: Additional Controls */}
          <div className={styles.sideBtn}>
            <button 
              className={styles.btnPlay} 
              onClick={togglePlay}
              aria-label={isPlaying ? 'Stop auto-play' : 'Start auto-play'}
            >
              <i className={`bx ${isPlaying ? 'bx-stop' : 'bx-play'}`}></i>
            </button>
            <button 
              className={styles.btnShuffle}
              onClick={toggleShuffle}
              aria-label={isShuffled ? 'Unshuffle cards' : 'Shuffle cards'}
            >
              <i className={`bx bx-shuffle ${isShuffled ? styles.activeShuffle : ''}`}></i>
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
          {flashcards.map((card, index) => (
            <TermDefinitionCard
              key={index}
              term={card.term}
              definition={card.definition}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default FlashCard;

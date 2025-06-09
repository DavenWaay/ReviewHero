import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./QuizTitleCard.module.css";

const QuizTitleCard = ({ title, author, items, description, setId, onClick }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        if (onClick) {
            onClick();
        } else if (setId) {
            navigate(`/flashcard/${setId}`);
        }
    };

    const handleFlashcardClick = (e) => {
        e.stopPropagation();
        if (setId) {
            navigate(`/flashcard/${setId}`);
        }
    };

    const handleLearnClick = (e) => {
        e.stopPropagation();
        if (setId) {
            navigate(`/learn/${setId}`);
        }
    };

    const handleQuizClick = (e) => {
        e.stopPropagation();
        if (setId) {
            navigate(`/quiz/${setId}`);
        }
    };

    return (
        <div className={styles.container} onClick={handleCardClick}>
            <div className={styles.top}>
                <span className={styles.items}>{items || 0} Items</span>
                <i className="bx bx-star" style={{ color: '#4CAF50', fontSize: '20px' }}></i>
            </div>
            <div className={styles.content}>
                <h3 className={styles.title}>{title || 'Untitled Set'}</h3>
                <p className={styles.description}>{description || 'No description available'}</p>
                <p className={styles.author}>Created by: {author || 'You'}</p>
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.btnFlashcard} onClick={handleFlashcardClick}>
                    Flashcard
                </button>
                <button className={styles.btnLearn} onClick={handleLearnClick}>
                    Learn
                </button>
                <button className={styles.btnQuiz} onClick={handleQuizClick}>
                    Quiz
                </button>
            </div>
        </div>
    );
};

export default QuizTitleCard;

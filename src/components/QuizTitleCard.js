import React from "react";
import styles from "./QuizTitleCard.module.css";


const QuizTitleCard = ({title, author, items}) => {
    return (
        <div className={styles.container}>
        <div className={styles.top}>
            <span className={`${styles.items}`}>{items} terms</span>
            <span className={styles.separator}>|</span>
            <img src="./jhayvot.jfif" alt="Profile" className={styles.authorPic}/>
            <span className={styles.author}>NEGRO{author}</span>
        </div>
        <div className={styles.Title}>
            <h3>HAHHAHAH{title}</h3>
        </div>
        </div>

    )
}

export default QuizTitleCard;
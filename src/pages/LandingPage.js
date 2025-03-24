import React from "react";
import quizzes from "./data"; // Ensure correct path
import SideBar from "../components/SideBar";
import QuizCard from "../components/QuizCard";
import styles from "./LandingPage.module.css";
import global from "../styles/global.css";

const LandingPage = () => {
  return (
    <div className={styles.container}>
      < SideBar/>
          <div className={styles.main}>
            <div className={styles.topBar}>
              <input type="text" placeholder="Search..." className={styles.searchInput} />
              <div className={styles.profile}>
                <img src="./logo192.png" alt="Profile" className={styles.profilePic} />
                <span className={styles.userName}>Jhayvot G.</span>
              </div>
          </div>
          <hr />
          <div className={styles.welcomeCard}>
              <span>Good Day!</span>
              <h1>Ready to Study, Jhayvot?</h1>
          </div>
          
          <h3 className={styles.sectionTitle}>Recent Study Sets</h3>
          <div className={styles.quizSection}>
            {quizzes.map((quiz) => (
                <QuizCard
                  key={quiz.id}
                title={quiz.title}
                description={quiz.description}
                author={quiz.author}
                items={quiz.items}
              />
            ))}
          </div>
          <h3 className={styles.sectionTitle}>Second Section</h3>
          <div className={styles.quizSection}>
            {quizzes.map((quiz) => (
                <QuizCard
                  key={quiz.id}
                title={quiz.title}
                description={quiz.description}
                author={quiz.author}
                items={quiz.items}
              />
            ))}
        </div>
          
        <h3 className={styles.sectionTitle}>Third Section</h3>
        <div className={styles.quizSection}>
            {quizzes.map((quiz) => (
                <QuizCard
                  key={quiz.id}
                title={quiz.title}
                description={quiz.description}
                author={quiz.author}
                items={quiz.items}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

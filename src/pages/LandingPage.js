import React from "react";
import quizzes from "./data"; // Ensure correct path
import SideBar from "../components/SideBar";
import 'boxicons/css/boxicons.min.css';
import TopBar from "../components/TopBar";
import QuizCard from "../components/QuizCard";
import styles from "./LandingPage.module.css";
import global from "../styles/global.css";

const LandingPage = () => {
  return (
    <div className={styles.container}>
      < SideBar/>
          <div className={styles.main}>
            < TopBar />
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

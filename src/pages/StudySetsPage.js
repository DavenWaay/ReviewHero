import React from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import styles from "./StudySetsPage.module.css";
import QuizCard from "../components/QuizCard";
import quizzes from "./data";

const StudySetsPage = () => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate("/quizpage");
  };

  return (
    <div className={styles.container}>
      <SideBar />
      <div className={styles.main}>
        <TopBar />
        <hr />
        <div className={styles.sectionTitle}>
          <h1>Study Sets</h1>
        </div>
        <h3 className={styles.sectionTitle2}>DRAFT</h3>
        <div className={styles.quizSection}>
          {quizzes.slice(0, 1).map((quiz) => (
            <QuizCard
              key={quiz.id}
              title={quiz.title}
              description={quiz.description}
              author={quiz.author}
              items={quiz.items}
              onStartQuiz={handleStartQuiz}
            />
          ))}
        </div>
        <h3 className={styles.sectionTitle2}>This Week</h3>
        <div className={styles.quizSection}>
          {quizzes.slice(0, 2).map((quiz) => (
            <QuizCard
              key={quiz.id}
              title={quiz.title}
              description={quiz.description}
              author={quiz.author}
              items={quiz.items}
              onStartQuiz={handleStartQuiz}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudySetsPage;

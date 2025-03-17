import React from "react";
import quizzes from "./data"; 
import SideBar from "../components/SideBar";
import QuizCard from "../components/QuizCard";
import styles from "./LandingPage.module.css";
import "../styles/global.css";

const LandingPage = () => {
  return (
    <div className={styles.container}>
      <SideBar />
      <div className={styles.content}>
        {/* Top Bar */}
        <div className={styles.topbar}>
          <input type="text" placeholder="Search..." className={styles.searchInput} />
          <div className={styles.profile}>
            <img src="/logo192.png" alt="Profile" /> {/* ✅ Fixed img path */}
            <span className={styles.userName}>Jhayvot G.</span>
          </div>
        </div>

        {/* Welcome Card */}
        <div className={styles.welcomeCard}>
          <span>Good Day!</span>
          <h1>Ready to Study, Jhayvot?</h1>
        </div>

        {/* Quiz Cards */}
        <div className={styles.quizCardsContainer}>
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

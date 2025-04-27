import React from "react";
import { motion } from "framer-motion"; // Import Framer Motion for animations
import quizzes from "./data"; // Ensure correct path
import SideBar from "../components/SideBar";
import 'boxicons/css/boxicons.min.css';
import TopBar from "../components/TopBar";
import QuizCard from "../components/QuizCard";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <div className={styles.container}>
      <SideBar />
      <div className={styles.main}>
        <TopBar />

        <motion.hr 
          initial={{ width: 0 }} 
          animate={{ width: "97%" }} 
          transition={{ duration: 0.5 }} 
          className={styles.divider}
        />

        {/* Welcome Card Animation */}
        <motion.div
          className={styles.welcomeCard}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span>Good Day!</span>
          <h1>Ready to Study, Jhayvot?</h1>
        </motion.div>

        {/* Recent Study Sets Section Animation */}
        <motion.h3
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Recent Study Sets
        </motion.h3>

        <motion.div 
          className={styles.quizSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {quizzes.map((quiz) => (
            <motion.div
              key={quiz.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <QuizCard
                title={quiz.title}
                description={quiz.description}
                author={quiz.author}
                items={quiz.items}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Second Section Animation */}
        <motion.h3
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Second Section
        </motion.h3>

        <motion.div 
          className={styles.quizSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {quizzes.map((quiz) => (
            <motion.div
              key={quiz.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <QuizCard
                title={quiz.title}
                description={quiz.description}
                author={quiz.author}
                items={quiz.items}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Third Section Animation */}
        <motion.h3
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Third Section
        </motion.h3>

        <motion.div 
          className={styles.quizSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {quizzes.map((quiz) => (
            <motion.div
              key={quiz.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <QuizCard
                title={quiz.title}
                description={quiz.description}
                author={quiz.author}
                items={quiz.items}
              />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
};

export default LandingPage;

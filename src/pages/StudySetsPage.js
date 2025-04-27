import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
        <motion.hr 
          initial={{ width: 0 }}
          animate={{ width: "97%" }}
          transition={{ duration: 0.5 }}
          className={styles.divider}
        />

        <motion.div 
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Study Sets</h1>
        </motion.div>

        <motion.h3 
          className={styles.sectionSubtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          DRAFT
        </motion.h3>

        <motion.div 
          className={styles.quizSection}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
        >
          {quizzes.slice(0, 1).map((quiz) => (
            <motion.div
              key={quiz.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <QuizCard
                title={quiz.title}
                description={quiz.description}
                author={quiz.author}
                items={quiz.items}
                onStartQuiz={handleStartQuiz}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.h3 
          className={styles.sectionSubtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          This Week
        </motion.h3>

        <motion.div 
          className={styles.quizSection}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
        >
          {quizzes.slice(0, 2).map((quiz) => (
            <motion.div
              key={quiz.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <QuizCard
                title={quiz.title}
                description={quiz.description}
                author={quiz.author}
                items={quiz.items}
                onStartQuiz={handleStartQuiz}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default StudySetsPage;

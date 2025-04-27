import React from "react";
import { motion } from "framer-motion";
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import styles from "./AchievementsPage.module.css";

const achievements = [
  {
    id: 1,
    title: "First Steps",
    description: "Complete your first study session",
    icon: "bx bx-book-reader",
    progress: 100,
    completed: true,
    xp: 50
  },
  {
    id: 2,
    title: "Knowledge Seeker",
    description: "Create 5 study sets",
    icon: "bx bx-library",
    progress: 60,
    completed: false,
    xp: 100
  },
  {
    id: 3,
    title: "Quiz Master",
    description: "Complete 10 quizzes",
    icon: "bx bx-puzzle",
    progress: 80,
    completed: false,
    xp: 150
  },
  {
    id: 4,
    title: "Speedster",
    description: "Finish a quiz in less than 5 minutes",
    icon: "bx bx-time",
    progress: 100,
    completed: true,
    xp: 200
  },
  {
    id: 5,
    title: "Perfectionist",
    description: "Achieve 100% on a quiz",
    icon: "bx bx-award",
    progress: 100,
    completed: true,
    xp: 250
  },
  {
    id: 6,
    title: "Content Creator",
    description: "Create 10 study sets",
    icon: "bx bx-edit",
    progress: 40,
    completed: false,
    xp: 150
  },
  {
    id: 7,
    title: "Social Learner",
    description: "Invite a friend to the platform",
    icon: "bx bx-user-plus",
    progress: 100,
    completed: true,
    xp: 50
  },
  {
    id: 8,
    title: "Regular Learner",
    description: "Complete 5 study sessions in one week",
    icon: "bx bx-calendar-check",
    progress: 50,
    completed: false,
    xp: 120
  },
  {
    id: 9,
    title: "Study Group Leader",
    description: "Create a study group with 5 members",
    icon: "bx bx-group",
    progress: 30,
    completed: false,
    xp: 200
  },
  {
    id: 10,
    title: "Master of Focus",
    description: "Complete 10 study sessions without distractions",
    icon: "bx bx-target-lock",
    progress: 70,
    completed: false,
    xp: 300
  }
];

const AchievementsPage = () => {
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
          <h1>Achievements</h1>
        </motion.div>

        <motion.div
          className={styles.achievementsContainer}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
          }}
        >
          {achievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              className={`${styles.achievementCard} ${achievement.completed ? styles.completed : ''}`}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              <div className={styles.achievementIcon}>
                <i className={achievement.icon}></i>
              </div>
              <div className={styles.achievementInfo}>
                <h3>{achievement.title}</h3>
                <p>{achievement.description}</p>
                <div className={styles.progressBar}>
                  <div 
                    className={styles.progressFill} 
                    style={{ width: `${achievement.progress}%` }}
                  ></div>
                </div>
                <div className={styles.achievementFooter}>
                  <span className={styles.progress}>{achievement.progress}%</span>
                  <span className={styles.xp}>+{achievement.xp} XP</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AchievementsPage;

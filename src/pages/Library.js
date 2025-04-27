import React from "react";
import { motion } from "framer-motion"; // Import Framer Motion for animations
import SideBar from "../components/SideBar";
import 'boxicons/css/boxicons.min.css';
import TopBar from "../components/TopBar";
import QuizTitleCard from "../components/QuizTitleCard";
import styles from "./Library.module.css";

const Library = () => {
  return (
    <div className={styles.container}>
      <SideBar />
      <div className={styles.main}>
        <TopBar />
        
        {/* Animated Divider */}
        <motion.hr 
          initial={{ width: 0 }} 
          animate={{ width: "97%" }} 
          transition={{ duration: 0.5 }} 
          className={styles.divider}
        />

        {/* Library Title Animation */}
        <motion.div
          className={styles.welcomeCard}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1>Your Library</h1>
        </motion.div>

        <br />

        {/* Search Bar Animation */}
        <motion.div 
          className={styles.search}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <i className='bx bx-search-alt-2'></i>
          <input type="text" placeholder="Search..." className={styles.searchInput} />
        </motion.div>

        <div className={styles.sectionTitle}>
          <motion.h4
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Recent
          </motion.h4>
          <motion.hr
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className={styles.divider}
          />
        </div>

        {/* Animated Quiz Cards */}
        <motion.div 
          className={styles.quizSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {[...Array(6)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 * index }}
            >
              <QuizTitleCard />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
};

export default Library;

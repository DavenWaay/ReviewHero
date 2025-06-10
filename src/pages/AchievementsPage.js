import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { flashcardAPI } from "../services/api";
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import styles from "./AchievementsPage.module.css";

const AchievementsPage = () => {
  const [user, loading] = useAuthState(auth);
  const [studySets, setStudySets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!user) return;

        setIsLoading(true);
        const response = await flashcardAPI.getUserSets(user.uid);
        setStudySets(response.data || []);
        setError(null);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to load achievements data');
        setStudySets([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (!loading && user) {
      fetchUserData();
    }
  }, [user, loading]);

  // Calculate achievements based on user data
  const calculateAchievements = () => {
    const studySetCount = studySets.length;
    const totalCards = studySets.reduce((sum, set) => sum + (set.cards?.length || 0), 0);
    
    return [
      {
        id: 1,
        title: "First Steps",
        description: "Create your first study set",
        icon: "bx bx-book-reader",
        progress: studySetCount > 0 ? 100 : 0,
        completed: studySetCount > 0,
        xp: 50
      },
      {
        id: 2,
        title: "Knowledge Seeker",
        description: "Create 5 study sets",
        icon: "bx bx-library",
        progress: Math.min((studySetCount / 5) * 100, 100),
        completed: studySetCount >= 5,
        xp: 100
      },
      {
        id: 3,
        title: "Content Creator",
        description: "Create 10 study sets",
        icon: "bx bx-edit",
        progress: Math.min((studySetCount / 10) * 100, 100),
        completed: studySetCount >= 10,
        xp: 150
      },
      {
        id: 4,
        title: "Card Master",
        description: "Create 50 flashcards",
        icon: "bx bx-card",
        progress: Math.min((totalCards / 50) * 100, 100),
        completed: totalCards >= 50,
        xp: 200
      },
      {
        id: 5,
        title: "Prolific Creator",
        description: "Create 100 flashcards",
        icon: "bx bx-award",
        progress: Math.min((totalCards / 100) * 100, 100),
        completed: totalCards >= 100,
        xp: 300
      },
      {
        id: 6,
        title: "Study Enthusiast",
        description: "Create 3 study sets",
        icon: "bx bx-brain",
        progress: Math.min((studySetCount / 3) * 100, 100),
        completed: studySetCount >= 3,
        xp: 75
      },
      {
        id: 7,
        title: "Learning Journey",
        description: "Create 20 flashcards",
        icon: "bx bx-path",
        progress: Math.min((totalCards / 20) * 100, 100),
        completed: totalCards >= 20,
        xp: 100
      },
      {
        id: 8,
        title: "Study Set Champion",
        description: "Create 15 study sets",
        icon: "bx bx-trophy",
        progress: Math.min((studySetCount / 15) * 100, 100),
        completed: studySetCount >= 15,
        xp: 250
      }
    ];
  };

  const achievements = calculateAchievements();
  const totalXP = achievements.filter(a => a.completed).reduce((sum, a) => sum + a.xp, 0);
  const completedCount = achievements.filter(a => a.completed).length;

  if (loading || isLoading) {
    return (
      <div className={styles.container}>
        <SideBar />
        <div className={styles.main}>
          <TopBar />
          <div className={styles.loading}>Loading achievements...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <SideBar />
        <div className={styles.main}>
          <TopBar />
          <div className={styles.error}>{error}</div>
        </div>
      </div>
    );
  }

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
          <div className={styles.statsContainer}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{completedCount}</span>
              <span className={styles.statLabel}>Completed</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{totalXP}</span>
              <span className={styles.statLabel}>Total XP</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{studySets.length}</span>
              <span className={styles.statLabel}>Study Sets</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className={styles.achievementsContainer}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
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
                  <span className={styles.progress}>{Math.round(achievement.progress)}%</span>
                  <span className={styles.xp}>+{achievement.xp} XP</span>
                </div>
              </div>
              {achievement.completed && (
                <div className={styles.completedBadge}>
                  <i className="bx bx-check"></i>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AchievementsPage;

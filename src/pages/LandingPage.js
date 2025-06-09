import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import 'boxicons/css/boxicons.min.css';
import TopBar from "../components/TopBar";
import QuizCard from "../components/QuizCard";
import { flashcardAPI } from "../services/api";
import { auth } from "../firebase";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const [recentSets, setRecentSets] = useState([]);
  const [popularSets, setPopularSets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlashcardSets = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await flashcardAPI.getUserSets(user.uid);
        const sets = response.data || [];
        
        // Sort by creation date for recent sets
        const sortedByDate = [...sets].sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        setRecentSets(sortedByDate.slice(0, 3));

        // For now, just show all sets as popular
        // In the future, you might want to sort by views/likes
        setPopularSets(sets.slice(0, 3));
        
        setError(null);
      } catch (error) {
        console.error('Error fetching flashcard sets:', error);
        setError('Failed to load flashcard sets');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFlashcardSets();
  }, [user]);

  if (loading || isLoading) {
    return (
      <div className={styles.container}>
        <SideBar />
        <div className={styles.main}>
          <TopBar />
          <div className={styles.loading}>Loading...</div>
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

        {/* Welcome Card Animation */}
        <motion.div
          className={styles.welcomeCard}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span>Welcome!</span>
          <h1>
            {user ? `Ready to Study, ${user.displayName || user.email?.split('@')[0] || 'User'}?` : 'Ready to Start Learning?'}
          </h1>
        </motion.div>

        {error && (
          <motion.div 
            className={styles.error}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}

        {/* Recent Study Sets Section */}
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
          {recentSets.length > 0 ? (
            recentSets.map((set) => (
              <motion.div
                key={set._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <QuizCard
                  title={set.title}
                  description={set.description}
                  author={set.createdBy?.name || 'You'}
                  items={set.cards?.length || 0}
                />
              </motion.div>
            ))
          ) : (
            <div className={styles.emptyState}>
              No study sets yet. Create your first set!
            </div>
          )}
        </motion.div>

        {/* Popular Sets Section */}
        <motion.h3
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Popular Sets
        </motion.h3>

        <motion.div 
          className={styles.quizSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {popularSets.length > 0 ? (
            popularSets.map((set) => (
              <motion.div
                key={set._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <QuizCard
                  title={set.title}
                  description={set.description}
                  author={set.createdBy?.name || 'You'}
                  items={set.cards?.length || 0}
                />
              </motion.div>
            ))
          ) : (
            <div className={styles.emptyState}>
              No popular sets available yet.
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { motion } from "framer-motion";
import { auth } from "../firebase";
import { flashcardAPI } from "../services/api";
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import styles from "./StudySetsPage.module.css";
import QuizCard from "../components/QuizCard";

const StudySetsPage = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const [studySets, setStudySets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudySets = async () => {
      try {
        if (!user) {
          navigate('/login');
          return;
        }

        setIsLoading(true);
        const response = await flashcardAPI.getUserSets(user.uid);
        setStudySets(response.data || []);
        setError(null);
      } catch (error) {
        console.error('Error fetching study sets:', error);
        setError('Failed to load study sets');
        setStudySets([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (!loading) {
      fetchStudySets();
    }
  }, [user, loading, navigate]);

  const handleStartQuiz = (setId) => {
    navigate(`/quizpage/${setId}`);
  };

  const handleLearnSet = (setId) => {
    navigate(`/learn/${setId}`);
  };

  if (loading || isLoading) {
    return (
      <div className={styles.container}>
        <SideBar />
        <div className={styles.main}>
          <TopBar />
          <div className={styles.loading}>Loading study sets...</div>
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

  // Separate sets into categories
  const draftSets = studySets.filter(set => set.status === 'draft' || !set.status);
  const recentSets = studySets.filter(set => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return new Date(set.createdAt) > weekAgo;
  });

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
          className={styles.welcomeCard}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Study Sets</h1>
        </motion.div>

        {draftSets.length > 0 && (
          <>
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
              {draftSets.map((set) => (
                <motion.div
                  key={set._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <QuizCard
                    title={set.title}
                    description={set.description || `${set.cards?.length || 0} flashcards`}
                    author={user?.displayName || user?.email?.split('@')[0] || 'You'}
                    items={set.cards?.length || 0}
                    setId={set._id}
                    onStartQuiz={() => handleStartQuiz(set._id)}
                    onLearn={() => handleLearnSet(set._id)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </>
        )}

        {recentSets.length > 0 && (
          <>
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
              {recentSets.map((set) => (
                <motion.div
                  key={set._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <QuizCard
                    title={set.title}
                    description={set.description || `${set.cards?.length || 0} flashcards`}
                    author={user?.displayName || user?.email?.split('@')[0] || 'You'}
                    items={set.cards?.length || 0}
                    setId={set._id}
                    onStartQuiz={() => handleStartQuiz(set._id)}
                    onLearn={() => handleLearnSet(set._id)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </>
        )}

        {studySets.length === 0 && (
          <motion.div 
            className={styles.emptyState}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h3>No study sets yet</h3>
            <p>Create your first study set to get started!</p>
            <button 
              className={styles.createButton}
              onClick={() => navigate('/createstudyset')}
            >
              Create Study Set
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default StudySetsPage;

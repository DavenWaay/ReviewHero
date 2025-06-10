import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuthState } from "react-firebase-hooks/auth";
import SideBar from "../components/SideBar";
import 'boxicons/css/boxicons.min.css';
import TopBar from "../components/TopBar";
import QuizTitleCard from "../components/QuizTitleCard";
import { flashcardAPI } from "../services/api";
import { auth } from "../firebase";
import styles from "./Library.module.css";

const Library = () => {
  const [user, loading] = useAuthState(auth);
  const [flashcardSets, setFlashcardSets] = useState([]);
  const [filteredSets, setFilteredSets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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
        setFlashcardSets(response.data);
        setFilteredSets(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching flashcard sets:', error);
        setError('Failed to load flashcard sets');
        setFlashcardSets([]);
        setFilteredSets([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (!loading) {
      fetchFlashcardSets();
    }
  }, [user, loading]);

  useEffect(() => {
    const filtered = flashcardSets.filter(set =>
      set.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      set.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSets(filtered);
  }, [searchTerm, flashcardSets]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (loading) {
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

  if (!user) {
    return (
      <div className={styles.container}>
        <SideBar />
        <div className={styles.main}>
          <TopBar />
          <div className={styles.error}>Please sign in to view your library.</div>
        </div>
      </div>
    );
  }

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
          <input 
            type="text" 
            placeholder="Search..." 
            className={styles.searchInput}
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </motion.div>

        <div className={styles.sectionTitle}>
          <motion.h4
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Your Flashcard Sets ({filteredSets.length})
          </motion.h4>
          <motion.hr
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className={styles.divider}
          />
        </div>

        {/* Loading State */}
        {isLoading && (
          <motion.div 
            className={styles.loading}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Loading your flashcard sets...
          </motion.div>
        )}

        {/* Error State */}
        {error && (
          <motion.div 
            className={styles.error}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {error}
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredSets.length === 0 && (
          <motion.div 
            className={styles.emptyState}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {searchTerm ? 'No flashcard sets match your search.' : 'No flashcard sets found. Create your first set!'}
          </motion.div>
        )}

        {/* Animated Quiz Cards */}
        {!isLoading && !error && filteredSets.length > 0 && (
          <motion.div 
            className={styles.quizSection}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {filteredSets.map((set, index) => (
              <motion.div
                key={set._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <QuizTitleCard 
                  title={set.title}
                  description={set.description}
                  author={set.createdBy?.name || 'You'}
                  items={set.cards?.length || 0}
                  setId={set._id}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default Library;

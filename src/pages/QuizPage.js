import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "./QuizPage.module.css";
import { flashcardAPI } from "../services/api";

const QuizPage = () => {
  const navigate = useNavigate();
  const { setId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const shuffleOptions = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        
        if (!setId) {
          // Fallback: use static questions if no setId provided
          const staticQuestions = [
            {
              question: "What is React?",
              options: ["A JavaScript library", "A database", "A server", "An operating system"],
              answer: "A JavaScript library"
            },
            {
              question: "What does JSX stand for?",
              options: ["JavaScript XML", "Java Syntax Extension", "JSON XML", "JavaScript Extension"],
              answer: "JavaScript XML"
            },
            {
              question: "What is a component in React?",
              options: ["A reusable piece of UI", "A database table", "A server endpoint", "A CSS file"],
              answer: "A reusable piece of UI"
            }
          ];
          setQuestions(staticQuestions);
          setError(null);
          setLoading(false);
          return;
        }

        const response = await flashcardAPI.getFlashcardSet(setId);
        if (response.data && response.data.cards) {
          // Map flashcards to quiz questions format
          const quizQuestions = response.data.cards.map(card => {
            // Generate some fake options for multiple choice
            const fakeOptions = [
              "Ninoy Aquino",
              "Heneral Luna", 
              "Juan Luna"
            ];
            const allOptions = [card.term, ...fakeOptions];
            
            return {
              question: card.definition,
              options: shuffleOptions(allOptions),
              answer: card.term
            };
          });
          setQuestions(quizQuestions);
        } else {
          setQuestions([]);
        }
        setError(null);
      } catch (err) {
        console.error("Error fetching quiz questions:", err);
        setError("Failed to load quiz questions");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [setId]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleAnswerClick = (selectedOption) => {
    if (questions.length === 0) return;

    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        navigate("/result", { state: { score: score + 1, total: questions.length } });
      }
    }, 300); // small delay for animation feel
  };

  const progress = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  if (loading) {
    return <div className={styles.loading}>Loading quiz...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (questions.length === 0) {
    return <div className={styles.noQuestions}>No quiz questions available.</div>;
  }

  return (
    <div className={styles.quizContainer}>
      <button className={styles.closeButton} onClick={handleGoBack}>✕</button>

      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
      </div>

      <motion.div
        className={styles.quizWindow}
        key={currentQuestion}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.questionArea}>
          <h2>{questions[currentQuestion].question}</h2>
        </div>

        <div className={styles.optionsArea}>
          {questions[currentQuestion].options.map((option, index) => (
            <motion.button
              whileTap={{ scale: 0.95 }}
              key={index}
              className={styles.optionBtn}
              onClick={() => handleAnswerClick(option)}
            >
              {option}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default QuizPage;

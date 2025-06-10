import React from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

import LandingPage from "./pages/LandingPage";
import FlashCard from "./pages/FlashCard";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Library from "./pages/Library"
import QuizPage from "./pages/QuizPage";
import StudySetsPage from "./pages/StudySetsPage";
import ResultPage from "./pages/ResultPage";
import AchievementsPage from "./pages/AchievementsPage";
import CreateFlashCard from "./pages/CreateFlashCard";
import LearnPage from "./pages/LearnPage";
import CreateStudySet from "./pages/CreateStudySet";

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes */}
        <Route path="/achievements" element={
          <ProtectedRoute>
            <AchievementsPage />
          </ProtectedRoute>
        } />
        <Route path="/learn" element={
          <ProtectedRoute>
            <LearnPage />
          </ProtectedRoute>
        } />
        <Route path="/result" element={
          <ProtectedRoute>
            <ResultPage />
          </ProtectedRoute>
        } />
        <Route path="/quizpage" element={
          <ProtectedRoute>
            <QuizPage />
          </ProtectedRoute>
        } />
        <Route path="/quizpage/:setId" element={
          <ProtectedRoute>
            <QuizPage />
          </ProtectedRoute>
        } />
        <Route path="/studysets" element={
          <ProtectedRoute>
            <StudySetsPage />
          </ProtectedRoute>
        } />
        <Route path="/library" element={
          <ProtectedRoute>
            <Library />
          </ProtectedRoute>
        } />
        <Route path="/flashcards" element={
          <ProtectedRoute>
            <FlashCard />
          </ProtectedRoute>
        } />
        <Route path="/flashcard/:setId" element={
          <ProtectedRoute>
            <FlashCard />
          </ProtectedRoute>
        } />
        <Route path="/learn/:setId" element={
          <ProtectedRoute>
            <LearnPage />
          </ProtectedRoute>
        } />
        <Route path="/quiz/:setId" element={
          <ProtectedRoute>
            <QuizPage />
          </ProtectedRoute>
        } />
        <Route path="/createflashcard" element={
          <ProtectedRoute>
            <CreateFlashCard />
          </ProtectedRoute>
        } />
        <Route path="/createstudyset" element={
          <ProtectedRoute>
            <CreateStudySet />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;

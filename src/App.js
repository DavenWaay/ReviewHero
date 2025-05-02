import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import FlashCard from "./pages/FlashCard";
import SignupPage from "./pages/SignupPage";
import Library from "./pages/Library"
import QuizPage from "./pages/QuizPage";
import StudySetsPage from "./pages/StudySetsPage";
import ResultPage from "./pages/ResultPage";
import AchievementsPage from "./pages/AchievementsPage";
import CreateFlashCard from "./pages/CreateFlashCard";
import LearnPage from "./pages/LearnPage";
import SignUpPage from "./pages/SignupPage";

function App() {
  return (
    <Router basename="/ReviewHero">
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/learn" element={<LearnPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/quizpage" element={<QuizPage />} />
        <Route path="/studysets" element={<StudySetsPage />} />
        <Route path="/library" element={<Library />} />
        <Route path="/flashcards" element={<FlashCard />} />
        <Route path="/createflashcard" element={<CreateFlashCard />} />
      </Routes>
    </Router>
  );
}

export default App;

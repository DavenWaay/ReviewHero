import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import FlashCard from "./pages/FlashCard";
import SignupPage from "./pages/SignupPage";
import QuizPage from "./pages/QuizPage";
import StudySetsPage from "./pages/StudySetsPage";
import CreateFlashCard from "./pages/CreateFlashCard";

function App() {
  return (
    <Router basename="/ReviewHero">
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/" element={<FlashCard />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/quizpage" element={<QuizPage />} />
        <Route path="/studysets" element={<StudySetsPage />} />
        <Route path="/flashcards" element={<FlashCard />} />
        <Route path="/createflashcard" element={<CreateFlashCard />} />
      </Routes>
    </Router>
  );
}

export default App;

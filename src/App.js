import React from "react";
import LandingPage from "./pages/LandingPage";
import FlashCard from "./pages/FlashCard";
import SignupPage from "./pages/SignupPage";
import QuizPage from "./pages/QuizPage";
import StudySetsPage from "./pages/StudySetsPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/landing" element={<LandingPage />} />  
        <Route path="/" element={<FlashCard />} />  
        <Route path="/signup" element={<SignupPage />} />  
        <Route path="/quizpage" element={<QuizPage />} />
        <Route path="/studysets" element={<StudySetsPage />} />
        <Route path="/flashcards" element={<FlashCard />} />
      </Routes>
    </Router>
  );
}

export default App;

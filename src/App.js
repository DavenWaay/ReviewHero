import React from "react";
import LandingPage from "./pages/LandingPage";
import FlashCard from "./pages/FlashCard";
import FlashCardPage from "./pages/FlashCardPage";
import SignupPage from "./pages/SignupPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateFlashCard from "./pages/CreateFlashCard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateFlashCard />} />
        <Route path="/flashcards" element={<FlashCard />} />
      </Routes>
    </Router>
  );
}

export default App;

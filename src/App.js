import React from "react";
import LandingPage from "./pages/LandingPage";
import FlashCard from "./pages/FlashCard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FlashCard />} />
        <Route path="/flashcards" element={<FlashCard />} />
      </Routes>
    </Router>
  );
}

export default App;

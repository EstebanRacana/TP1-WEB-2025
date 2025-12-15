// En src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import WordGame from './pages/WordGame';
import RockPaperScissors from './pages/RockPaperScissors';
import BlackJack from './pages/BlackJack';
import About from './pages/About';
import Contact from './pages/Contact';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/word-game" element={<WordGame />} />
          <Route path="/rock-paper-scissors" element={<RockPaperScissors />} />
          <Route path="/blackjack" element={<BlackJack />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
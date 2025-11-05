// En src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import WordGame from './pages/WordGame';
import RockPaperScissors from './pages/RockPaperScissors';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/word-game" element={<WordGame />} />
          <Route path="/rock-paper-scissors" element={<RockPaperScissors />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
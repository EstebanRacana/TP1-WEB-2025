// En src/pages/WordGame.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/WordGame.css';

const WordGame = () => {
  const words = ["PERRO", "GATO", "CASA", "JUEGO", "LIBRO", "FUEGO", "TIERRA"];
  const [chosenWord, setChosenWord] = useState("");
  const [displayWord, setDisplayWord] = useState([]);
  const [attempts, setAttempts] = useState(6);
  const [message, setMessage] = useState("");
  const [inputValue, setInputValue] = useState("");

  const startGame = () => {
    const newWord = words[Math.floor(Math.random() * words.length)];
    setChosenWord(newWord);
    setDisplayWord(Array(newWord.length).fill("_"));
    setAttempts(6);
    setMessage("");
  };

  useEffect(() => {
    startGame();
  }, []);

  const handleGuess = () => {
    const letter = inputValue.toUpperCase();
    setInputValue("");

    if (!letter.match(/[A-ZÑ]/)) {
      setMessage("Por favor ingresa una letra válida.");
      return;
    }

    if (chosenWord.includes(letter)) {
      const newDisplay = [...displayWord];
      chosenWord.split("").forEach((char, i) => {
        if (char === letter) {
          newDisplay[i] = letter;
        }
      });
      setDisplayWord(newDisplay);
      setMessage(`¡Bien! La letra "${letter}" está en la palabra.`);
    } else {
      setAttempts(prev => prev - 1);
      setMessage(`La letra "${letter}" no está.`);
    }
  };

  return (
    <div className="game-container">
      <h1>Juego de Buscar la Palabra</h1>
      <div id="word-display">{displayWord.join(" ")}</div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        maxLength="1"
        placeholder="Ingresa una letra"
      />
      <button onClick={handleGuess}>Adivinar</button>
      <p id="message">{message}</p>
      <div id="attempts-left">Intentos restantes: {attempts}</div>
      <button onClick={startGame}>Reiniciar Juego</button>
      
      <section className="Salir">
        <Link to="/">Salir</Link>
      </section>
    </div>
  );
};

export default WordGame;
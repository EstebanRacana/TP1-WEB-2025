import React, { useState, useEffect } from 'react';

const AdivinaPage = ({ setCurrentPage }) => {
  const words = ["PERRO", "GATO", "CASA", "JUEGO", "LIBRO", "FUEGO", "TIERRA"];
  const [chosenWord, setChosenWord] = useState("");
  const [displayWord, setDisplayWord] = useState([]);
  const [attempts, setAttempts] = useState(6);
  const [message, setMessage] = useState("");
  const [letterInput, setLetterInput] = useState("");

  useEffect(() => {
    startGame();
  }, []);

  const startGame = () => {
    const word = words[Math.floor(Math.random() * words.length)];
    setChosenWord(word);
    setDisplayWord(Array(word.length).fill("_"));
    setAttempts(6);
    setMessage("");
    setLetterInput("");
  };

  const handleGuess = () => {
    const letter = letterInput.toUpperCase();
    setLetterInput("");

    if (!letter.match(/[A-ZÑ]/) || letter.length === 0) {
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

      if (!newDisplay.includes("_")) {
        setMessage("🎉 ¡Ganaste!");
      }
    } else {
      const newAttempts = attempts - 1;
      setAttempts(newAttempts);
      setMessage(`La letra "${letter}" no está.`);

      if (newAttempts <= 0) {
        setMessage(`💀 Perdiste. La palabra era "${chosenWord}".`);
      }
    }
  };

  return (
    <>
      <style>{`
        body {
          font-family: Arial, sans-serif;
          background-color: #f1f1f1;
          text-align: center;
          margin-top: 50px;
        }
        .game-container {
          background-color: #fff;
          width: 400px;
          margin: 0 auto;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
        }
        #word-display {
          font-size: 36px;
          letter-spacing: 10px;
          margin-bottom: 20px;
        }
        input {
          font-size: 20px;
          padding: 5px;
          width: 50px;
        }
        button {
          background-color: #4CAF50;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin-top: 10px;
        }
        button:hover {
          background-color: #45a049;
        }
        #attempts-left {
          margin-top: 20px;
          font-size: 18px;
        }
        #message {
          font-size: 18px;
          font-weight: bold;
          color: #FF6347;
        }
        #reset-btn {
          margin-top: 20px;
          background-color: #f44336;
        }
        a {
          display: block;
          width: 100px;
          margin: 20px auto;
          padding: 10px;
          background-color: #4CAF50;
          color: white;
          text-align: center;
          text-decoration: none;
          border-radius: 5px;
          cursor: pointer;
        }
        @media (max-width: 1024px) {
          .game-container {
            width: 70%;
          }
          #word-display {
            font-size: 32px;
            letter-spacing: 8px;
          }
          input {
            font-size: 18px;
            width: 45px;
          }
        }
        @media (max-width: 768px) {
          body {
            margin-top: 20px;
          }
          .game-container {
            width: 90%;
            padding: 15px;
          }
          h1 {
            font-size: 1.5rem;
          }
          #word-display {
            font-size: 28px;
            letter-spacing: 6px;
          }
          input {
            font-size: 18px;
            width: 40px;
          }
          button {
            padding: 8px 16px;
            font-size: 0.9rem;
          }
          #attempts-left,
          #message {
            font-size: 16px;
          }
        }
        @media (max-width: 480px) {
          h1 {
            font-size: 1.2rem;
          }
          #word-display {
            font-size: 22px;
            letter-spacing: 4px;
          }
          input {
            width: 35px;
            font-size: 16px;
          }
          button {
            width: 100%;
          }
        }
      `}</style>

      <div className="game-container">
        <h1>Juego de Buscar la Palabra</h1>
        <div id="word-display">{displayWord.join(" ")}</div>
        <input 
          type="text" 
          id="letter-input" 
          maxLength="1" 
          placeholder="Ingresa una letra"
          value={letterInput}
          onChange={(e) => setLetterInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleGuess()}
        />
        <button id="guess-btn" onClick={handleGuess}>Adivinar</button>
        <p id="message">{message}</p>
        <div id="attempts-left">Intentos restantes: {attempts}</div>
        <button id="reset-btn" onClick={startGame}>Reiniciar Juego</button>
        <a onClick={() => setCurrentPage('index')}>Salir</a>
      </div>
    </>
  );
};

export default AdivinaPage;
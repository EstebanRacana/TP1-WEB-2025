import React from 'react';

const Minijuego3Page = ({ setCurrentPage }) => {
  const cartas = ['K','Q','J','10','9','8','7','6','5','4','3','2'];

  const jugar = () => {
    const computadora = cartas[Math.floor(Math.random() * cartas.length)];
    alert("Tiene: " + computadora);
    const jugador = cartas[Math.floor(Math.random() * cartas.length)];
    alert("Tienes: " + jugador);
  };

  return (
    <>
      <style>{`
        body {
          font-family: Arial, sans-serif;
          background-color: #282c34;
          color: white;
          text-align: center;
          padding: 50px;
        }
        button {
          background-color: #4CAF50;
          color: white;
          padding: 15px 30px;
          border: none;
          border-radius: 5px;
          font-size: 18px;
          cursor: pointer;
          margin: 10px;
        }
        button:hover {
          background-color: #45a049;
        }
        a {
          display: inline-block;
          margin-top: 20px;
          padding: 10px 20px;
          background-color: #007BFF;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          cursor: pointer;
        }
      `}</style>

      <h1>Blackjack</h1>
      <button onClick={jugar}>Jugar</button>
      <br />
      <a onClick={() => setCurrentPage('index')}>Salir</a>
    </>
  );
};

export default Minijuego3Page;
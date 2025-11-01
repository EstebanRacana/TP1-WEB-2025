import React from 'react';

const IndexPage = ({ setCurrentPage }) => {
  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: Arial, sans-serif;
          background-color: #282c34;
        }
        .banner {
          height: 200px;
          background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .banner h1 {
          color: white;
          text-align:center;
        }
        h2 {
          color: rgb(250, 250, 250);
          text-align: center;
        }
        img {
          width: 200px;
          height: 200px;
          justify-content: center;
          align-items: center;
          display: block;
          margin-left: auto;
          margin-right: auto;
          border-radius: 20px;
          border: 5px solid black;
          box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
        }
        h3 {
          color: rgb(250, 250, 250);
          text-align: center; 
        }
        p {
          color: rgb(250, 250, 250);
          text-align: center; 
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
        footer {
          background-color: #20232a;
          color: white;
          text-align: center;
          padding: 10px 0;
          position: fixed;
          bottom: 0;
          width: 100%;
        }
        @media (max-width: 1024px) {
          .banner {
            height: 150px;
            background-size: cover;
            background-position: center;
          }
          img {
            width: 150px;
            height: 150px;
          }
          a {
            width: 80px;
            font-size: 0.9rem;
          }
          footer {
            font-size: 0.9rem;
          }
        }
        @media (max-width: 768px) {
          .banner h1 {
            font-size: 1.5rem;
            padding: 0 10px;
          }
          h2 {
            font-size: 1.2rem;
          }
          h3 {
            font-size: 1rem;
          }
          p {
            font-size: 0.9rem;
            padding: 0 10px;
          }
          img {
            width: 120px;
            height: 120px;
          }
          a {
            width: 70px;
            font-size: 0.85rem;
            padding: 8px;
          }
          footer {
            font-size: 0.8rem;
          }
        }
        @media (max-width: 480px) {
          .banner h1 {
            font-size: 1.2rem;
          }
          img {
            width: 100px;
            height: 100px;
          }
          a {
            width: 60px;
            font-size: 0.8rem;
          }
          footer {
            font-size: 0.7rem;
            padding: 8px 0;
          }
        }
      `}</style>
      
      <header>
        <div className="banner">
          <h1>Casual Games: Entretenimiento con minijuegos</h1>
        </div>
      </header>
      <main>
        <div className="fondo">
          <h2>Estos son los minijuegos</h2>
        </div>
        <div className="adivinar_palabra">
          <h3>¡Adivina la palabra!</h3>
          <p>En este juego, el jugador debe adivinar una palabra oculta escribiendo las letras. Cada letra correcta revelará su posición en la palabra, mientras que las letras incorrectas reducirán el número de intentos disponibles. El objetivo es adivinar la palabra antes de quedarse sin intentos.</p>
          <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23f0f0f0' width='200' height='200'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='60'%3E🔤%3C/text%3E%3C/svg%3E" alt="Imagen del adivinar la palabra" />
          <a onClick={() => setCurrentPage('adivina')}>Jugar</a>
        </div>
        <div className="minijuego_2">
          <h3>Piedra-Papel-Tijera</h3>
          <p>En este clásico juego, el jugador compite contra la computadora eligiendo entre tres opciones: piedra, papel o tijera. Cada opción tiene una ventaja sobre otra (piedra aplasta tijera, tijera corta papel, papel cubre piedra). El objetivo es ganar la mayor cantidad de rondas posibles.</p>
          <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23e0e0e0' width='200' height='200'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='50'%3E✊✋✌️%3C/text%3E%3C/svg%3E" alt="Imagen del juego piedra-papel-tijera" />
          <a onClick={() => setCurrentPage('minijuego_2')}>Jugar</a>
        </div>
        <div className="minijuego_3">
          <h3>Blackjack</h3>
          <p>Proximamente...</p>
          <img src="" alt="Imagen del juego blackjack" />
          <a onClick={() => setCurrentPage('minijuego_3')}>Jugar</a>
        </div>
      </main>
      <footer>Derechos Reservados&copy;</footer>
    </>
  );
};

export default IndexPage;
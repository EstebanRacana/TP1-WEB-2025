// En src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div>
      <header>
        <div className="banner">
          <h1>Casual Games: Entretenimiento con minijuegos</h1>
        </div>
      </header>
      
      <main>
        <div className="fondo">
          <h2>Estos son los minijuegos</h2>
        </div>
        
        {/* Juego 1: Adivina la palabra */}
        <div className="adivinar_palabra">
            <h3>¡Adivina la palabra!</h3>
            <p>En este juego, el jugador debe adivinar una palabra oculta...</p>
            <img src="/img/juego_de_palabras_imagen.png" alt="Imagen del adivinar la palabra" />
            <Link to="/word-game">Jugar</Link>
        </div>
        
        {/* Juego 2: Piedra Papel Tijera */}
        <div className="minijuego_2">
            <h3>Piedra-Papel-Tijera</h3>
            <p>En este clásico juego, el jugador compite contra la computadora...</p>
            <img src="/img/piedra_papel_tijera_imagen.png" alt="Imagen del juego piedra-papel-tijera" />
  <         Link to="/rock-paper-scissors">Jugar</Link>
        </div>
        
        {/* Juego 3: Blackjack */}
        <div className="minijuego_3">
          <h3>Blackjack</h3>
          <p>Este juego es el famoso BlackJack, compite contra la computadora y ganala sumando puntos a tu baraja y apostando de forma ficticia</p>
          <img src="/img/imagen_blackJack.png" alt="Imagen del juego blackjack" />
          <Link to="/blackjack">Jugar</Link>
        </div>
      </main>
      
      <footer>Derechos Reservados&copy;</footer>
    </div>
  );
};

export default Home;
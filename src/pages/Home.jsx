import React from 'react';

const Home = () => {
  const navigateTo = (path) => {
    window.location.href = path;
  };

  return (
    <div>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: Arial, sans-serif;
        }

        /* Navegación superior */
        .top-nav {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 15px 0;
          position: sticky;
          top: 0;
          z-index: 1000;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .nav-logo {
          color: white;
          font-size: 1.5em;
          font-weight: bold;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .nav-logo:hover {
          transform: scale(1.05);
        }

        .nav-menu {
          display: flex;
          gap: 30px;
          list-style: none;
        }

        .nav-link {
          color: white;
          text-decoration: none;
          font-weight: 600;
          font-size: 1.1em;
          padding: 8px 20px;
          border-radius: 5px;
          transition: background 0.3s ease;
          cursor: pointer;
        }

        .nav-link:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        /* Banner */
        .banner {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          color: white;
          padding: 80px 20px;
          text-align: center;
        }

        .banner h1 {
          font-size: 2.5em;
          margin-bottom: 10px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        /* Main content */
        main {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
        }

        .fondo {
          text-align: center;
          margin-bottom: 50px;
        }

        .fondo h2 {
          font-size: 2.2em;
          color: #2c3e50;
          border-bottom: 3px solid #3498db;
          display: inline-block;
          padding-bottom: 10px;
        }

        /* Tarjetas de juegos */
        .game-card {
          background: white;
          border-radius: 15px;
          padding: 30px;
          margin-bottom: 40px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .game-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .game-card h3 {
          color: #2c3e50;
          font-size: 2em;
          margin-bottom: 15px;
        }

        .game-card p {
          color: #666;
          font-size: 1.1em;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .game-card img {
          width: 100%;
          max-width: 500px;
          height: auto;
          border-radius: 10px;
          margin: 20px 0;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
        }

        .game-card button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 15px 40px;
          font-size: 1.1em;
          font-weight: bold;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .game-card button:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
        }

        /* Sección CTA */
        .cta-section {
          background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
          padding: 60px 30px;
          text-align: center;
          margin: 50px 0;
          border-radius: 15px;
          color: white;
        }

        .cta-section h2 {
          font-size: 2.2em;
          margin-bottom: 20px;
        }

        .cta-section p {
          font-size: 1.2em;
          margin-bottom: 30px;
        }

        .cta-buttons {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .cta-btn {
          padding: 15px 40px;
          background: white;
          color: #11998e;
          border: none;
          font-weight: bold;
          font-size: 1.1em;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .cta-btn:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }

        .cta-btn.secondary {
          background: transparent;
          color: white;
          border: 2px solid white;
        }

        .cta-btn.secondary:hover {
          background: white;
          color: #11998e;
        }

        /* Footer */
        footer {
          background: #2c3e50;
          color: white;
          padding: 30px 20px;
          margin-top: 50px;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
        }

        .footer-links {
          margin-top: 15px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 15px;
        }

        .footer-links button {
          background: none;
          border: none;
          color: #3498db;
          cursor: pointer;
          font-size: 1em;
          transition: color 0.3s ease;
        }

        .footer-links button:hover {
          color: #5dade2;
        }

        .footer-links span {
          color: #7f8c8d;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .nav-container {
            flex-direction: column;
            gap: 15px;
          }

          .nav-menu {
            gap: 15px;
          }

          .banner h1 {
            font-size: 1.8em;
          }

          .fondo h2 {
            font-size: 1.6em;
          }

          .game-card h3 {
            font-size: 1.5em;
          }

          .cta-section h2 {
            font-size: 1.6em;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }

          .cta-btn {
            width: 100%;
            max-width: 300px;
          }

          .footer-links {
            flex-direction: column;
            gap: 10px;
          }

          .footer-links span {
            display: none;
          }
        }
      `}</style>

      {/* Barra de navegación */}
      <nav className="top-nav">
        <div className="nav-container">
          <div className="nav-logo" onClick={() => navigateTo('/')}>
            🎮 Casual Games
          </div>
          <ul className="nav-menu">
            <li>
              <span className="nav-link" onClick={() => navigateTo('/')}>
                Inicio
              </span>
            </li>
            <li>
              <span className="nav-link" onClick={() => navigateTo('/about')}>
                Sobre Nosotros
              </span>
            </li>
            <li>
              <span className="nav-link" onClick={() => navigateTo('/contact')}>
                Contacto
              </span>
            </li>
          </ul>
        </div>
      </nav>

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
        <div className="game-card adivinar_palabra">
          <h3>¡Adivina la palabra!</h3>
          <p>En este juego, el jugador debe adivinar una palabra oculta...</p>
          <img src="/img/juego_de_palabras_imagen.png" alt="Imagen del adivinar la palabra" />
          <button onClick={() => navigateTo('/word-game')}>Jugar</button>
        </div>
        
        {/* Juego 2: Piedra Papel Tijera */}
        <div className="game-card minijuego_2">
          <h3>Piedra-Papel-Tijera</h3>
          <p>En este clásico juego, el jugador compite contra la computadora...</p>
          <img src="/img/piedra_papel_tijera_imagen.png" alt="Imagen del juego piedra-papel-tijera" />
          <button onClick={() => navigateTo('/rock-paper-scissors')}>Jugar</button>
        </div>
        
        {/* Juego 3: Blackjack */}
        <div className="game-card minijuego_3">
          <h3>Blackjack</h3>
          <p>Este juego es el famoso BlackJack, compite contra la computadora y ganala sumando puntos a tu baraja y apostando de forma ficticia</p>
          <img src="/img/imagen_blackJack.png" alt="Imagen del juego blackjack" />
          <button onClick={() => navigateTo('/blackjack')}>Jugar</button>
        </div>

        {/* Sección de llamado a acción */}
        <div className="cta-section">
          <h2>¿Quieres saber más sobre nosotros?</h2>
          <p>Conoce nuestro equipo y nuestra misión, o contáctanos si tienes alguna pregunta</p>
          <div className="cta-buttons">
            <button className="cta-btn" onClick={() => navigateTo('/about')}>
              Sobre Nosotros
            </button>
            <button className="cta-btn secondary" onClick={() => navigateTo('/contact')}>
              Contáctanos
            </button>
          </div>
        </div>
      </main>
      
      <footer>
        <div className="footer-content">
          <p>Derechos Reservados&copy; 2024 Casual Games</p>
          <div className="footer-links">
            <button onClick={() => navigateTo('/about')}>Sobre Nosotros</button>
            <span>|</span>
            <button onClick={() => navigateTo('/contact')}>Contacto</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
import React from 'react';

const About = () => {
  const navigateTo = (path) => {
    window.location.href = path;
  };

  return (
    <div className="about-container">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .about-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
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

        .banner {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 60px 20px;
          text-align: center;
        }

        .banner h1 {
          font-size: 2.5em;
          margin: 0;
        }

        .about-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
          flex: 1;
        }

        .about-intro,
        .about-mission,
        .about-games,
        .about-values,
        .about-cta {
          margin-bottom: 50px;
          animation: fadeIn 0.8s ease-in;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .about-content h2 {
          color: #2c3e50;
          font-size: 2em;
          margin-bottom: 20px;
          border-bottom: 3px solid #3498db;
          padding-bottom: 10px;
        }

        .about-content p {
          line-height: 1.8;
          color: #555;
          font-size: 1.1em;
          margin-bottom: 15px;
        }

        .about-games ul {
          list-style: none;
          padding: 0;
        }

        .about-games li {
          background: #f8f9fa;
          padding: 15px;
          margin: 10px 0;
          border-left: 4px solid #3498db;
          border-radius: 5px;
          transition: transform 0.3s ease;
        }

        .about-games li:hover {
          transform: translateX(10px);
          background: #e8f4f8;
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
          margin-top: 30px;
        }

        .value-item {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 30px;
          border-radius: 15px;
          text-align: center;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .value-item:hover {
          transform: translateY(-10px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }

        .value-item h3 {
          font-size: 1.8em;
          margin-bottom: 15px;
        }

        .value-item p {
          color: #f0f0f0;
          font-size: 1em;
        }

        .about-cta {
          text-align: center;
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          color: white;
          padding: 50px 30px;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .about-cta h2 {
          color: white;
          border-bottom: none;
        }

        .about-cta p {
          color: white;
          font-size: 1.2em;
          margin-bottom: 30px;
        }

        .cta-buttons {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .btn-primary,
        .btn-secondary {
          padding: 15px 40px;
          font-size: 1.1em;
          border: none;
          border-radius: 50px;
          text-decoration: none;
          font-weight: bold;
          transition: all 0.3s ease;
          cursor: pointer;
          display: inline-block;
        }

        .btn-primary {
          background: white;
          color: #f5576c;
        }

        .btn-primary:hover {
          background: #2c3e50;
          color: white;
          transform: scale(1.05);
        }

        .btn-secondary {
          background: transparent;
          color: white;
          border: 2px solid white;
        }

        .btn-secondary:hover {
          background: white;
          color: #f5576c;
          transform: scale(1.05);
        }

        footer {
          background: #2c3e50;
          color: white;
          padding: 20px;
          text-align: center;
          margin-top: auto;
        }

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

          .about-content {
            padding: 20px 15px;
          }

          .about-content h2 {
            font-size: 1.5em;
          }

          .values-grid {
            grid-template-columns: 1fr;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }

          .btn-primary,
          .btn-secondary {
            width: 100%;
            max-width: 300px;
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
          <h1>Sobre Nosotros</h1>
        </div>
      </header>
      
      <main className="about-content">
        <section className="about-intro">
          <h2>¿Quiénes Somos?</h2>
          <p>
            Bienvenido a <strong>Casual Games</strong>, tu destino para disfrutar de 
            entretenimiento ligero y divertido. Somos un equipo apasionado por crear 
            experiencias de juego accesibles para todos.
          </p>
        </section>

        <section className="about-mission">
          <h2>Nuestra Misión</h2>
          <p>
            Creemos que los mejores momentos de diversión no tienen que ser complicados. 
            Nuestra misión es ofrecer minijuegos clásicos y originales que puedas disfrutar 
            en cualquier momento, sin descargas ni complicaciones.
          </p>
        </section>

        <section className="about-games">
          <h2>Nuestros Juegos</h2>
          <p>
            Ofrecemos una colección cuidadosamente seleccionada de minijuegos que incluyen:
          </p>
          <ul>
            <li><strong>Adivina la Palabra:</strong> Pon a prueba tu vocabulario y lógica</li>
            <li><strong>Piedra-Papel-Tijera:</strong> El clásico juego de estrategia</li>
            <li><strong>Blackjack:</strong> Desafía tu suerte en este juego de cartas</li>
          </ul>
        </section>

        <section className="about-values">
          <h2>Nuestros Valores</h2>
          <div className="values-grid">
            <div className="value-item">
              <h3>🎮 Diversión</h3>
              <p>Entretenimiento de calidad al alcance de todos</p>
            </div>
            <div className="value-item">
              <h3>🚀 Simplicidad</h3>
              <p>Juegos fáciles de entender, difíciles de dominar</p>
            </div>
            <div className="value-item">
              <h3>💯 Gratuito</h3>
              <p>Acceso libre y sin costo para toda la comunidad</p>
            </div>
          </div>
        </section>

        <section className="about-cta">
          <h2>¡Únete a la Diversión!</h2>
          <p>
            Explora nuestros juegos y descubre horas de entretenimiento. 
            Si tienes alguna pregunta o sugerencia, no dudes en contactarnos.
          </p>
          <div className="cta-buttons">
            <button className="btn-primary" onClick={() => navigateTo('/')}>
              Volver al Inicio
            </button>
            <button className="btn-secondary" onClick={() => navigateTo('/contact')}>
              Contáctanos
            </button>
          </div>
        </section>
      </main>
      
      <footer>Derechos Reservados&copy; 2024 Casual Games</footer>
    </div>
  );
};

export default About;
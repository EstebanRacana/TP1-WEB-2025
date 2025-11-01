import React, { useEffect } from 'react';

const Minijuego2Page = ({ setCurrentPage }) => {
  const opciones = ['Piedra', 'Papel', 'Tijera'];

  useEffect(() => {
    // Este efecto vacío simula el comportamiento del script original
  }, []);

  const jugar = (jugador) => {
    const computadora = opciones[Math.floor(Math.random() * opciones.length)];
    
    if (jugador === computadora) {
      alert("Empate! Ambos eligieron " + jugador);
    } else if (
      (jugador === 'Piedra' && computadora === 'Tijera') ||
      (jugador === 'Papel' && computadora === 'Piedra') ||
      (jugador === 'Tijera' && computadora === 'Papel')
    ) {
      alert("Ganaste! La computadora eligió " + computadora);
    } else {
      alert("Perdiste! La computadora eligió " + computadora);
    }
  };

  return (
    <>
      <style>{`
        body {
          font-family: Arial, sans-serif;
          background-color: #aaedf1;
          text-align: center;
          padding: 30px;
        }
        button {
          background-color: #007BFF;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          transition: background 0.3s ease;
          margin: 10px;
        }
        button:hover {
          background-color: #0056b3;
        }
        .Salir {
          margin-top: 20px;
          text-align: center;
          font-size: 18px;
          font-weight: bold;
        }
        .Salir a {
          display: inline-block;
          padding: 10px 20px;
          background-color: #4CAF50;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          cursor: pointer;
        }
        @media (max-width: 1024px) {
          body {
            padding: 20px;
          }
          button {
            font-size: 14px;
            padding: 8px 16px;
          }
          .Salir {
            font-size: 16px;
          }
        }
        @media (max-width: 768px) {
          h1 {
            font-size: 1.5rem;
          }
          button {
            display: block;
            width: 70%;
            max-width: 250px;
            margin: 10px auto;
            font-size: 1rem;
          }
          .Salir {
            font-size: 14px;
          }
        }
        @media (max-width: 480px) {
          h1 {
            font-size: 1.2rem;
          }
          button {
            width: 80%;
            font-size: 0.9rem;
            padding: 8px;
          }
          .Salir {
            font-size: 12px;
          }
        }
      `}</style>

      <h1>¡Elige!</h1>
      <section>
        <div className="minijuego_2">
          {opciones.map((opcion) => (
            <button key={opcion} onClick={() => jugar(opcion)}>
              {opcion}
            </button>
          ))}
        </div>
      </section>
      <section className="Salir">
        <a onClick={() => setCurrentPage('index')}>Salir</a>
      </section>
    </>
  );
};

export default Minijuego2Page;
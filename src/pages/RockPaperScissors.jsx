import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/RockPaperScissors.css'; // Tus estilos CSS

const RockPaperScissors = () => {
    // Array de opciones del juego (igual que antes)
    const opciones = ['Piedra', 'Papel', 'Tijera'];

    // Función jugar (casi igual que antes)
    const jugar = (jugador) => {
        // Genera elección aleatoria de la computadora
        const computadora = opciones[Math.floor(Math.random() * opciones.length)];
        
        // Lógica del juego (igual que antes)
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

    // En React, los botones se crean DIRECTAMENTE en el return
    return (
        <div className="container">
            <h1>¡Elige!</h1>
            
            <section>
                <div className="minijuego_2">
                    {/* EN REACT: Creamos los botones DIRECTAMENTE aquí */}
                    {opciones.map((opcion) => (
                        <button 
                            key={opcion}  // Importante: cada elemento necesita key
                            onClick={() => jugar(opcion)}  // Click ejecuta jugar
                            className="game-button"  // Clase para estilos
                        >
                            {opcion}  {/* Muestra Piedra, Papel o Tijera */}
                        </button>
                    ))}
                </div>
            </section>
            
            <section className="Salir">
                <Link to="/">Salir</Link>
            </section>
        </div>
    );
};

export default RockPaperScissors;
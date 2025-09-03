// script.js

// Lista de palabras para el juego
const words = ['javascript', 'html', 'css', 'node', 'react', 'angular', 'palabra'];

// Variables de estado
let selectedWord = '';
let guessedLetters = [];
let attemptsLeft = 6;
let displayedWord = '';

// Función para iniciar el juego
function startGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    attemptsLeft = 6;
    displayedWord = '_'.repeat(selectedWord.length);
    updateUI();
}

// Actualizar la interfaz de usuario
function updateUI() {
    document.getElementById('word-display').textContent = displayedWord.split('').join(' ');
    document.getElementById('attempts-left').textContent = `Intentos restantes: ${attemptsLeft}`;
    document.getElementById('message').textContent = '';
    document.getElementById('letter-input').value = '';
}

// Verificar si la letra es correcta o incorrecta
function guessLetter() {
    const input = document.getElementById('letter-input').value.toLowerCase();
    
    if (input === '' || guessedLetters.includes(input)) {
        return;  // No hacer nada si la letra está vacía o ya fue adivinada
    }

    guessedLetters.push(input);

    if (selectedWord.includes(input)) {
        // Actualizar la palabra mostrada
        displayedWord = displayedWord.split('').map((char, idx) => {
            return selectedWord[idx] === input ? input : char;
        }).join('');
    } else {
        // Restar un intento
        attemptsLeft--;
    }

    // Verificar si el jugador ha ganado o perdido
    if (displayedWord === selectedWord) {
        document.getElementById('message').textContent = '¡Felicidades, ganaste!';
    } else if (attemptsLeft === 0) {
        document.getElementById('message').textContent = `Perdiste! La palabra era "${selectedWord}"`;
    }

    updateUI();
}

// Reiniciar el juego
function resetGame() {
    startGame();
}

// Iniciar el juego cuando cargue la página
window.onload = startGame;

// Agregar evento para adivinar la letra
document.getElementById('guess-btn').addEventListener('click', guessLetter);

// Agregar evento para reiniciar el juego
document.getElementById('reset-btn').addEventListener('click', resetGame);
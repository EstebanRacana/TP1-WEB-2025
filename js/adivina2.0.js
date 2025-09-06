const words = ["PERRO", "GATO", "CASA", "JUEGO", "LIBRO", "FUEGO", "TIERRA"];
let chosenWord = "";
let displayWord = [];
let attempts = 6;

const wordDisplay = document.getElementById("word-display");
const letterInput = document.getElementById("letter-input");
const guessBtn = document.getElementById("guess-btn");
const resetBtn = document.getElementById("reset-btn");
const messageEl = document.getElementById("message");
const attemptsLeft = document.getElementById("attempts-left");

function startGame() {
    chosenWord = words[Math.floor(Math.random() * words.length)];
    displayWord = Array(chosenWord.length).fill("_");
    attempts = 6;
    updateDisplay();
    messageEl.textContent = "";
    attemptsLeft.textContent = `Intentos restantes: ${attempts}`;
}

function updateDisplay() {
    wordDisplay.textContent = displayWord.join(" ");
}

guessBtn.addEventListener("click", () => {
    const letter = letterInput.value.toUpperCase();
    letterInput.value = "";

    if (!letter.match(/[A-ZÑ]/) || letter.length === 0) {
        messageEl.textContent = "Por favor ingresa una letra válida.";
        return;
    }

    if (chosenWord.includes(letter)) {
        chosenWord.split("").forEach((char, i) => {
            if (char === letter) {
                displayWord[i] = letter;
            }
        });
        messageEl.textContent = `¡Bien! La letra "${letter}" está en la palabra.`;
    } else {
        attempts--;
        messageEl.textContent = `La letra "${letter}" no está.`;
    }

    updateDisplay();
    attemptsLeft.textContent = `Intentos restantes: ${attempts}`;

    if (!displayWord.includes("_")) {
        messageEl.textContent = "🎉 ¡Ganaste!";
        disableGame();
    } else if (attempts <= 0) {
        messageEl.textContent = `💀 Perdiste. La palabra era "${chosenWord}".`;
        disableGame();
    }
});

resetBtn.addEventListener("click", startGame);

function disableGame() {
    guessBtn.disabled = true;
    letterInput.disabled = true;
}

function enableGame() {
    guessBtn.disabled = false;
    letterInput.disabled = false;
}

// Iniciar al cargar
startGame();
enableGame();
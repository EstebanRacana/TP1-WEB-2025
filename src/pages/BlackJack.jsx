import React, { useState, useEffect } from 'react';
import '../styles/BlackJack.css';

const SUITS = ["♠", "♥", "♦", "♣"];
const RANKS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

const createDeck = () => {
  const deck = [];
  for (const s of SUITS) RANKS.forEach(r => deck.push({ suit: s, rank: r }));
  return shuffle(deck);
};

const shuffle = (deck) => {
  const arr = [...deck];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const cardValue = (card) => {
  if (card.rank === 'A') return 11;
  if (["J", "Q", "K"].includes(card.rank)) return 10;
  return parseInt(card.rank);
};

const handValue = (hand) => {
  let total = 0;
  let aces = 0;
  hand.forEach(c => {
    if (c.rank === 'A') aces++;
    total += cardValue(c);
  });
  while (total > 21 && aces > 0) {
    total -= 10;
    aces--;
  }
  return total;
};

const BlackJack = () => {
  const [deck, setDeck] = useState(createDeck());
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [message, setMessage] = useState('Presiona Empezar juego');
  const [gameOn, setGameOn] = useState(false);
  const [chips, setChips] = useState(500);
  const [bet, setBet] = useState(50);
  const [animating, setAnimating] = useState(false);

  const [revealDealer, setRevealDealer] = useState(false);

  useEffect(() => {
    if (deck.length < 10) setDeck(createDeck());
  }, [deck]);

  const drawCard = () => {
    const card = deck[0];
    setDeck(prev => prev.slice(1));
    return card;
  };

  const animateDeal = async () => {
    setAnimating(true);
    await new Promise(res => setTimeout(res, 300));
    setAnimating(false);
  };

  const startGame = async () => {
    if (bet > chips) {
      setMessage('No tienes suficientes fichas.');
      return;
    }

    setGameOn(true);
    setRevealDealer(false);
    setMessage('Repartiendo...');
    setChips(prev => prev - bet);

    const p1 = drawCard(); await animateDeal();
    const d1 = drawCard(); await animateDeal();
    const p2 = drawCard(); await animateDeal();
    const d2 = drawCard(); await animateDeal();

    setPlayerHand([p1, p2]);
    setDealerHand([d1, d2]);

    setMessage('Tu turno. ¿Pedir carta o plantarte?');
  };

  const hit = async () => {
    if (!gameOn || animating) return;

    const card = drawCard();
    await animateDeal();

    const newHand = [...playerHand, card];
    setPlayerHand(newHand);

    if (handValue(newHand) > 21) {
      setMessage('Te pasaste. Perdiste.');
      setGameOn(false);
      setRevealDealer(true);
    }
  };

  const stand = async () => {
    if (!gameOn || animating) return;

    setMessage('Turno del crupier...');
    setRevealDealer(true);

    let dHand = [...dealerHand];

    while (handValue(dHand) < 17) {
      dHand.push(drawCard());
      await animateDeal();
    }

    setDealerHand(dHand);

    const p = handValue(playerHand);
    const d = handValue(dHand);

    if (d > 21 || p > d) {
      setMessage('¡Ganaste!');
      setChips(prev => prev + bet * 2);
    } else if (p === d) {
      setMessage('Empate. Recuperas tu apuesta.');
      setChips(prev => prev + bet);
    } else {
      setMessage('Perdiste.');
    }

    setGameOn(false);
  };

  return (
    <div className="blackjack-container fade-in">

      <h1>Blackjack</h1>

      <div className="chips-info">Fichas: {chips}</div>

      <div className="bet-input">
        <label>Apuesta:&nbsp;</label>
        <input
          type="number"
          min="10"
          max={chips}
          value={bet}
          onChange={(e) => setBet(parseInt(e.target.value))}
        />
      </div>

      <button id="jugar" onClick={startGame} disabled={gameOn}>Empezar juego</button>

      {gameOn && (
        <div className="controls">
          <button onClick={hit}>Pedir carta</button>
          <button onClick={stand}>Plantarse</button>
        </div>
      )}

      <p className="mensaje slide-in">{message}</p>

      <div className="mesa">

        {/* JUGADOR */}
        <div className="jugador">
          <h3>Jugador ({handValue(playerHand)})</h3>
          <div className="cartas">
            {playerHand.map((c, i) => (
              <div
                key={i}
                className="carta deal-animation"
                style={{ animationDelay: `${i * 0.25}s` }}
              >
                {c.rank}{c.suit}
              </div>
            ))}
          </div>
        </div>

        {/* CRUPIER */}
        <div className="crupier">
          <h3>Crupier ({revealDealer ? handValue(dealerHand) : "?"})</h3>

          <div className="cartas">
            {dealerHand.map((c, i) => (
              <div
                key={i}
                className={
                  "carta-wrapper " +
                  (i === 1 && !revealDealer ? "hidden-card" : "") +
                  (i === 1 && revealDealer ? " flip-card" : "")
                }
                style={{ animationDelay: `${i * 0.25}s` }}
              >
                <div className="carta carta-front">
                  {c.rank}{c.suit}
                </div>

                <div className="carta carta-back pattern-back"></div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default BlackJack;

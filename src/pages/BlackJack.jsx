import React, { useState, useEffect } from 'react';

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

const Card = ({ card, hidden, index }) => {
  const isRed = card.suit === "♥" || card.suit === "♦";
  
  return (
    <div 
      className={`card-container ${hidden ? 'card-hidden' : ''}`}
      style={{ 
        animationDelay: `${index * 0.15}s`,
        zIndex: index
      }}
    >
      <div className="card">
        {!hidden ? (
          <div className={`card-face ${isRed ? 'red' : 'black'}`}>
            <div className="card-corner top-left">
              <div className="rank">{card.rank}</div>
              <div className="suit">{card.suit}</div>
            </div>
            <div className="card-center">
              <div className="suit-large">{card.suit}</div>
            </div>
            <div className="card-corner bottom-right">
              <div className="rank">{card.rank}</div>
              <div className="suit">{card.suit}</div>
            </div>
          </div>
        ) : (
          <div className="card-back">
            <div className="card-pattern"></div>
          </div>
        )}
      </div>
    </div>
  );
};

const ChipStack = ({ amount, color, onClick }) => (
  <div 
    className={`chip ${color}`}
    onClick={onClick}
  >
    <div className="chip-inner">
      <div className="chip-amount">${amount}</div>
    </div>
  </div>
);

const BlackJack = () => {
  const [deck, setDeck] = useState(createDeck());
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [message, setMessage] = useState('Selecciona tu apuesta y presiona JUGAR');
  const [gameOn, setGameOn] = useState(false);
  const [chips, setChips] = useState(1000);
  const [bet, setBet] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [revealDealer, setRevealDealer] = useState(false);

  const chipValues = [10, 25, 50, 100];

  useEffect(() => {
    if (deck.length < 15) setDeck(createDeck());
  }, [deck]);

  const drawCard = () => {
    const card = deck[0];
    setDeck(prev => prev.slice(1));
    return card;
  };

  const animateDeal = async () => {
    setAnimating(true);
    await new Promise(res => setTimeout(res, 400));
    setAnimating(false);
  };

  const startGame = async () => {
    if (bet === 0) {
      setMessage('❌ Selecciona una apuesta primero');
      return;
    }
    if (bet > chips) {
      setMessage('❌ No tienes suficientes fichas');
      return;
    }

    setGameOn(true);
    setRevealDealer(false);
    setMessage('🎲 Repartiendo cartas...');
    setChips(prev => prev - bet);

    await new Promise(res => setTimeout(res, 300));

    const p1 = drawCard();
    setPlayerHand([p1]);
    await animateDeal();

    const d1 = drawCard();
    setDealerHand([d1]);
    await animateDeal();

    const p2 = drawCard();
    setPlayerHand([p1, p2]);
    await animateDeal();

    const d2 = drawCard();
    setDealerHand([d1, d2]);
    await animateDeal();

    const playerVal = handValue([p1, p2]);

    if (playerVal === 21) {
      setRevealDealer(true);
      setMessage('🎉 ¡BLACKJACK! Ganaste 2.5x');
      setChips(prev => prev + bet * 2.5);
      setGameOn(false);
    } else {
      setMessage('🎯 Tu turno - ¿Pedir carta o Plantarse?');
    }
  };

  const hit = async () => {
    if (!gameOn || animating) return;

    const card = drawCard();
    const newHand = [...playerHand, card];
    setPlayerHand(newHand);
    await animateDeal();

    const total = handValue(newHand);
    
    if (total > 21) {
      setMessage('💥 Te pasaste! Perdiste');
      setGameOn(false);
      setRevealDealer(true);
    } else if (total === 21) {
      setMessage('🎯 21! Turno del crupier...');
      stand();
    }
  };

  const stand = async () => {
    if (!gameOn || animating) return;

    setMessage('🎰 Turno del crupier...');
    setRevealDealer(true);
    setGameOn(false);

    await new Promise(res => setTimeout(res, 800));

    let dHand = [...dealerHand];

    while (handValue(dHand) < 17) {
      const card = drawCard();
      dHand = [...dHand, card];
      setDealerHand(dHand);
      await animateDeal();
      await new Promise(res => setTimeout(res, 600));
    }

    const p = handValue(playerHand);
    const d = handValue(dHand);

    await new Promise(res => setTimeout(res, 500));

    if (d > 21) {
      setMessage('🎉 El crupier se pasó! ¡Ganaste!');
      setChips(prev => prev + bet * 2);
    } else if (p > d) {
      setMessage('🏆 ¡Ganaste!');
      setChips(prev => prev + bet * 2);
    } else if (p === d) {
      setMessage('🤝 Empate - Recuperas tu apuesta');
      setChips(prev => prev + bet);
    } else {
      setMessage('😔 Perdiste');
    }
  };

  const addToBet = (amount) => {
    if (!gameOn && chips >= amount) {
      setBet(prev => Math.min(prev + amount, chips));
    }
  };

  const clearBet = () => {
    if (!gameOn) setBet(0);
  };

  const resetGame = () => {
    setPlayerHand([]);
    setDealerHand([]);
    setBet(0);
    setGameOn(false);
    setRevealDealer(false);
    setMessage('Selecciona tu apuesta y presiona JUGAR');
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;600;700&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .blackjack-game {
          min-height: 100vh;
          background: linear-gradient(135deg, #065f46 0%, #047857 50%, #065f46 100%);
          background-attachment: fixed;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .game-container {
          width: 100%;
          max-width: 1200px;
        }

        .header {
          text-align: center;
          margin-bottom: 30px;
        }

        .title {
          font-size: 4rem;
          font-weight: 700;
          color: #fbbf24;
          margin-bottom: 10px;
          font-family: 'Playfair Display', serif;
          text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.8);
          letter-spacing: 2px;
        }

        .chips-display {
          font-size: 1.8rem;
          font-weight: 700;
          color: white;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
        }

        .table-felt {
          background: 
            radial-gradient(ellipse at center, rgba(16, 185, 129, 0.1) 0%, transparent 70%),
            linear-gradient(135deg, #065f46 0%, #047857 50%, #065f46 100%);
          border-radius: 200px;
          padding: 40px;
          margin-bottom: 30px;
          box-shadow: 
            inset 0 4px 20px rgba(0, 0, 0, 0.4),
            0 10px 40px rgba(0, 0, 0, 0.5);
          position: relative;
          border: 8px solid #064e3b;
        }

        .table-felt::before {
          content: '';
          position: absolute;
          inset: 20px;
          border: 3px solid rgba(251, 191, 36, 0.3);
          border-radius: 180px;
          pointer-events: none;
        }

        .dealer-section,
        .player-section {
          margin-bottom: 40px;
        }

        .player-section {
          margin-bottom: 0;
        }

        .player-info {
          text-align: center;
          margin-bottom: 20px;
        }

        .player-section .player-info {
          margin-top: 20px;
          margin-bottom: 0;
        }

        .player-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: #fbbf24;
          margin-bottom: 10px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
        }

        .hand-value {
          font-size: 2.5rem;
          font-weight: 700;
          color: white;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
        }

        .cards-container {
          display: flex;
          justify-content: center;
          gap: 15px;
          flex-wrap: wrap;
        }

        .message-section {
          text-align: center;
          margin: 40px 0;
          padding: 0 20px;
        }

        .message-box {
          display: inline-block;
          background: rgba(17, 24, 39, 0.9);
          padding: 20px 40px;
          border-radius: 20px;
          border: 2px solid #fbbf24;
          animation: messageSlide 0.5s ease;
        }

        @keyframes messageSlide {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .message-text {
          font-size: 1.3rem;
          font-weight: 700;
          color: white;
          margin: 0;
        }

        .card-container {
          perspective: 1000px;
          animation: dealCard 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          opacity: 0;
        }

        @keyframes dealCard {
          0% {
            transform: translateY(-300px) translateX(-200px) rotate(-45deg) scale(0.5);
            opacity: 0;
          }
          60% {
            opacity: 1;
          }
          100% {
            transform: translateY(0) translateX(0) rotate(0deg) scale(1);
            opacity: 1;
          }
        }

        .card {
          width: 110px;
          height: 154px;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.3s ease;
          cursor: pointer;
        }

        .card:hover {
          transform: translateY(-10px) scale(1.05);
        }

        .card-hidden .card {
          animation: flipCard 0.6s ease forwards;
          animation-delay: 0.5s;
        }

        @keyframes flipCard {
          0% {
            transform: rotateY(0deg);
          }
          100% {
            transform: rotateY(180deg);
          }
        }

        .card-face,
        .card-back {
          width: 100%;
          height: 100%;
          position: absolute;
          backface-visibility: hidden;
          border-radius: 12px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .card-face {
          background: white;
          border: 3px solid #333;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 10px;
        }

        .card-back {
          background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
          transform: rotateY(180deg);
          border: 3px solid #1e40af;
          overflow: hidden;
        }

        .card-pattern {
          width: 100%;
          height: 100%;
          background-image: 
            repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255, 255, 255, 0.1) 10px, rgba(255, 255, 255, 0.1) 20px),
            repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(255, 255, 255, 0.1) 10px, rgba(255, 255, 255, 0.1) 20px);
          position: relative;
        }

        .card-pattern::before {
          content: '♠ ♥ ♦ ♣';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 24px;
          color: rgba(255, 255, 255, 0.3);
          font-weight: bold;
          letter-spacing: 8px;
        }

        .card-corner {
          display: flex;
          flex-direction: column;
          align-items: center;
          line-height: 1;
        }

        .bottom-right {
          transform: rotate(180deg);
        }

        .rank {
          font-size: 24px;
          font-weight: 900;
          font-family: 'Playfair Display', serif;
        }

        .suit {
          font-size: 20px;
          margin-top: 2px;
        }

        .card-center {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .suit-large {
          font-size: 56px;
          opacity: 0.15;
        }

        .red {
          color: #dc2626;
        }

        .black {
          color: #1f2937;
        }

        .chip {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          position: relative;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          border: 4px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.3);
        }

        .chip:hover {
          transform: translateY(-8px) scale(1.1);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.5);
        }

        .chip:active {
          transform: translateY(-4px) scale(1.05);
          animation: chipPulse 0.4s ease;
        }

        @keyframes chipPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
        }

        .chip.red {
          background: radial-gradient(circle at 30% 30%, #ef4444, #dc2626, #991b1b);
        }

        .chip.blue {
          background: radial-gradient(circle at 30% 30%, #3b82f6, #2563eb, #1e40af);
        }

        .chip.green {
          background: radial-gradient(circle at 30% 30%, #10b981, #059669, #047857);
        }

        .chip.purple {
          background: radial-gradient(circle at 30% 30%, #a855f7, #9333ea, #7e22ce);
        }

        .chip-inner {
          position: absolute;
          inset: 12px;
          border-radius: 50%;
          border: 3px dashed rgba(255, 255, 255, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chip-amount {
          color: white;
          font-weight: 900;
          font-size: 16px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
          font-family: 'Inter', sans-serif;
        }

        .controls-panel {
          background: rgba(17, 24, 39, 0.9);
          border-radius: 30px;
          padding: 30px;
          border: 2px solid #374151;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        }

        .betting-section {
          margin-bottom: 30px;
        }

        .bet-display {
          text-align: center;
          margin-bottom: 20px;
        }

        .bet-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: #fbbf24;
          margin: 0;
        }

        .chips-row {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }

        .bet-buttons {
          display: flex;
          justify-content: center;
          gap: 15px;
        }

        .game-buttons {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .btn {
          padding: 14px 32px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 16px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-family: 'Inter', sans-serif;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .btn:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
        }

        .btn:active:not(:disabled) {
          transform: translateY(-1px);
        }

        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-primary {
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
          color: #78350f;
        }

        .btn-secondary {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
        }

        .btn-danger {
          background: linear-gradient(135deg, #ef4444, #dc2626);
          color: white;
        }

        .glow {
          animation: glow 2s ease-in-out infinite;
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(251, 191, 36, 0.5), 0 4px 12px rgba(0, 0, 0, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(251, 191, 36, 0.8), 0 4px 12px rgba(0, 0, 0, 0.3);
          }
        }

        @media (max-width: 768px) {
          .title {
            font-size: 2.5rem;
          }

          .chips-display {
            font-size: 1.3rem;
          }

          .table-felt {
            padding: 25px;
            border-radius: 100px;
          }

          .card {
            width: 80px;
            height: 112px;
          }

          .rank {
            font-size: 20px;
          }

          .suit {
            font-size: 16px;
          }

          .suit-large {
            font-size: 40px;
          }

          .chip {
            width: 60px;
            height: 60px;
          }

          .chip-amount {
            font-size: 14px;
          }

          .message-text {
            font-size: 1.1rem;
          }

          .btn {
            padding: 12px 24px;
            font-size: 14px;
          }
        }

        @media (max-width: 480px) {
          .title {
            font-size: 2rem;
          }

          .card {
            width: 65px;
            height: 91px;
          }

          .cards-container {
            gap: 8px;
          }

          .chip {
            width: 55px;
            height: 55px;
          }

          .chips-row {
            gap: 12px;
          }
        }
      `}</style>

      <div className="blackjack-game">
        <div className="game-container">
          {/* Header */}
          <div className="header">
            <h1 className="title">♠ BLACKJACK ♥</h1>
            <div className="chips-display">💰 Fichas: ${chips}</div>
          </div>

          {/* Mesa de juego */}
          <div className="table-felt">
            {/* Crupier */}
            <div className="dealer-section">
              <div className="player-info">
                <h2 className="player-title">CRUPIER</h2>
                <div className="hand-value">
                  {revealDealer ? handValue(dealerHand) : '?'}
                </div>
              </div>
              <div className="cards-container">
                {dealerHand.map((card, i) => (
                  <Card 
                    key={i} 
                    card={card} 
                    hidden={i === 1 && !revealDealer}
                    index={i}
                  />
                ))}
              </div>
            </div>

            {/* Mensaje */}
            <div className="message-section">
              <div className="message-box">
                <p className="message-text">{message}</p>
              </div>
            </div>

            {/* Jugador */}
            <div className="player-section">
              <div className="cards-container">
                {playerHand.map((card, i) => (
                  <Card 
                    key={i} 
                    card={card} 
                    hidden={false}
                    index={i}
                  />
                ))}
              </div>
              <div className="player-info">
                <div className="hand-value">
                  {playerHand.length > 0 ? handValue(playerHand) : '0'}
                </div>
                <h2 className="player-title">JUGADOR</h2>
              </div>
            </div>
          </div>

          {/* Controles */}
          <div className="controls-panel">
            {/* Apuesta */}
            <div className="betting-section">
              <div className="bet-display">
                <h3 className="bet-title">Apuesta Actual: ${bet}</h3>
              </div>
              <div className="chips-row">
                {chipValues.map((value, i) => (
                  <ChipStack
                    key={value}
                    amount={value}
                    color={['red', 'blue', 'green', 'purple'][i]}
                    onClick={() => addToBet(value)}
                  />
                ))}
              </div>
              <div className="bet-buttons">
                <button 
                  className="btn btn-danger"
                  onClick={clearBet}
                  disabled={gameOn}
                >
                  Limpiar
                </button>
              </div>
            </div>

            {/* Botones de juego */}
            <div className="game-buttons">
              {!gameOn ? (
                <>
                  <button 
                    className="btn btn-primary glow"
                    onClick={startGame}
                    disabled={bet === 0}
                  >
                    🎲 JUGAR
                  </button>
                  {(playerHand.length > 0 || dealerHand.length > 0) && (
                    <button 
                      className="btn btn-secondary"
                      onClick={resetGame}
                    >
                      🔄 Nueva Ronda
                    </button>
                  )}
                </>
              ) : (
                <>
                  <button 
                    className="btn btn-secondary"
                    onClick={hit}
                    disabled={animating}
                  >
                    👆 PEDIR CARTA
                  </button>
                  <button 
                    className="btn btn-danger"
                    onClick={stand}
                    disabled={animating}
                  >
                    ✋ PLANTARSE
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlackJack;
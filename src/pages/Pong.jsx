import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Pong() {
  const canvasRef = useRef(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState('');

  const CANVAS_WIDTH = 600;
  const CANVAS_HEIGHT = 400;
  const PADDLE_WIDTH = 10;
  const PADDLE_HEIGHT = 80;
  const BALL_SIZE = 10;
  const WINNING_SCORE = 5;

  const gameStateRef = useRef({
    player: { x: 10, y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2, dy: 0 },
    computer: { x: CANVAS_WIDTH - 20, y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2 },
    ball: { 
      x: CANVAS_WIDTH / 2, 
      y: CANVAS_HEIGHT / 2, 
      dx: 4, 
      dy: 4 
    },
    gameLoop: null,
    keys: {}
  });

  const drawGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const { player, computer, ball } = gameStateRef.current;

    // Background
    ctx.fillStyle = '#1a1b26';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Center line
    ctx.strokeStyle = '#50B6D1';
    ctx.lineWidth = 2;
    ctx.setLineDash([10, 10]);
    ctx.beginPath();
    ctx.moveTo(CANVAS_WIDTH / 2, 0);
    ctx.lineTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT);
    ctx.stroke();
    ctx.setLineDash([]);

    // Player paddle
    ctx.fillStyle = '#50B6D1';
    ctx.fillRect(player.x, player.y, PADDLE_WIDTH, PADDLE_HEIGHT);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.strokeRect(player.x, player.y, PADDLE_WIDTH, PADDLE_HEIGHT);

    // Computer paddle
    ctx.fillStyle = '#FFA0A0';
    ctx.fillRect(computer.x, computer.y, PADDLE_WIDTH, PADDLE_HEIGHT);
    ctx.strokeRect(computer.x, computer.y, PADDLE_WIDTH, PADDLE_HEIGHT);

    // Ball
    ctx.fillStyle = '#fff';
    ctx.fillRect(ball.x - BALL_SIZE / 2, ball.y - BALL_SIZE / 2, BALL_SIZE, BALL_SIZE);
    ctx.strokeRect(ball.x - BALL_SIZE / 2, ball.y - BALL_SIZE / 2, BALL_SIZE, BALL_SIZE);
  };

  const updateGame = () => {
    const state = gameStateRef.current;
    
    // Move player paddle
    if (state.keys['ArrowUp'] && state.player.y > 0) {
      state.player.y -= 6;
    }
    if (state.keys['ArrowDown'] && state.player.y < CANVAS_HEIGHT - PADDLE_HEIGHT) {
      state.player.y += 6;
    }

    // Move ball
    state.ball.x += state.ball.dx;
    state.ball.y += state.ball.dy;

    // Ball collision with top/bottom
    if (state.ball.y <= 0 || state.ball.y >= CANVAS_HEIGHT) {
      state.ball.dy *= -1;
    }

    // Ball collision with player paddle
    if (
      state.ball.x - BALL_SIZE / 2 <= state.player.x + PADDLE_WIDTH &&
      state.ball.x >= state.player.x &&
      state.ball.y >= state.player.y &&
      state.ball.y <= state.player.y + PADDLE_HEIGHT
    ) {
      state.ball.dx = Math.abs(state.ball.dx);
      // Add some spin based on where it hits the paddle
      const hitPos = (state.ball.y - state.player.y) / PADDLE_HEIGHT - 0.5;
      state.ball.dy = hitPos * 8;
    }

    // Ball collision with computer paddle
    if (
      state.ball.x + BALL_SIZE / 2 >= state.computer.x &&
      state.ball.x <= state.computer.x + PADDLE_WIDTH &&
      state.ball.y >= state.computer.y &&
      state.ball.y <= state.computer.y + PADDLE_HEIGHT
    ) {
      state.ball.dx = -Math.abs(state.ball.dx);
      const hitPos = (state.ball.y - state.computer.y) / PADDLE_HEIGHT - 0.5;
      state.ball.dy = hitPos * 8;
    }

    // AI for computer paddle
    const computerCenter = state.computer.y + PADDLE_HEIGHT / 2;
    if (state.ball.x > CANVAS_WIDTH / 2) { // Only move when ball is on computer's side
      if (computerCenter < state.ball.y - 10) {
        state.computer.y += 4;
      } else if (computerCenter > state.ball.y + 10) {
        state.computer.y -= 4;
      }
    }

    // Keep computer paddle in bounds
    if (state.computer.y < 0) state.computer.y = 0;
    if (state.computer.y > CANVAS_HEIGHT - PADDLE_HEIGHT) {
      state.computer.y = CANVAS_HEIGHT - PADDLE_HEIGHT;
    }

    // Score
    if (state.ball.x < 0) {
      const newScore = computerScore + 1;
      setComputerScore(newScore);
      if (newScore >= WINNING_SCORE) {
        endGame('Computer');
      } else {
        resetBall();
      }
    }
    if (state.ball.x > CANVAS_WIDTH) {
      const newScore = playerScore + 1;
      setPlayerScore(newScore);
      if (newScore >= WINNING_SCORE) {
        endGame('Player');
      } else {
        resetBall();
      }
    }

    drawGame();
  };

  const resetBall = () => {
    const state = gameStateRef.current;
    state.ball.x = CANVAS_WIDTH / 2;
    state.ball.y = CANVAS_HEIGHT / 2;
    state.ball.dx = (Math.random() > 0.5 ? 1 : -1) * 4;
    state.ball.dy = (Math.random() - 0.5) * 6;
  };

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setPlayerScore(0);
    setComputerScore(0);
    setWinner('');
    
    gameStateRef.current = {
      player: { x: 10, y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2 },
      computer: { x: CANVAS_WIDTH - 20, y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2 },
      ball: { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2, dx: 4, dy: 4 },
      gameLoop: null,
      keys: {}
    };

    drawGame();

    gameStateRef.current.gameLoop = setInterval(() => {
      updateGame();
    }, 1000 / 60); // 60 FPS
  };

  const endGame = (winnerName) => {
    if (gameStateRef.current.gameLoop) {
      clearInterval(gameStateRef.current.gameLoop);
    }
    setWinner(winnerName);
    setGameOver(true);
    setGameStarted(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
        e.preventDefault();
      }
      gameStateRef.current.keys[e.key] = true;
    };

    const handleKeyUp = (e) => {
      gameStateRef.current.keys[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (gameStateRef.current.gameLoop) {
        clearInterval(gameStateRef.current.gameLoop);
      }
    };
  }, []);

  const movePaddle = (direction) => {
    if (!gameStarted || gameOver) return;
    const state = gameStateRef.current;
    
    if (direction === 'up' && state.player.y > 0) {
      state.player.y -= 30;
    } else if (direction === 'down' && state.player.y < CANVAS_HEIGHT - PADDLE_HEIGHT) {
      state.player.y += 30;
    }
  };

  return (
    <div className="portfolio-wrapper">
      <header>
        <div className="windowTop">
          <p>
            <img src="/image/Map_Pin_Grub.png" style={{ width: '18px', verticalAlign: 'middle', marginRight: '5px' }} alt="" />
            Retro_Games.exe
          </p>
          <div className="windowCircle">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
        </div>
        <div className="windowContent header-main">
          <nav>
            <Link to="/"><img src="/image/home.png" className="nav-icon" alt="" /> <span>Home</span></Link>
            <Link to="/blog"><img src="/image/life.png" className="nav-icon" alt="" /> <span>Life Blog</span></Link>
            <Link to="/projects"><img src="/image/made.png" className="nav-icon" alt="" /> <span>Stuff I Made</span></Link>
            <Link to="/portfolio"><img src="/image/me.png" className="nav-icon" alt="" /> <span>Who Am I</span></Link>
            <Link to="/view-gallery"><img src="/image/frame.png" className="nav-icon" alt="" /> <span>Gallery</span></Link>
            <Link to="/games"><img src="/image/joystick.png" className="nav-icon" alt="" /> <span>Games</span></Link>
            <Link to="/chat"><img src="/image/babble.png" className="nav-icon" alt="" /> <span>Chat</span></Link>
          </nav>
        </div>
      </header>

      <main>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          padding: '40px 20px',
          width: '100%'
        }}>
          <section style={{ width: '100%', maxWidth: '800px' }}>
            <div className="windowTop" style={{ background: '#03274B' }}>
              <p style={{ color: '#fff' }}>PONG_GAME.bin</p>
              <div className="windowCircle">
                <div className="circle" style={{ background: '#fff' }}></div>
                <div className="circle" style={{ background: '#fff' }}></div>
                <div className="circle" style={{ background: '#fff' }}></div>
              </div>
            </div>
            <div className="windowContent" style={{ textAlign: 'center' }}>
              <h1 style={{ marginBottom: '20px', fontSize: '2rem' }}>🏓 RETRO PONG</h1>

              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: '40px',
                marginBottom: '20px',
                fontSize: '1.2rem',
                flexWrap: 'wrap'
              }}>
                <div style={{ 
                  padding: '10px 20px', 
                  background: '#50B6D1', 
                  border: '2px solid #000',
                  boxShadow: '4px 4px 0px #000'
                }}>
                  <b>You:</b> {playerScore}
                </div>
                <div style={{ 
                  padding: '10px 20px', 
                  background: '#FFA0A0', 
                  border: '2px solid #000',
                  boxShadow: '4px 4px 0px #000'
                }}>
                  <b>Computer:</b> {computerScore}
                </div>
              </div>

              <div style={{ 
                display: 'inline-block', 
                border: '4px solid #000',
                boxShadow: '8px 8px 0px #000',
                marginBottom: '20px',
                touchAction: 'none',
                userSelect: 'none'
              }}>
                <canvas
                  ref={canvasRef}
                  width={CANVAS_WIDTH}
                  height={CANVAS_HEIGHT}
                  style={{ 
                    display: 'block',
                    background: '#1a1b26',
                    maxWidth: '100%',
                    height: 'auto'
                  }}
                />
              </div>

              {/* Mobile Controls */}
              <div style={{
                display: 'flex',
                gap: '10px',
                justifyContent: 'center',
                marginBottom: '20px'
              }} className="mobile-controls">
                <button 
                  onClick={() => movePaddle('up')}
                  disabled={!gameStarted || gameOver}
                  className="loginBtn"
                  style={{
                    fontSize: '1.5rem',
                    padding: '20px 40px'
                  }}
                >
                  ▲ UP
                </button>
                <button 
                  onClick={() => movePaddle('down')}
                  disabled={!gameStarted || gameOver}
                  className="loginBtn"
                  style={{
                    fontSize: '1.5rem',
                    padding: '20px 40px'
                  }}
                >
                  ▼ DOWN
                </button>
              </div>

              {!gameStarted && !gameOver && (
                <div>
                  <button 
                    onClick={startGame}
                    className="loginBtn"
                    style={{
                      fontSize: '1.2rem',
                      padding: '15px 40px',
                      background: '#50B6D1',
                      color: '#000',
                      marginBottom: '20px'
                    }}
                  >
                    🎮 START GAME
                  </button>
                </div>
              )}

              {gameOver && (
                <div>
                  <div style={{
                    padding: '20px',
                    background: winner === 'Player' ? '#50B6D1' : '#FFA0A0',
                    border: '2px solid #000',
                    marginBottom: '20px',
                    display: 'inline-block',
                    boxShadow: '6px 6px 0px #000'
                  }}>
                    <h2 style={{ margin: '0 0 10px 0' }}>
                      {winner === 'Player' ? '🎉 YOU WIN!' : '💀 COMPUTER WINS!'}
                    </h2>
                    <p style={{ fontSize: '1.2rem', margin: 0 }}>
                      Final Score: {playerScore} - {computerScore}
                    </p>
                  </div>
                  <br />
                  <button 
                    onClick={startGame}
                    className="loginBtn"
                    style={{
                      fontSize: '1.2rem',
                      padding: '15px 40px',
                      background: '#50B6D1',
                      color: '#000'
                    }}
                  >
                    🔄 PLAY AGAIN
                  </button>
                </div>
              )}

              <div className="separate" style={{ marginTop: '30px', textAlign: 'left' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>📋 HOW TO PLAY</h2>
                <div className="post" style={{ maxHeight: 'none' }}>
                  <p style={{ fontSize: '1.1rem', marginBottom: '10px' }}>
                    <b>🎯 Goal:</b> First to {WINNING_SCORE} points wins!
                  </p>
                  <p style={{ fontSize: '1.1rem', marginBottom: '10px' }}>
                    <b>⌨️ Desktop Controls:</b>
                  </p>
                  <ul style={{ listStylePosition: 'inside', fontSize: '1rem' }}>
                    <li>⬆️ Up Arrow - Move Paddle Up</li>
                    <li>⬇️ Down Arrow - Move Paddle Down</li>
                  </ul>
                  <p style={{ fontSize: '1.1rem', marginTop: '15px' }}>
                    <b>📱 Mobile:</b> Use the UP/DOWN buttons
                  </p>
                  <p style={{ fontSize: '1.1rem', marginTop: '15px', color: '#50B6D1' }}>
                    <b>💡 Tip:</b> Hit the ball with different parts of your paddle to change its angle!
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer style={{ textAlign: 'center', padding: '20px', marginTop: '40px' }}>
        <p style={{ color: '#565f89', fontSize: '0.9rem' }}>
          🕹️ Classic Pong Game - Made with React
        </p>
      </footer>

      <style>{`
        @media (min-width: 768px) {
          .mobile-controls {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Pong;
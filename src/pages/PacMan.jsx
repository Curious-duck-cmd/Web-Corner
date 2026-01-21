import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const CELL_SIZE = 20;
const GRID_WIDTH = 19;
const GRID_HEIGHT = 21;
const CANVAS_WIDTH = GRID_WIDTH * CELL_SIZE;
const CANVAS_HEIGHT = GRID_HEIGHT * CELL_SIZE;

function PacMan() {
  const canvasRef = useRef(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [lives, setLives] = useState(3);

  const gameStateRef = useRef({
    pacman: { x: 9, y: 15, direction: { x: 0, y: 0 }, nextDirection: { x: 0, y: 0 }, mouthOpen: true },
    ghosts: [],
    pellets: [],
    powerPellets: [],
    gameLoop: null,
    keys: {},
    frameCount: 0
  });

  // Maze layout (1 = wall, 0 = path, 2 = pellet, 3 = power pellet)
  const maze = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1],
    [1,2,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,2,1],
    [1,3,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,3,1],
    [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
    [1,2,1,1,2,1,2,1,1,1,1,1,2,1,2,1,1,2,1],
    [1,2,2,2,2,1,2,2,2,1,2,2,2,1,2,2,2,2,1],
    [1,1,1,1,2,1,1,1,0,1,0,1,1,1,2,1,1,1,1],
    [0,0,0,1,2,1,0,0,0,0,0,0,0,1,2,1,0,0,0],
    [1,1,1,1,2,1,0,1,1,0,1,1,0,1,2,1,1,1,1],
    [0,0,0,0,2,0,0,1,0,0,0,1,0,0,2,0,0,0,0],
    [1,1,1,1,2,1,0,1,1,1,1,1,0,1,2,1,1,1,1],
    [0,0,0,1,2,1,0,0,0,0,0,0,0,1,2,1,0,0,0],
    [1,1,1,1,2,1,0,1,1,1,1,1,0,1,2,1,1,1,1],
    [1,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1],
    [1,2,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,2,1],
    [1,3,2,1,2,2,2,2,2,2,2,2,2,2,2,1,2,3,1],
    [1,1,2,1,2,1,2,1,1,1,1,1,2,1,2,1,2,1,1],
    [1,2,2,2,2,1,2,2,2,1,2,2,2,1,2,2,2,2,1],
    [1,2,1,1,1,1,1,1,2,1,2,1,1,1,1,1,1,2,1],
    [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  ];

  useEffect(() => {
    const savedHighScore = localStorage.getItem('pacmanHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }

    return () => {
      if (gameStateRef.current.gameLoop) {
        cancelAnimationFrame(gameStateRef.current.gameLoop);
      }
    };
  }, []);

  const initializeGame = () => {
    const pellets = [];
    const powerPellets = [];

    maze.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === 2) pellets.push({ x, y });
        if (cell === 3) powerPellets.push({ x, y });
      });
    });

    gameStateRef.current.pellets = pellets;
    gameStateRef.current.powerPellets = powerPellets;
    gameStateRef.current.ghosts = [
      { x: 9, y: 9, color: '#FF0000', direction: { x: 1, y: 0 } },
      { x: 8, y: 9, color: '#FFB8FF', direction: { x: -1, y: 0 } },
      { x: 10, y: 9, color: '#00FFFF', direction: { x: 1, y: 0 } },
      { x: 9, y: 10, color: '#FFB852', direction: { x: 0, y: 1 } }
    ];
  };

  const drawMaze = (ctx) => {
    maze.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === 1) {
          ctx.fillStyle = '#0000AA';
          ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
          ctx.strokeStyle = '#4040FF';
          ctx.strokeRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
      });
    });
  };

  const drawPellets = (ctx) => {
    const { pellets, powerPellets } = gameStateRef.current;

    // Regular pellets
    ctx.fillStyle = '#FFB8FF';
    pellets.forEach(pellet => {
      ctx.beginPath();
      ctx.arc(
        pellet.x * CELL_SIZE + CELL_SIZE / 2,
        pellet.y * CELL_SIZE + CELL_SIZE / 2,
        2,
        0,
        Math.PI * 2
      );
      ctx.fill();
    });

    // Power pellets
    ctx.fillStyle = '#FFB8FF';
    powerPellets.forEach(pellet => {
      ctx.beginPath();
      ctx.arc(
        pellet.x * CELL_SIZE + CELL_SIZE / 2,
        pellet.y * CELL_SIZE + CELL_SIZE / 2,
        5,
        0,
        Math.PI * 2
      );
      ctx.fill();
    });
  };

  const drawPacman = (ctx) => {
    const { pacman, frameCount } = gameStateRef.current;
    
    // Animate mouth
    const mouthAngle = (Math.sin(frameCount * 0.2) * 0.3) + 0.2;
    
    // Calculate rotation based on direction
    let rotation = 0;
    if (pacman.direction.x === 1) rotation = 0;
    else if (pacman.direction.x === -1) rotation = Math.PI;
    else if (pacman.direction.y === 1) rotation = Math.PI / 2;
    else if (pacman.direction.y === -1) rotation = -Math.PI / 2;

    ctx.save();
    ctx.translate(
      pacman.x * CELL_SIZE + CELL_SIZE / 2,
      pacman.y * CELL_SIZE + CELL_SIZE / 2
    );
    ctx.rotate(rotation);
    
    ctx.fillStyle = '#FFFF00';
    ctx.beginPath();
    ctx.arc(0, 0, CELL_SIZE / 2 - 2, mouthAngle, Math.PI * 2 - mouthAngle);
    ctx.lineTo(0, 0);
    ctx.fill();
    
    ctx.restore();
  };

  const drawGhosts = (ctx) => {
    const { ghosts } = gameStateRef.current;

    ghosts.forEach(ghost => {
      // Ghost body
      ctx.fillStyle = ghost.color;
      ctx.beginPath();
      ctx.arc(
        ghost.x * CELL_SIZE + CELL_SIZE / 2,
        ghost.y * CELL_SIZE + CELL_SIZE / 2 - 2,
        CELL_SIZE / 2 - 2,
        Math.PI,
        0
      );
      ctx.lineTo(ghost.x * CELL_SIZE + CELL_SIZE - 2, ghost.y * CELL_SIZE + CELL_SIZE - 2);
      
      // Ghost skirt
      for (let i = 0; i < 3; i++) {
        const x = ghost.x * CELL_SIZE + 2 + (i * (CELL_SIZE - 4) / 3);
        ctx.lineTo(x + (CELL_SIZE - 4) / 6, ghost.y * CELL_SIZE + CELL_SIZE - 6);
        ctx.lineTo(x + (CELL_SIZE - 4) / 3, ghost.y * CELL_SIZE + CELL_SIZE - 2);
      }
      ctx.lineTo(ghost.x * CELL_SIZE + 2, ghost.y * CELL_SIZE + CELL_SIZE - 2);
      ctx.fill();

      // Eyes
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(ghost.x * CELL_SIZE + 7, ghost.y * CELL_SIZE + 8, 3, 0, Math.PI * 2);
      ctx.arc(ghost.x * CELL_SIZE + 13, ghost.y * CELL_SIZE + 8, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#0000FF';
      ctx.beginPath();
      ctx.arc(ghost.x * CELL_SIZE + 7, ghost.y * CELL_SIZE + 8, 1.5, 0, Math.PI * 2);
      ctx.arc(ghost.x * CELL_SIZE + 13, ghost.y * CELL_SIZE + 8, 1.5, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  const drawGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    drawMaze(ctx);
    drawPellets(ctx);
    drawGhosts(ctx);
    drawPacman(ctx);
  };

  const canMove = (x, y) => {
    if (x < 0 || x >= GRID_WIDTH || y < 0 || y >= GRID_HEIGHT) return false;
    return maze[y][x] !== 1;
  };

  const updateGame = useCallback(() => {
    const state = gameStateRef.current;
    state.frameCount++;

    // Update pacman direction
    const nextX = state.pacman.x + state.pacman.nextDirection.x;
    const nextY = state.pacman.y + state.pacman.nextDirection.y;
    
    if (canMove(nextX, nextY)) {
      state.pacman.direction = { ...state.pacman.nextDirection };
    }

    // Move pacman every few frames
    if (state.frameCount % 8 === 0) {
      const newX = state.pacman.x + state.pacman.direction.x;
      const newY = state.pacman.y + state.pacman.direction.y;

      if (canMove(newX, newY)) {
        state.pacman.x = newX;
        state.pacman.y = newY;

        // Check pellet collision
        const pelletIndex = state.pellets.findIndex(
          p => p.x === newX && p.y === newY
        );
        if (pelletIndex !== -1) {
          state.pellets.splice(pelletIndex, 1);
          const newScore = score + 10;
          setScore(newScore);
          if (newScore > highScore) {
            setHighScore(newScore);
            localStorage.setItem('pacmanHighScore', newScore.toString());
          }
        }

        // Check power pellet collision
        const powerIndex = state.powerPellets.findIndex(
          p => p.x === newX && p.y === newY
        );
        if (powerIndex !== -1) {
          state.powerPellets.splice(powerIndex, 1);
          const newScore = score + 50;
          setScore(newScore);
          if (newScore > highScore) {
            setHighScore(newScore);
            localStorage.setItem('pacmanHighScore', newScore.toString());
          }
        }

        // Check win condition
        if (state.pellets.length === 0 && state.powerPellets.length === 0) {
          endGame(true);
          return;
        }
      }
    }

    // Move ghosts
    if (state.frameCount % 10 === 0) {
      state.ghosts.forEach(ghost => {
        const possibleDirections = [
          { x: 0, y: -1 },
          { x: 0, y: 1 },
          { x: -1, y: 0 },
          { x: 1, y: 0 }
        ].filter(dir => {
          const newX = ghost.x + dir.x;
          const newY = ghost.y + dir.y;
          return canMove(newX, newY);
        });

        if (possibleDirections.length > 0) {
          if (Math.random() < 0.3 || !canMove(ghost.x + ghost.direction.x, ghost.y + ghost.direction.y)) {
            ghost.direction = possibleDirections[Math.floor(Math.random() * possibleDirections.length)];
          }
          ghost.x += ghost.direction.x;
          ghost.y += ghost.direction.y;
        }
      });
    }

    // Check ghost collision
    const collision = state.ghosts.some(
      ghost => ghost.x === state.pacman.x && ghost.y === state.pacman.y
    );

    if (collision) {
      const newLives = lives - 1;
      setLives(newLives);
      
      if (newLives <= 0) {
        endGame(false);
      } else {
        // Reset positions
        state.pacman = { x: 9, y: 15, direction: { x: 0, y: 0 }, nextDirection: { x: 0, y: 0 } };
        state.ghosts = [
          { x: 9, y: 9, color: '#FF0000', direction: { x: 1, y: 0 } },
          { x: 8, y: 9, color: '#FFB8FF', direction: { x: -1, y: 0 } },
          { x: 10, y: 9, color: '#00FFFF', direction: { x: 1, y: 0 } },
          { x: 9, y: 10, color: '#FFB852', direction: { x: 0, y: 1 } }
        ];
      }
    }

    drawGame();

    if (gameStarted) {
      state.gameLoop = requestAnimationFrame(updateGame);
    }
  }, [gameStarted, score, highScore, lives]);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setLives(3);
    
    gameStateRef.current.pacman = { 
      x: 9, 
      y: 15, 
      direction: { x: 0, y: 0 }, 
      nextDirection: { x: 0, y: 0 },
      mouthOpen: true
    };
    gameStateRef.current.frameCount = 0;
    gameStateRef.current.keys = {};
    
    initializeGame();
    drawGame();
    
    gameStateRef.current.gameLoop = requestAnimationFrame(updateGame);
  };

  const endGame = (won) => {
    if (gameStateRef.current.gameLoop) {
      cancelAnimationFrame(gameStateRef.current.gameLoop);
    }
    setGameOver(true);
    setGameStarted(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gameStarted) return;
      
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }

      const state = gameStateRef.current;
      
      switch (e.key) {
        case 'ArrowUp':
          state.pacman.nextDirection = { x: 0, y: -1 };
          break;
        case 'ArrowDown':
          state.pacman.nextDirection = { x: 0, y: 1 };
          break;
        case 'ArrowLeft':
          state.pacman.nextDirection = { x: -1, y: 0 };
          break;
        case 'ArrowRight':
          state.pacman.nextDirection = { x: 1, y: 0 };
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStarted]);

  const moveDirection = (dir) => {
    if (!gameStarted) return;
    const state = gameStateRef.current;
    
    switch(dir) {
      case 'up':
        state.pacman.nextDirection = { x: 0, y: -1 };
        break;
      case 'down':
        state.pacman.nextDirection = { x: 0, y: 1 };
        break;
      case 'left':
        state.pacman.nextDirection = { x: -1, y: 0 };
        break;
      case 'right':
        state.pacman.nextDirection = { x: 1, y: 0 };
        break;
      default:
        break;
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
              <p style={{ color: '#fff' }}>PACMAN_GAME.bin</p>
              <div className="windowCircle">
                <div className="circle" style={{ background: '#fff' }}></div>
                <div className="circle" style={{ background: '#fff' }}></div>
                <div className="circle" style={{ background: '#fff' }}></div>
              </div>
            </div>
            <div className="windowContent" style={{ textAlign: 'center' }}>
              <h1 style={{ marginBottom: '20px', fontSize: '2rem' }}>👻 PAC-MAN</h1>

              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: '15px',
                marginBottom: '20px',
                fontSize: '1rem'
              }}>
                <div style={{ 
                  padding: '10px', 
                  background: '#FFFF00', 
                  border: '2px solid #000',
                  boxShadow: '4px 4px 0px #000'
                }}>
                  <b>Score:</b> {score}
                </div>
                <div style={{ 
                  padding: '10px', 
                  background: '#FFA0A0', 
                  border: '2px solid #000',
                  boxShadow: '4px 4px 0px #000'
                }}>
                  <b>High:</b> {highScore}
                </div>
                <div style={{ 
                  padding: '10px', 
                  background: '#FF0000', 
                  border: '2px solid #000',
                  boxShadow: '4px 4px 0px #000',
                  color: '#fff'
                }}>
                  <b>Lives:</b> {'❤️'.repeat(lives)}
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
                    background: '#000'
                  }}
                />
              </div>

              {/* Mobile Controls */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '10px',
                maxWidth: '250px',
                margin: '0 auto 20px'
              }} className="mobile-controls">
                <button 
                  onClick={() => moveDirection('up')}
                  disabled={!gameStarted || gameOver}
                  className="loginBtn"
                  style={{
                    gridColumn: '2',
                    fontSize: '1.5rem',
                    padding: '15px',
                    background: '#FFFF00'
                  }}
                >
                  ▲
                </button>
                <button 
                  onClick={() => moveDirection('left')}
                  disabled={!gameStarted || gameOver}
                  className="loginBtn"
                  style={{
                    gridColumn: '1',
                    gridRow: '2',
                    fontSize: '1.5rem',
                    padding: '15px',
                    background: '#FFFF00'
                  }}
                >
                  ◄
                </button>
                <button 
                  onClick={() => moveDirection('down')}
                  disabled={!gameStarted || gameOver}
                  className="loginBtn"
                  style={{
                    gridColumn: '2',
                    gridRow: '2',
                    fontSize: '1.5rem',
                    padding: '15px',
                    background: '#FFFF00'
                  }}
                >
                  ▼
                </button>
                <button 
                  onClick={() => moveDirection('right')}
                  disabled={!gameStarted || gameOver}
                  className="loginBtn"
                  style={{
                    gridColumn: '3',
                    gridRow: '2',
                    fontSize: '1.5rem',
                    padding: '15px',
                    background: '#FFFF00'
                  }}
                >
                  ►
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
                      background: '#FFFF00',
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
                    background: lives > 0 ? '#50B6D1' : '#FFA0A0',
                    border: '2px solid #000',
                    marginBottom: '20px',
                    display: 'inline-block',
                    boxShadow: '6px 6px 0px #000'
                  }}>
                    <h2 style={{ margin: '0 0 10px 0' }}>
                      {lives > 0 ? '🎉 YOU WIN!' : 'GAME OVER!'}
                    </h2>
                    <p style={{ fontSize: '1.2rem', margin: 0 }}>Final Score: {score}</p>
                  </div>
                  <br />
                  <button 
                    onClick={startGame}
                    className="loginBtn"
                    style={{
                      fontSize: '1.2rem',
                      padding: '15px 40px',
                      background: '#FFFF00',
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
                    <b>🎯 Goal:</b> Eat all pellets while avoiding ghosts!
                  </p>
                  <p style={{ fontSize: '1.1rem', marginBottom: '10px' }}>
                    <b>⌨️ Desktop Controls:</b>
                  </p>
                  <ul style={{ listStylePosition: 'inside', fontSize: '1rem' }}>
                    <li>⬆️ Up Arrow - Move Up</li>
                    <li>⬇️ Down Arrow - Move Down</li>
                    <li>⬅️ Left Arrow - Move Left</li>
                    <li>➡️ Right Arrow - Move Right</li>
                  </ul>
                  <p style={{ fontSize: '1.1rem', marginTop: '15px' }}>
                    <b>📱 Mobile:</b> Use the on-screen buttons
                  </p>
                  <p style={{ fontSize: '1.1rem', marginTop: '15px' }}>
                    <b>🎮 Scoring:</b>
                  </p>
                  <ul style={{ listStylePosition: 'inside', fontSize: '1rem' }}>
                    <li>Small pellet: 10 points</li>
                    <li>Power pellet: 50 points</li>
                  </ul>
                  <p style={{ fontSize: '1.1rem', marginTop: '15px', color: '#FFA0A0' }}>
                    <b>⚠️ Warning:</b> You have 3 lives. Don't let ghosts catch you!
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer style={{ textAlign: 'center', padding: '20px', marginTop: '40px' }}>
        <p style={{ color: '#565f89', fontSize: '0.9rem' }}>
          🕹️ Classic Pac-Man Game - Made with React
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

export default PacMan;
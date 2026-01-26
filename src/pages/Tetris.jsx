import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import "../App.css";

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const CELL_SIZE = 25;

const SHAPES = {
  I: [[1, 1, 1, 1]],
  O: [
    [1, 1],
    [1, 1],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
  ],
};

const COLORS = {
  I: "#50B6D1",
  O: "#FFA0A0",
  T: "#89A8C7",
  S: "#A8E6CF",
  Z: "#FFD3B6",
  J: "#FFAAA5",
  L: "#FF8B94",
};

function Tetris() {
  const [board, setBoard] = useState([]);
  const [currentPiece, setCurrentPiece] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [level, setLevel] = useState(1);
  const [lines, setLines] = useState(0);
  const gameLoopRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const savedHighScore = localStorage.getItem("tetrisHighScore");
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
  }, []);

  const createEmptyBoard = () => {
    return Array(BOARD_HEIGHT)
      .fill(null)
      .map(() => Array(BOARD_WIDTH).fill(0));
  };

  const getRandomPiece = () => {
    const shapes = Object.keys(SHAPES);
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    return {
      shape: SHAPES[randomShape],
      color: COLORS[randomShape],
      type: randomShape,
    };
  };

  const drawBoard = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#1a1b26";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = "#292e42";
    ctx.lineWidth = 1;
    for (let i = 0; i <= BOARD_WIDTH; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, BOARD_HEIGHT * CELL_SIZE);
      ctx.stroke();
    }
    for (let i = 0; i <= BOARD_HEIGHT; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(BOARD_WIDTH * CELL_SIZE, i * CELL_SIZE);
      ctx.stroke();
    }

    // Draw placed pieces
    board.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell) {
          ctx.fillStyle = cell;
          ctx.fillRect(
            x * CELL_SIZE + 1,
            y * CELL_SIZE + 1,
            CELL_SIZE - 2,
            CELL_SIZE - 2,
          );
          ctx.strokeStyle = "#000";
          ctx.lineWidth = 2;
          ctx.strokeRect(
            x * CELL_SIZE + 1,
            y * CELL_SIZE + 1,
            CELL_SIZE - 2,
            CELL_SIZE - 2,
          );
        }
      });
    });

    // Draw current piece
    if (currentPiece) {
      ctx.fillStyle = currentPiece.color;
      currentPiece.shape.forEach((row, dy) => {
        row.forEach((cell, dx) => {
          if (cell) {
            const x = position.x + dx;
            const y = position.y + dy;
            ctx.fillRect(
              x * CELL_SIZE + 1,
              y * CELL_SIZE + 1,
              CELL_SIZE - 2,
              CELL_SIZE - 2,
            );
            ctx.strokeStyle = "#000";
            ctx.lineWidth = 2;
            ctx.strokeRect(
              x * CELL_SIZE + 1,
              y * CELL_SIZE + 1,
              CELL_SIZE - 2,
              CELL_SIZE - 2,
            );
          }
        });
      });
    }
  }, [board, currentPiece, position]);

  const checkCollision = (piece, pos) => {
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x]) {
          const newX = pos.x + x;
          const newY = pos.y + y;

          if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) {
            return true;
          }

          if (newY >= 0 && board[newY] && board[newY][newX]) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const mergePiece = () => {
    const newBoard = board.map((row) => [...row]);
    currentPiece.shape.forEach((row, dy) => {
      row.forEach((cell, dx) => {
        if (cell) {
          const y = position.y + dy;
          const x = position.x + dx;
          if (y >= 0 && y < BOARD_HEIGHT && x >= 0 && x < BOARD_WIDTH) {
            newBoard[y][x] = currentPiece.color;
          }
        }
      });
    });
    return newBoard;
  };

  const clearLines = (newBoard) => {
    let linesCleared = 0;
    for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
      if (newBoard[y].every((cell) => cell !== 0)) {
        newBoard.splice(y, 1);
        newBoard.unshift(Array(BOARD_WIDTH).fill(0));
        linesCleared++;
        y++;
      }
    }
    return linesCleared;
  };

  const rotatePiece = () => {
    if (!currentPiece || !gameStarted || gameOver) return;

    const rotated = currentPiece.shape[0].map((_, i) =>
      currentPiece.shape.map((row) => row[i]).reverse(),
    );

    const rotatedPiece = { ...currentPiece, shape: rotated };

    if (!checkCollision(rotatedPiece, position)) {
      setCurrentPiece(rotatedPiece);
    }
  };

  const moveDown = useCallback(() => {
    if (!currentPiece || !gameStarted || gameOver) return;

    const newPos = { ...position, y: position.y + 1 };

    if (checkCollision(currentPiece, newPos)) {
      const newBoard = mergePiece();
      const linesCleared = clearLines(newBoard);

      if (linesCleared > 0) {
        const newLines = lines + linesCleared;
        const newScore = score + linesCleared * 100 * level;
        const newLevel = Math.floor(newLines / 10) + 1;

        setLines(newLines);
        setScore(newScore);
        setLevel(newLevel);

        if (newScore > highScore) {
          setHighScore(newScore);
          localStorage.setItem("tetrisHighScore", newScore.toString());
        }
      }

      setBoard(newBoard);

      const newPiece = getRandomPiece();
      const startPos = { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 };

      if (checkCollision(newPiece, startPos)) {
        endGame();
      } else {
        setCurrentPiece(newPiece);
        setPosition(startPos);
      }
    } else {
      setPosition(newPos);
    }
  }, [
    currentPiece,
    position,
    board,
    gameStarted,
    gameOver,
    score,
    highScore,
    level,
    lines,
  ]);

  const moveHorizontal = (direction) => {
    if (!currentPiece || !gameStarted || gameOver) return;

    const newPos = { ...position, x: position.x + direction };
    if (!checkCollision(currentPiece, newPos)) {
      setPosition(newPos);
    }
  };

  const dropPiece = () => {
    if (!currentPiece || !gameStarted || gameOver) return;

    let newPos = { ...position };
    while (!checkCollision(currentPiece, { ...newPos, y: newPos.y + 1 })) {
      newPos.y++;
    }
    setPosition(newPos);
    setTimeout(moveDown, 50);
  };

  useEffect(() => {
    drawBoard();
  }, [drawBoard]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const speed = Math.max(100, 1000 - (level - 1) * 100);
    gameLoopRef.current = setInterval(moveDown, speed);

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameStarted, gameOver, moveDown, level]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!gameStarted || gameOver) return;

      e.preventDefault();

      switch (e.key) {
        case "ArrowLeft":
          moveHorizontal(-1);
          break;
        case "ArrowRight":
          moveHorizontal(1);
          break;
        case "ArrowDown":
          moveDown();
          break;
        case "ArrowUp":
          rotatePiece();
          break;
        case " ":
          dropPiece();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [gameStarted, gameOver, currentPiece, position]);

  const startGame = () => {
    const newBoard = createEmptyBoard();
    const newPiece = getRandomPiece();
    const startPos = { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 };

    setBoard(newBoard);
    setCurrentPiece(newPiece);
    setPosition(startPos);
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setLevel(1);
    setLines(0);
  };

  const endGame = () => {
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
    }
    setGameOver(true);
    setGameStarted(false);
  };

  return (
    <div className="portfolio-wrapper">
      <header>
        <div className="windowTop">
          <p>
            <img
              src="/image/Map_Pin_Grub.png"
              style={{
                width: "18px",
                verticalAlign: "middle",
                marginRight: "5px",
              }}
              alt=""
            />
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
            <Link to="/">
              <img src="/image/home.png" className="nav-icon" alt="" />{" "}
              <span>Home</span>
            </Link>
            <Link to="/blog">
              <img src="/image/life.png" className="nav-icon" alt="" />{" "}
              <span>Life Blog</span>
            </Link>
            <Link to="/projects">
              <img src="/image/made.png" className="nav-icon" alt="" />{" "}
              <span>Stuff I Made</span>
            </Link>
            <Link to="/portfolio">
              <img src="/image/me.png" className="nav-icon" alt="" />{" "}
              <span>Who Am I</span>
            </Link>
            <Link to="/view-gallery">
              <img src="/image/frame.png" className="nav-icon" alt="" />{" "}
              <span>Gallery</span>
            </Link>
            <Link to="/games">
              <img src="/image/joystick.png" className="nav-icon" alt="" />{" "}
              <span>Games</span>
            </Link>
            <Link to="/chat">
              <img src="/image/babble.png" className="nav-icon" alt="" />{" "}
              <span>Chat</span>
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "40px 20px",
            width: "100%",
          }}
        >
          <section style={{ width: "100%", maxWidth: "900px" }}>
            <div className="windowTop" style={{ background: "#03274B" }}>
              <p style={{ color: "#fff" }}>TETRIS_GAME.bin</p>
              <div className="windowCircle">
                <div className="circle" style={{ background: "#fff" }}></div>
                <div className="circle" style={{ background: "#fff" }}></div>
                <div className="circle" style={{ background: "#fff" }}></div>
              </div>
            </div>
            <div className="windowContent" style={{ textAlign: "center" }}>
              <h1 style={{ marginBottom: "20px", fontSize: "2rem" }}>
                🎮 RETRO TETRIS
              </h1>

              {/* Score Display */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                  gap: "15px",
                  marginBottom: "20px",
                  fontSize: "1rem",
                }}
              >
                <div
                  style={{
                    padding: "10px",
                    background: "#50B6D1",
                    border: "2px solid #000",
                    boxShadow: "4px 4px 0px #000",
                  }}
                >
                  <b>Score:</b> {score}
                </div>
                <div
                  style={{
                    padding: "10px",
                    background: "#FFA0A0",
                    border: "2px solid #000",
                    boxShadow: "4px 4px 0px #000",
                  }}
                >
                  <b>High:</b> {highScore}
                </div>
                <div
                  style={{
                    padding: "10px",
                    background: "#89A8C7",
                    border: "2px solid #000",
                    boxShadow: "4px 4px 0px #000",
                  }}
                >
                  <b>Level:</b> {level}
                </div>
                <div
                  style={{
                    padding: "10px",
                    background: "#A8E6CF",
                    border: "2px solid #000",
                    boxShadow: "4px 4px 0px #000",
                  }}
                >
                  <b>Lines:</b> {lines}
                </div>
              </div>

              {/* Game Canvas */}
              <div
                style={{
                  display: "inline-block",
                  border: "4px solid #000",
                  boxShadow: "8px 8px 0px #000",
                  marginBottom: "20px",
                  touchAction: "none",
                  userSelect: "none",
                }}
              >
                <canvas
                  ref={canvasRef}
                  width={BOARD_WIDTH * CELL_SIZE}
                  height={BOARD_HEIGHT * CELL_SIZE}
                  style={{
                    display: "block",
                    background: "#1a1b26",
                  }}
                />
              </div>

              {/* Mobile Controls */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "10px",
                  maxWidth: "300px",
                  margin: "0 auto 20px",
                }}
                className="mobile-controls"
              >
                <button
                  onClick={rotatePiece}
                  disabled={!gameStarted || gameOver}
                  className="loginBtn"
                  style={{
                    gridColumn: "2",
                    fontSize: "1.5rem",
                    padding: "15px",
                    background: "#89A8C7",
                  }}
                >
                  ↻
                </button>
                <button
                  onClick={() => moveHorizontal(-1)}
                  disabled={!gameStarted || gameOver}
                  className="loginBtn"
                  style={{
                    gridColumn: "1",
                    gridRow: "2",
                    fontSize: "1.5rem",
                    padding: "15px",
                  }}
                >
                  ◄
                </button>
                <button
                  onClick={moveDown}
                  disabled={!gameStarted || gameOver}
                  className="loginBtn"
                  style={{
                    gridColumn: "2",
                    gridRow: "2",
                    fontSize: "1.5rem",
                    padding: "15px",
                  }}
                >
                  ▼
                </button>
                <button
                  onClick={() => moveHorizontal(1)}
                  disabled={!gameStarted || gameOver}
                  className="loginBtn"
                  style={{
                    gridColumn: "3",
                    gridRow: "2",
                    fontSize: "1.5rem",
                    padding: "15px",
                  }}
                >
                  ►
                </button>
              </div>

              {/* Controls */}
              {!gameStarted && !gameOver && (
                <div>
                  <button
                    onClick={startGame}
                    className="loginBtn"
                    style={{
                      fontSize: "1.2rem",
                      padding: "15px 40px",
                      background: "#50B6D1",
                      color: "#000",
                      marginBottom: "20px",
                    }}
                  >
                    🎮 START GAME
                  </button>
                </div>
              )}

              {gameOver && (
                <div>
                  <div
                    style={{
                      padding: "20px",
                      background: "#FFA0A0",
                      border: "2px solid #000",
                      marginBottom: "20px",
                      display: "inline-block",
                      boxShadow: "6px 6px 0px #000",
                    }}
                  >
                    <h2 style={{ margin: "0 0 10px 0" }}>GAME OVER!</h2>
                    <p style={{ fontSize: "1.2rem", margin: 0 }}>
                      Final Score: {score}
                    </p>
                    <p style={{ fontSize: "1rem", margin: "5px 0 0 0" }}>
                      Lines: {lines}
                    </p>
                  </div>
                  <br />
                  <button
                    onClick={startGame}
                    className="loginBtn"
                    style={{
                      fontSize: "1.2rem",
                      padding: "15px 40px",
                      background: "#50B6D1",
                      color: "#000",
                    }}
                  >
                    🔄 PLAY AGAIN
                  </button>
                </div>
              )}

              {/* Instructions */}
              <div
                className="separate"
                style={{ marginTop: "30px", textAlign: "left" }}
              >
                <h2 style={{ fontSize: "1.5rem", marginBottom: "15px" }}>
                  📋 HOW TO PLAY
                </h2>
                <div className="post" style={{ maxHeight: "none" }}>
                  <p style={{ fontSize: "1.1rem", marginBottom: "10px" }}>
                    <b>🎯 Goal:</b> Clear lines by filling rows completely!
                  </p>
                  <p style={{ fontSize: "1.1rem", marginBottom: "10px" }}>
                    <b>⌨️ Desktop Controls:</b>
                  </p>
                  <ul style={{ listStylePosition: "inside", fontSize: "1rem" }}>
                    <li>⬅️ Left Arrow - Move Left</li>
                    <li>➡️ Right Arrow - Move Right</li>
                    <li>⬇️ Down Arrow - Move Down Faster</li>
                    <li>⬆️ Up Arrow - Rotate Piece</li>
                  </ul>
                  <p style={{ fontSize: "1.1rem", marginTop: "15px" }}>
                    <b>📱 Mobile:</b> Use the on-screen buttons above
                  </p>
                  <p
                    style={{
                      fontSize: "1.1rem",
                      marginTop: "15px",
                      color: "#50B6D1",
                    }}
                  >
                    <b>💡 Tip:</b> Clear multiple lines at once for bonus
                    points!
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer
        style={{ textAlign: "center", padding: "20px", marginTop: "40px" }}
      >
        <p style={{ color: "#565f89", fontSize: "0.9rem" }}>
          🕹️ Classic Tetris Game - Made with React
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

export default Tetris;

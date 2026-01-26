import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Snake() {
  const canvasRef = useRef(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const GRID_SIZE = 20;
  const CANVAS_SIZE = 400;
  const CELL_SIZE = CANVAS_SIZE / GRID_SIZE;

  const gameStateRef = useRef({
    snake: [{ x: 10, y: 10 }],
    direction: { x: 1, y: 0 },
    food: { x: 15, y: 15 },
    gameLoop: null,
  });

  useEffect(() => {
    const savedHighScore = localStorage.getItem("snakeHighScore");
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }

    return () => {
      if (gameStateRef.current.gameLoop) {
        clearInterval(gameStateRef.current.gameLoop);
      }
    };
  }, []);

  const generateFood = () => {
    return {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  };

  const drawGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const { snake, food } = gameStateRef.current;

    ctx.fillStyle = "#cfd3da";
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    ctx.strokeStyle = "#e1e2e7";
    ctx.lineWidth = 1;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, CANVAS_SIZE);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(CANVAS_SIZE, i * CELL_SIZE);
      ctx.stroke();
    }

    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? "#03274B" : "#50B6D1";
      ctx.fillRect(
        segment.x * CELL_SIZE + 1,
        segment.y * CELL_SIZE + 1,
        CELL_SIZE - 2,
        CELL_SIZE - 2,
      );

      ctx.strokeStyle = "#000";
      ctx.lineWidth = 2;
      ctx.strokeRect(
        segment.x * CELL_SIZE + 1,
        segment.y * CELL_SIZE + 1,
        CELL_SIZE - 2,
        CELL_SIZE - 2,
      );
    });

    ctx.fillStyle = "#FFA0A0";
    ctx.fillRect(
      food.x * CELL_SIZE + 1,
      food.y * CELL_SIZE + 1,
      CELL_SIZE - 2,
      CELL_SIZE - 2,
    );
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.strokeRect(
      food.x * CELL_SIZE + 1,
      food.y * CELL_SIZE + 1,
      CELL_SIZE - 2,
      CELL_SIZE - 2,
    );
  };

  const moveSnake = () => {
    const { snake, direction, food } = gameStateRef.current;
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    if (
      head.x < 0 ||
      head.x >= GRID_SIZE ||
      head.y < 0 ||
      head.y >= GRID_SIZE
    ) {
      endGame();
      return;
    }

    if (snake.some((segment) => segment.x === head.x && segment.y === head.y)) {
      endGame();
      return;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      const newScore = score + 10;
      setScore(newScore);
      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem("snakeHighScore", newScore.toString());
      }
      gameStateRef.current.food = generateFood();
    } else {
      snake.pop();
    }

    drawGame();
  };

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    gameStateRef.current = {
      snake: [{ x: 10, y: 10 }],
      direction: { x: 1, y: 0 },
      food: generateFood(),
      gameLoop: null,
    };

    drawGame();

    gameStateRef.current.gameLoop = setInterval(() => {
      moveSnake();
    }, 150);
  };

  const endGame = () => {
    if (gameStateRef.current.gameLoop) {
      clearInterval(gameStateRef.current.gameLoop);
    }
    setGameOver(true);
    setGameStarted(false);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!gameStarted) return;

      const { direction } = gameStateRef.current;

      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case "ArrowUp":
          if (direction.y === 0)
            gameStateRef.current.direction = { x: 0, y: -1 };
          break;
        case "ArrowDown":
          if (direction.y === 0)
            gameStateRef.current.direction = { x: 0, y: 1 };
          break;
        case "ArrowLeft":
          if (direction.x === 0)
            gameStateRef.current.direction = { x: -1, y: 0 };
          break;
        case "ArrowRight":
          if (direction.x === 0)
            gameStateRef.current.direction = { x: 1, y: 0 };
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [gameStarted]);

  const moveDirection = (dir) => {
    if (!gameStarted) return;
    const { direction } = gameStateRef.current;

    switch (dir) {
      case "up":
        if (direction.y === 0) gameStateRef.current.direction = { x: 0, y: -1 };
        break;
      case "down":
        if (direction.y === 0) gameStateRef.current.direction = { x: 0, y: 1 };
        break;
      case "left":
        if (direction.x === 0) gameStateRef.current.direction = { x: -1, y: 0 };
        break;
      case "right":
        if (direction.x === 0) gameStateRef.current.direction = { x: 1, y: 0 };
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
          <section style={{ width: "100%", maxWidth: "800px" }}>
            <div className="windowTop" style={{ background: "#03274B" }}>
              <p style={{ color: "#fff" }}>SNAKE_GAME.bin</p>
              <div className="windowCircle">
                <div className="circle" style={{ background: "#fff" }}></div>
                <div className="circle" style={{ background: "#fff" }}></div>
                <div className="circle" style={{ background: "#fff" }}></div>
              </div>
            </div>
            <div className="windowContent" style={{ textAlign: "center" }}>
              <h1 style={{ marginBottom: "20px", fontSize: "2rem" }}>
                🐍 RETRO SNAKE
              </h1>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "40px",
                  marginBottom: "20px",
                  fontSize: "1.2rem",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    padding: "10px 20px",
                    background: "#50B6D1",
                    border: "2px solid #000",
                    boxShadow: "4px 4px 0px #000",
                  }}
                >
                  <b>Score:</b> {score}
                </div>
                <div
                  style={{
                    padding: "10px 20px",
                    background: "#FFA0A0",
                    border: "2px solid #000",
                    boxShadow: "4px 4px 0px #000",
                  }}
                >
                  <b>High Score:</b> {highScore}
                </div>
              </div>

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
                  width={CANVAS_SIZE}
                  height={CANVAS_SIZE}
                  style={{
                    display: "block",
                    background: "#cfd3da",
                  }}
                />
              </div>

              {/* Mobile Controls */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "10px",
                  maxWidth: "250px",
                  margin: "0 auto 20px",
                }}
                className="mobile-controls"
              >
                <button
                  onClick={() => moveDirection("up")}
                  disabled={!gameStarted || gameOver}
                  className="loginBtn"
                  style={{
                    gridColumn: "2",
                    fontSize: "1.5rem",
                    padding: "15px",
                  }}
                >
                  ▲
                </button>
                <button
                  onClick={() => moveDirection("left")}
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
                  onClick={() => moveDirection("down")}
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
                  onClick={() => moveDirection("right")}
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

              <div
                className="separate"
                style={{ marginTop: "30px", textAlign: "left" }}
              >
                <h2 style={{ fontSize: "1.5rem", marginBottom: "15px" }}>
                  📋 HOW TO PLAY
                </h2>
                <div className="post" style={{ maxHeight: "none" }}>
                  <p style={{ fontSize: "1.1rem", marginBottom: "10px" }}>
                    <b>🎯 Goal:</b> Eat the red food to grow longer!
                  </p>
                  <p style={{ fontSize: "1.1rem", marginBottom: "10px" }}>
                    <b>⌨️ Desktop Controls:</b>
                  </p>
                  <ul style={{ listStylePosition: "inside", fontSize: "1rem" }}>
                    <li>⬆️ Up Arrow - Move Up</li>
                    <li>⬇️ Down Arrow - Move Down</li>
                    <li>⬅️ Left Arrow - Move Left</li>
                    <li>➡️ Right Arrow - Move Right</li>
                  </ul>
                  <p style={{ fontSize: "1.1rem", marginTop: "15px" }}>
                    <b>📱 Mobile:</b> Use the on-screen buttons above
                  </p>
                  <p
                    style={{
                      fontSize: "1.1rem",
                      marginTop: "15px",
                      color: "#FFA0A0",
                    }}
                  >
                    <b>⚠️ Warning:</b> Don't hit walls or yourself!
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
          🕹️ Classic Snake Game - Made with React
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

export default Snake;

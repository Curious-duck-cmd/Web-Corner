import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { fetchHighScores } from "../utils/scoreManager";
import "../App.css";

function GamesPage() {
  const [hoveredGame, setHoveredGame] = useState(null);
  const [highScores, setHighScores] = useState({
    tetris: 0,
    snake: 0,
    pong: 0,
    slot_machine: 0,
    roulette: 0,
  });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalGamesPlayed, setTotalGamesPlayed] = useState(0);

  const games = [
    {
      name: "TETRIS",
      path: "/tetris",
      color: "#50B6D1",
      image: "/image/tetris.png",
      description: "Stack blocks and clear lines!",
      difficulty: "Medium",
      players: "1 Player",
      genre: "Puzzle",
      scoreKey: "tetris",
    },
    {
      name: "SNAKE",
      path: "/snake",
      color: "#89A8C7",
      image: "/image/snake-game.png",
      description: "Eat food and grow longer!",
      difficulty: "Easy",
      players: "1 Player",
      genre: "Arcade",
      scoreKey: "snake",
    },
    {
      name: "PONG",
      path: "/pong",
      color: "#f6b4b4",
      image: "/image/ping-pong.png",
      description: "Beat the AI in classic pong!",
      difficulty: "Hard",
      players: "1 Player vs AI",
      genre: "Sports",
      scoreKey: "pong",
    },
  ];

  const casinoGames = [
    {
      name: "SLOT MACHINE",
      path: "/slotmachine",
      color: "#FFD700",
      image: "/image/slot-machine.png",
      description: "Spin to win big jackpots!",
      difficulty: "Luck Based",
      players: "1 Player",
      genre: "Casino",
      scoreKey: "slot_machine",
    },
    {
      name: "ROULETTE",
      path: "/roulette",
      color: "#006400",
      image: "/image/roulette.png",
      description: "Red or Black? Place your bets!",
      difficulty: "Luck Based",
      players: "1 Player",
      genre: "Casino",
      scoreKey: "roulette",
    },
  ];

  useEffect(() => {
    fetchUserAndScores();
  }, []);

  const fetchUserAndScores = async () => {
    try {
      setLoading(true);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;

      setUser(user);

      if (user) {
        const scores = await fetchHighScores();

        if (scores) {
          setHighScores({
            tetris: scores.tetris || 0,
            snake: scores.snake || 0,
            pong: scores.pong || 0,
            slot_machine: scores.slot_machine || 0,
            roulette: scores.roulette || 0,
          });

          const total =
            (scores.games_played_tetris || 0) +
            (scores.games_played_snake || 0) +
            (scores.games_played_pong || 0) +
            (scores.games_played_slots || 0) +
            (scores.games_played_roulette || 0);
          setTotalGamesPlayed(total);
        }
      }
    } catch (error) {
      console.error("Error fetching scores:", error);
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "#89A8C7";
      case "Medium":
        return "#FFD700";
      case "Hard":
        return "#FFA0A0";
      default:
        return "#50B6D1";
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
            Games_Menu.exe
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
          <section style={{ width: "100%", maxWidth: "1200px" }}>
            {/* Hero Section */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.2)",
                border: "2px dashed #000",
                borderRadius: "4px",
                padding: "40px",
                marginBottom: "40px",
                boxShadow: "3px 3px 0px #000",
                position: "relative",
              }}
            >
              <h1
                style={{
                  marginBottom: "20px",
                  fontSize: "3rem",
                  textAlign: "center",
                  color: "#fff",
                  textShadow: "4px 4px 0px #000",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                🕹️ RETRO ARCADE
              </h1>

              <p
                style={{
                  textAlign: "center",
                  fontSize: "1.3rem",
                  marginBottom: "30px",
                  color: "#fff",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                Choose your game and try to beat the high score!
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                  gap: "15px",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <div
                  style={{
                    background: "rgba(255,255,255,0.95)",
                    border: "3px solid #000",
                    padding: "15px",
                    textAlign: "center",
                    borderRadius: "5px",
                    boxShadow: "4px 4px 0px rgba(0,0,0,0.3)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "2rem",
                      fontWeight: "bold",
                      color: "#50B6D1",
                    }}
                  >
                    {games.length + casinoGames.length}
                  </div>
                  <div style={{ fontSize: "0.9rem", fontWeight: "bold" }}>
                    Total Games
                  </div>
                </div>
                <div
                  style={{
                    background: "rgba(255,255,255,0.95)",
                    border: "3px solid #000",
                    padding: "15px",
                    textAlign: "center",
                    borderRadius: "5px",
                    boxShadow: "4px 4px 0px rgba(0,0,0,0.3)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "2rem",
                      fontWeight: "bold",
                      color: "#FFA0A0",
                    }}
                  >
                    {user ? (loading ? "..." : totalGamesPlayed) : "?"}
                  </div>
                  <div style={{ fontSize: "0.9rem", fontWeight: "bold" }}>
                    Games Played
                  </div>
                </div>
                <div
                  style={{
                    background: "rgba(255,255,255,0.95)",
                    border: "3px solid #000",
                    padding: "15px",
                    textAlign: "center",
                    borderRadius: "5px",
                    boxShadow: "4px 4px 0px rgba(0,0,0,0.3)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "2rem",
                      fontWeight: "bold",
                      color: "#FFD700",
                    }}
                  >
                    {user ? "ACTIVE" : "GUEST"}
                  </div>
                  <div style={{ fontSize: "0.9rem", fontWeight: "bold" }}>
                    Player Status
                  </div>
                </div>
              </div>

              {/* Login Button for Guests */}
              {!user && (
                <div
                  style={{
                    marginTop: "25px",
                    textAlign: "center",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <Link
                    to="/login"
                    style={{
                      display: "inline-block",
                      padding: "15px 40px",
                      background: "#FFD700",
                      border: "4px solid #000",
                      color: "#000",
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      textDecoration: "none",
                      borderRadius: "8px",
                      boxShadow: "6px 6px 0px #000",
                      transition: "all 0.3s ease",
                      textTransform: "uppercase",
                      letterSpacing: "2px",
                      animation: "pulse 2s infinite",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateY(-4px) scale(1.05)";
                      e.target.style.boxShadow = "10px 10px 0px #000";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0) scale(1)";
                      e.target.style.boxShadow = "6px 6px 0px #000";
                    }}
                  >
                    🎮 Login to Save High Scores! 🏆
                  </Link>
                  <p
                    style={{
                      color: "#fff",
                      marginTop: "15px",
                      fontSize: "0.95rem",
                      opacity: 0.9,
                    }}
                  >
                    Track your progress and compete with yourself!
                  </p>
                </div>
              )}

              {/* Logout Button for Logged-in Users */}
              {user && (
                <div
                  style={{
                    marginTop: "25px",
                    textAlign: "center",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <div
                    style={{
                      display: "inline-block",
                      padding: "12px 25px",
                      background: "rgba(255,255,255,0.2)",
                      border: "2px solid rgba(255,255,255,0.3)",
                      borderRadius: "8px",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <p
                      style={{
                        color: "#fff",
                        margin: "0 0 10px 0",
                        fontSize: "0.9rem",
                        opacity: 0.9,
                      }}
                    >
                      Welcome back, <strong>{user.email.split("@")[0]}</strong>!
                      👋
                    </p>
                    <button
                      onClick={async () => {
                        await supabase.auth.signOut();
                        window.location.reload();
                      }}
                      style={{
                        padding: "10px 30px",
                        background: "#FFA0A0",
                        border: "3px solid #000",
                        color: "#000",
                        fontSize: "1rem",
                        fontWeight: "bold",
                        borderRadius: "5px",
                        cursor: "pointer",
                        boxShadow: "4px 4px 0px #000",
                        transition: "all 0.3s ease",
                        textTransform: "uppercase",
                        fontFamily: "monospace",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.boxShadow = "6px 6px 0px #000";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow = "4px 4px 0px #000";
                      }}
                    >
                      🚪 Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="windowTop" style={{ background: "#03274B" }}>
              <p style={{ color: "#fff" }}>Game_Selection.db</p>
              <div className="windowCircle">
                <div className="circle" style={{ background: "#fff" }}></div>
                <div className="circle" style={{ background: "#fff" }}></div>
                <div className="circle" style={{ background: "#fff" }}></div>
              </div>
            </div>

            <div className="windowContent">
              <h2
                style={{
                  fontSize: "2rem",
                  marginBottom: "20px",
                  color: "#03274B",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                🎮 CLASSIC ARCADE
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "30px",
                  marginBottom: "50px",
                }}
              >
                {games.map((game, index) => (
                  <Link
                    key={game.name}
                    to={game.path}
                    style={{ textDecoration: "none", color: "inherit" }}
                    onMouseEnter={() => setHoveredGame(game.name)}
                    onMouseLeave={() => setHoveredGame(null)}
                  >
                    <div
                      className="post"
                      style={{
                        padding: "0",
                        border: "4px solid #000",
                        boxShadow:
                          hoveredGame === game.name
                            ? "12px 12px 0px #000"
                            : "6px 6px 0px #000",
                        background: "#fff",
                        cursor: "pointer",
                        textAlign: "center",
                        transition: "all 0.3s ease",
                        transform:
                          hoveredGame === game.name
                            ? "translateY(-8px) scale(1.02)"
                            : "translateY(0) scale(1)",
                        animation: `slideIn 0.5s ease-out ${index * 0.1}s backwards`,
                        maxHeight: "none",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          background: game.color,
                          padding: "20px",
                          borderBottom: "4px solid #000",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            background: getDifficultyColor(game.difficulty),
                            border: "2px solid #000",
                            padding: "4px 8px",
                            fontSize: "0.7rem",
                            fontWeight: "bold",
                            borderRadius: "3px",
                          }}
                        >
                          {game.difficulty}
                        </div>
                        <img
                          src={game.image}
                          alt={game.name}
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "contain",
                            filter: "drop-shadow(4px 4px 0px #000)",
                            transition: "transform 0.3s ease",
                            transform:
                              hoveredGame === game.name
                                ? "scale(1.1) rotate(5deg)"
                                : "scale(1)",
                          }}
                        />
                      </div>

                      <div style={{ padding: "20px" }}>
                        <h3
                          style={{
                            fontSize: "1.8rem",
                            marginBottom: "10px",
                            color: "#000",
                            fontWeight: "bold",
                          }}
                        >
                          {game.name}
                        </h3>

                        <p
                          style={{
                            fontSize: "1rem",
                            margin: "10px 0",
                            color: "#666",
                            lineHeight: "1.4",
                          }}
                        >
                          {game.description}
                        </p>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                            marginTop: "15px",
                            paddingTop: "15px",
                            borderTop: "2px dashed #000",
                          }}
                        >
                          <div style={{ textAlign: "center" }}>
                            <div style={{ fontSize: "0.75rem", opacity: 0.7 }}>
                              GENRE
                            </div>
                            <div
                              style={{
                                fontSize: "0.85rem",
                                fontWeight: "bold",
                              }}
                            >
                              {game.genre}
                            </div>
                          </div>
                          <div style={{ textAlign: "center" }}>
                            <div style={{ fontSize: "0.75rem", opacity: 0.7 }}>
                              PLAYERS
                            </div>
                            <div
                              style={{
                                fontSize: "0.85rem",
                                fontWeight: "bold",
                              }}
                            >
                              {game.players}
                            </div>
                          </div>
                        </div>

                        {user && (
                          <div
                            style={{
                              marginTop: "15px",
                              padding: "12px",
                              background: "#50B6D1",
                              border: "2px solid #000",
                              borderRadius: "5px",
                            }}
                          >
                            <div
                              style={{
                                fontSize: "0.8rem",
                                fontWeight: "bold",
                                marginBottom: "5px",
                              }}
                            >
                              🏆 YOUR HIGH SCORE
                            </div>
                            <div
                              style={{
                                fontSize: "1.8rem",
                                fontWeight: "bold",
                                color: "#000",
                              }}
                            >
                              {loading ? "..." : highScores[game.scoreKey] || 0}
                            </div>
                          </div>
                        )}

                        <div
                          style={{
                            marginTop: "20px",
                            padding: "15px",
                            background:
                              hoveredGame === game.name ? "#000" : "#03274B",
                            color: "#fff",
                            fontWeight: "bold",
                            fontSize: "1.1rem",
                            border: "3px solid #000",
                            transition: "all 0.3s ease",
                            textTransform: "uppercase",
                            letterSpacing: "2px",
                          }}
                        >
                          {hoveredGame === game.name
                            ? "▶ PLAY NOW!"
                            : "CLICK TO PLAY"}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <h2
                style={{
                  fontSize: "2rem",
                  marginTop: "50px",
                  marginBottom: "20px",
                  color: "#ff0000",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                🎰 CASINO GAMES
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "30px",
                  marginBottom: "40px",
                }}
              >
                {casinoGames.map((game, index) => (
                  <Link
                    key={game.name}
                    to={game.path}
                    style={{ textDecoration: "none", color: "inherit" }}
                    onMouseEnter={() => setHoveredGame(game.name)}
                    onMouseLeave={() => setHoveredGame(null)}
                  >
                    <div
                      className="post"
                      style={{
                        padding: "0",
                        border: "4px solid #000",
                        boxShadow:
                          hoveredGame === game.name
                            ? "12px 12px 0px #000"
                            : "6px 6px 0px #000",
                        background: "#fff",
                        cursor: "pointer",
                        textAlign: "center",
                        transition: "all 0.3s ease",
                        transform:
                          hoveredGame === game.name
                            ? "translateY(-8px) scale(1.02)"
                            : "translateY(0) scale(1)",
                        animation: `slideIn 0.5s ease-out ${index * 0.1}s backwards`,
                        maxHeight: "none",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          background: game.color,
                          padding: "20px",
                          borderBottom: "4px solid #000",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            background: getDifficultyColor(game.difficulty),
                            border: "2px solid #000",
                            padding: "4px 8px",
                            fontSize: "0.7rem",
                            fontWeight: "bold",
                            borderRadius: "3px",
                            color: "#000",
                          }}
                        >
                          {game.difficulty}
                        </div>
                        <img
                          src={game.image}
                          alt={game.name}
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "contain",
                            filter: "drop-shadow(4px 4px 0px #000)",
                            transition: "transform 0.3s ease",
                            transform:
                              hoveredGame === game.name
                                ? "scale(1.1) rotate(-5deg)"
                                : "scale(1)",
                          }}
                        />
                      </div>

                      <div style={{ padding: "20px" }}>
                        <h3
                          style={{
                            fontSize: "1.8rem",
                            marginBottom: "10px",
                            color: "#000",
                            fontWeight: "bold",
                          }}
                        >
                          {game.name}
                        </h3>

                        <p
                          style={{
                            fontSize: "1rem",
                            margin: "10px 0",
                            color: "#666",
                            lineHeight: "1.4",
                          }}
                        >
                          {game.description}
                        </p>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                            marginTop: "15px",
                            paddingTop: "15px",
                            borderTop: "2px dashed #000",
                          }}
                        >
                          <div style={{ textAlign: "center" }}>
                            <div style={{ fontSize: "0.75rem", opacity: 0.7 }}>
                              GENRE
                            </div>
                            <div
                              style={{
                                fontSize: "0.85rem",
                                fontWeight: "bold",
                              }}
                            >
                              {game.genre}
                            </div>
                          </div>
                          <div style={{ textAlign: "center" }}>
                            <div style={{ fontSize: "0.75rem", opacity: 0.7 }}>
                              PLAYERS
                            </div>
                            <div
                              style={{
                                fontSize: "0.85rem",
                                fontWeight: "bold",
                              }}
                            >
                              {game.players}
                            </div>
                          </div>
                        </div>

                        {user && (
                          <div
                            style={{
                              marginTop: "15px",
                              padding: "12px",
                              background: "#FFD700",
                              border: "2px solid #000",
                              borderRadius: "5px",
                            }}
                          >
                            <div
                              style={{
                                fontSize: "0.8rem",
                                fontWeight: "bold",
                                marginBottom: "5px",
                                color: "#000",
                              }}
                            >
                              💰 HIGHEST CREDITS
                            </div>
                            <div
                              style={{
                                fontSize: "1.8rem",
                                fontWeight: "bold",
                                color: "#000",
                              }}
                            >
                              {loading ? "..." : highScores[game.scoreKey] || 0}
                            </div>
                          </div>
                        )}

                        <div
                          style={{
                            marginTop: "20px",
                            padding: "15px",
                            background:
                              hoveredGame === game.name ? "#000" : game.color,
                            color: hoveredGame === game.name ? "#fff" : "#000",
                            fontWeight: "bold",
                            fontSize: "1.1rem",
                            border: "3px solid #000",
                            transition: "all 0.3s ease",
                            textTransform: "uppercase",
                            letterSpacing: "2px",
                          }}
                        >
                          {hoveredGame === game.name
                            ? "▶ PLAY NOW!"
                            : "CLICK TO PLAY"}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="separate" style={{ marginTop: "30px" }}>
                <h2
                  style={{
                    fontSize: "1.8rem",
                    marginBottom: "20px",
                    color: "#03274B",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  🎮 ARCADE TIPS & INFO
                </h2>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "20px",
                  }}
                >
                  <div
                    className="post"
                    style={{
                      maxHeight: "none",
                      background:
                        "linear-gradient(135deg, #50B6D1 0%, #89A8C7 100%)",
                      border: "3px solid #000",
                      color: "#000",
                    }}
                  >
                    <h3 style={{ fontSize: "1.3rem", marginBottom: "10px" }}>
                      🎯 Controls
                    </h3>
                    <p style={{ fontSize: "0.95rem", lineHeight: "1.6" }}>
                      All games work on desktop and mobile. Use arrow keys on
                      desktop, touch controls on mobile devices.
                    </p>
                  </div>
                  <div
                    className="post"
                    style={{
                      maxHeight: "none",
                      background:
                        "linear-gradient(135deg, #FFA0A0 0%, #FFD3B6 100%)",
                      border: "3px solid #000",
                      color: "#000",
                    }}
                  >
                    <h3 style={{ fontSize: "1.3rem", marginBottom: "10px" }}>
                      💾 Saves
                    </h3>
                    <p style={{ fontSize: "0.95rem", lineHeight: "1.6" }}>
                      {user
                        ? "Your high scores are saved to your account!"
                        : "Login to save your high scores!"}
                    </p>
                  </div>
                  <div
                    className="post"
                    style={{
                      maxHeight: "none",
                      background:
                        "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
                      border: "3px solid #000",
                      color: "#000",
                    }}
                  >
                    <h3 style={{ fontSize: "1.3rem", marginBottom: "10px" }}>
                      🏆 Challenge
                    </h3>
                    <p style={{ fontSize: "0.95rem", lineHeight: "1.6" }}>
                      Beat your personal best! Games get harder as you score
                      more points.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer
        style={{ textAlign: "center", padding: "40px", marginTop: "20px" }}
      >
        <p style={{ color: "#565f89", fontSize: "1rem", marginBottom: "10px" }}>
          🕹️ Retro Arcade - {games.length + casinoGames.length} Games Available
        </p>

        <p
          style={{
            color: "#565f89",
            fontSize: "0.8rem",
            marginTop: "10px",
            opacity: 0.6,
          }}
        >
          More games coming soon!
        </p>
      </footer>
    </div>
  );
}

export default GamesPage;

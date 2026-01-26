import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Roulette() {
  const [credits, setCredits] = useState(100);
  const [bet, setBet] = useState(10);
  const [selectedColor, setSelectedColor] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("Place your bet on Red or Black!");
  const [totalWon, setTotalWon] = useState(0);
  const [history, setHistory] = useState([]);

  const redNumbers = [
    1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
  ];

  useEffect(() => {
    const saved = localStorage.getItem("rouletteCredits");
    if (saved) setCredits(parseInt(saved));

    const savedWon = localStorage.getItem("rouletteTotalWon");
    if (savedWon) setTotalWon(parseInt(savedWon));
  }, []);

  const spinWheel = () => {
    if (!selectedColor || spinning || credits < bet) return;

    setSpinning(true);
    setCredits(credits - bet);
    setMessage("Spinning the wheel...");
    setResult(null);

    // Animate wheel spinning
    let spinCount = 0;
    const spinInterval = setInterval(() => {
      const randomNum = Math.floor(Math.random() * 37); // 0-36
      setResult(randomNum);
      spinCount++;

      if (spinCount >= 20) {
        clearInterval(spinInterval);

        // Final result
        const finalNumber = Math.floor(Math.random() * 37);
        setResult(finalNumber);

        let resultColor;
        if (finalNumber === 0) {
          resultColor = "green";
        } else if (redNumbers.includes(finalNumber)) {
          resultColor = "red";
        } else {
          resultColor = "black";
        }

        let winAmount = 0;
        let msg = "";

        if (finalNumber === 0) {
          msg = "🟢 Green 0! House wins!";
        } else if (resultColor === selectedColor) {
          winAmount = bet * 2;
          msg = `🎉 You won ${winAmount} credits!`;
          const newCredits = credits - bet + winAmount;
          setCredits(newCredits);
          localStorage.setItem("rouletteCredits", newCredits.toString());

          const newTotal = totalWon + winAmount;
          setTotalWon(newTotal);
          localStorage.setItem("rouletteTotalWon", newTotal.toString());
        } else {
          msg = `😢 ${resultColor === "red" ? "Red" : "Black"} ${finalNumber}. You lost!`;
        }

        setMessage(msg);
        setHistory([
          { number: finalNumber, color: resultColor },
          ...history.slice(0, 9),
        ]);
        setSpinning(false);
        setSelectedColor(null);
      }
    }, 100);
  };

  const getNumberColor = (num) => {
    if (num === 0) return "#00AA00";
    return redNumbers.includes(num) ? "#FF0000" : "#000000";
  };

  const resetCredits = () => {
    setCredits(100);
    localStorage.setItem("rouletteCredits", "100");
    setMessage("Credits reset to 100!");
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
            Casino_Games.exe
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
              <p style={{ color: "#fff" }}>ROULETTE_GAME.bin</p>
              <div className="windowCircle">
                <div className="circle" style={{ background: "#fff" }}></div>
                <div className="circle" style={{ background: "#fff" }}></div>
                <div className="circle" style={{ background: "#fff" }}></div>
              </div>
            </div>

            <div className="windowContent" style={{ textAlign: "center" }}>
              <h1
                style={{
                  marginBottom: "20px",
                  fontSize: "2rem",
                  color: "#03274B",
                }}
              >
                🎡 ROULETTE
              </h1>
              <p
                style={{
                  color: "#03274B",
                  fontSize: "1.1rem",
                  marginBottom: "20px",
                  fontWeight: "bold",
                }}
              >
                Red or Black?
              </p>

              {/* Stats */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                  gap: "15px",
                  marginBottom: "30px",
                }}
              >
                <div
                  style={{
                    padding: "15px",
                    background: "#50B6D1",
                    border: "2px solid #000",
                    boxShadow: "4px 4px 0px #000",
                  }}
                >
                  <div style={{ fontSize: "0.9rem", fontWeight: "bold" }}>
                    CREDITS
                  </div>
                  <div
                    style={{
                      fontSize: "2rem",
                      fontWeight: "bold",
                      color: "#000",
                    }}
                  >
                    {credits}
                  </div>
                </div>
                <div
                  style={{
                    padding: "15px",
                    background: "#FFA0A0",
                    border: "2px solid #000",
                    boxShadow: "4px 4px 0px #000",
                  }}
                >
                  <div style={{ fontSize: "0.9rem", fontWeight: "bold" }}>
                    BET
                  </div>
                  <div style={{ fontSize: "2rem", fontWeight: "bold" }}>
                    {bet}
                  </div>
                </div>
                <div
                  style={{
                    padding: "15px",
                    background: "#89A8C7",
                    border: "2px solid #000",
                    boxShadow: "4px 4px 0px #000",
                  }}
                >
                  <div style={{ fontSize: "0.9rem", fontWeight: "bold" }}>
                    TOTAL WON
                  </div>
                  <div
                    style={{
                      fontSize: "2rem",
                      fontWeight: "bold",
                      color: "#000",
                    }}
                  >
                    {totalWon}
                  </div>
                </div>
              </div>

              {/* Wheel Result */}
              <div
                style={{
                  background: "#cfd3da",
                  border: "4px solid #000",
                  borderRadius: "50%",
                  width: "200px",
                  height: "200px",
                  margin: "0 auto 30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "8px 8px 0px #000",
                  animation: spinning
                    ? "spinWheel 0.2s linear infinite"
                    : "none",
                }}
              >
                <div
                  style={{
                    background:
                      result !== null ? getNumberColor(result) : "#e1e2e7",
                    border: "3px solid #000",
                    borderRadius: "50%",
                    width: "140px",
                    height: "140px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "4rem",
                    fontWeight: "bold",
                    color: "#fff",
                    boxShadow: "inset 4px 4px 8px rgba(0,0,0,0.3)",
                  }}
                >
                  {result !== null ? result : "?"}
                </div>
              </div>

              {/* Message */}
              <div
                style={{
                  padding: "15px",
                  background: "#03274B",
                  border: "2px solid #000",
                  borderRadius: "5px",
                  marginBottom: "30px",
                  boxShadow: "4px 4px 0px #000",
                }}
              >
                <p
                  style={{
                    color: "#50B6D1",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    margin: 0,
                  }}
                >
                  {message}
                </p>
              </div>

              {/* Bet Amount */}
              <div style={{ marginBottom: "30px" }}>
                <p
                  style={{
                    color: "#03274B",
                    fontWeight: "bold",
                    marginBottom: "10px",
                    fontSize: "1.1rem",
                  }}
                >
                  SELECT BET:
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  {[5, 10, 25, 50, 100].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setBet(amount)}
                      disabled={spinning}
                      className="loginBtn"
                      style={{
                        background: bet === amount ? "#50B6D1" : "#fff",
                        border: "2px solid #000",
                        padding: "10px 20px",
                        fontSize: "1rem",
                        fontWeight: "bold",
                        color: "#000",
                        boxShadow: "3px 3px 0px #000",
                      }}
                    >
                      {amount}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div style={{ marginBottom: "30px" }}>
                <p
                  style={{
                    color: "#03274B",
                    fontWeight: "bold",
                    marginBottom: "15px",
                    fontSize: "1.1rem",
                  }}
                >
                  CHOOSE YOUR COLOR:
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    onClick={() => setSelectedColor("red")}
                    disabled={spinning}
                    className="loginBtn"
                    style={{
                      background: "#FF0000",
                      border:
                        selectedColor === "red"
                          ? "4px solid #000"
                          : "2px solid #000",
                      padding: "25px 40px",
                      fontSize: "1.3rem",
                      fontWeight: "bold",
                      color: "#fff",
                      cursor: spinning ? "not-allowed" : "pointer",
                      transform:
                        selectedColor === "red" ? "scale(1.05)" : "scale(1)",
                      transition: "all 0.2s",
                      boxShadow:
                        selectedColor === "red"
                          ? "6px 6px 0px #000"
                          : "4px 4px 0px #000",
                    }}
                  >
                    RED
                  </button>
                  <button
                    onClick={() => setSelectedColor("black")}
                    disabled={spinning}
                    className="loginBtn"
                    style={{
                      background: "#000",
                      border:
                        selectedColor === "black"
                          ? "4px solid #50B6D1"
                          : "2px solid #000",
                      padding: "25px 40px",
                      fontSize: "1.3rem",
                      fontWeight: "bold",
                      color: "#fff",
                      cursor: spinning ? "not-allowed" : "pointer",
                      transform:
                        selectedColor === "black" ? "scale(1.05)" : "scale(1)",
                      transition: "all 0.2s",
                      boxShadow:
                        selectedColor === "black"
                          ? "6px 6px 0px #50B6D1"
                          : "4px 4px 0px #000",
                    }}
                  >
                    BLACK
                  </button>
                </div>
              </div>

              {/* Spin Button */}
              <button
                onClick={spinWheel}
                disabled={!selectedColor || spinning || credits < bet}
                className="loginBtn"
                style={{
                  fontSize: "1.3rem",
                  padding: "15px 50px",
                  background:
                    !selectedColor || spinning || credits < bet
                      ? "#ccc"
                      : "#FFA0A0",
                  color: "#000",
                  border: "3px solid #000",
                  fontWeight: "bold",
                  cursor:
                    !selectedColor || spinning || credits < bet
                      ? "not-allowed"
                      : "pointer",
                  boxShadow: "5px 5px 0px #000",
                  marginBottom: "15px",
                }}
              >
                {spinning ? "🎡 SPINNING..." : "🎡 SPIN WHEEL"}
              </button>

              {credits < bet && (
                <div style={{ marginTop: "20px" }}>
                  <p
                    style={{
                      color: "#FFA0A0",
                      fontWeight: "bold",
                      marginBottom: "10px",
                      fontSize: "1.1rem",
                    }}
                  >
                    Not enough credits!
                  </p>
                  <button
                    onClick={resetCredits}
                    className="loginBtn"
                    style={{
                      background: "#50B6D1",
                      border: "2px solid #000",
                      padding: "10px 20px",
                      boxShadow: "3px 3px 0px #000",
                    }}
                  >
                    Reset Credits
                  </button>
                </div>
              )}

              {/* History */}
              {history.length > 0 && (
                <div className="separate" style={{ marginTop: "30px" }}>
                  <h2
                    style={{
                      fontSize: "1.5rem",
                      marginBottom: "15px",
                      color: "#03274B",
                    }}
                  >
                    📊 RECENT SPINS
                  </h2>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      justifyContent: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    {history.map((h, idx) => (
                      <div
                        key={idx}
                        style={{
                          width: "50px",
                          height: "50px",
                          background: getNumberColor(h.number),
                          border: "2px solid #000",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#fff",
                          fontWeight: "bold",
                          fontSize: "1.2rem",
                          boxShadow: "3px 3px 0px #000",
                        }}
                      >
                        {h.number}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Rules */}
              <div className="separate" style={{ textAlign: "left" }}>
                <h2
                  style={{
                    fontSize: "1.5rem",
                    marginBottom: "15px",
                    color: "#03274B",
                  }}
                >
                  📜 RULES
                </h2>
                <div className="post" style={{ maxHeight: "none" }}>
                  <ul
                    style={{
                      fontSize: "1rem",
                      lineHeight: "1.8",
                      listStylePosition: "inside",
                    }}
                  >
                    <li>Choose Red or Black</li>
                    <li>Select your bet amount</li>
                    <li>Click "Spin Wheel"</li>
                    <li>Win double your bet if you guess correctly!</li>
                    <li>Green 0 means house wins</li>
                    <li>Red numbers: {redNumbers.slice(0, 5).join(", ")}...</li>
                    <li>Black numbers: All others except 0</li>
                  </ul>
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
          🎡 Roulette - Play Responsibly!
        </p>
      </footer>

      <style>{`
        @keyframes spinWheel {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default Roulette;

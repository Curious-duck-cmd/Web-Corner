import React, { useState, useEffect } from "react";
import { useF1Data } from "../hooks/useF1Data";
import { StartLights, RaceSimulator } from "../components/F1Simulator";

function F1Page() {
  const {
    nextRace,
    lastUpdated,
    loading,
    error,
    isLive,
    refreshData,
  } = useF1Data();
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      if (nextRace) {
        const now = new Date();
        const difference = new Date(nextRace.date) - now;

        if (difference > 0) {
          setTimeLeft({
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
          });
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [nextRace]);

  return (
    <div className="portfolio-wrapper">
      <header>
        <div className="windowTop" style={{ background: "#50B6D1" }}>
          <p>
            <span style={{ fontSize: "1.2rem", marginRight: "8px" }}>🏎️</span>
            F1_Command_Center.exe
          </p>
          <div className="windowCircle">
            <div className="circle" style={{ background: "#FFA0A0" }}></div>
            <div className="circle" style={{ background: "#FFA0A0" }}></div>
            <div className="circle" style={{ background: "#FFA0A0" }}></div>
          </div>
        </div>
        <div className="windowContent header-main">
          <nav>
            <a href="/">
              <img
                src="/image/home.png"
                className="nav-icon"
                alt=""
                style={{ width: "20px", marginRight: "8px" }}
              />{" "}
              <span>Home</span>
            </a>
            <a href="/blog">
              <img
                src="/image/life.png"
                className="nav-icon"
                alt=""
                style={{ width: "20px", marginRight: "8px" }}
              />{" "}
              <span>Life Blog</span>
            </a>
            <a href="/projects">
              <img
                src="/image/made.png"
                className="nav-icon"
                alt=""
                style={{ width: "20px", marginRight: "8px" }}
              />{" "}
              <span>Stuff I Made</span>
            </a>
            <a href="/portfolio">
              <img
                src="/image/me.png"
                className="nav-icon"
                alt=""
                style={{ width: "20px", marginRight: "8px" }}
              />{" "}
              <span>Who Am I</span>
            </a>
            <a href="/view-gallery">
              <img
                src="/image/frame.png"
                className="nav-icon"
                alt=""
                style={{ width: "20px", marginRight: "8px" }}
              />{" "}
              <span>Gallery</span>
            </a>
            <a href="/games">
              <img
                src="/image/joystick.png"
                className="nav-icon"
                alt=""
                style={{ width: "20px", marginRight: "8px" }}
              />{" "}
              <span>Games</span>
            </a>
            <a href="/chat">
              <img
                src="/image/babble.png"
                className="nav-icon"
                alt=""
                style={{ width: "20px", marginRight: "8px" }}
              />{" "}
              <span>Chat</span>
            </a>
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
            {/* Secret Unlocked Banner */}
            <div
              style={{
                background: isLive
                  ? "#50B6D1"
                  : error
                    ? "#FFA0A0"
                    : loading
                      ? "#FFD700"
                      : "#cfd3da",
                border: "4px solid #000",
                padding: "20px",
                marginBottom: "30px",
                textAlign: "center",
                boxShadow: "8px 8px 0px #000",
                animation: "slideIn 0.5s ease-out",
              }}
            >
              <h1
                style={{
                  fontSize: "2.5rem",
                  margin: "0 0 10px 0",
                  color: "#000",
                }}
              >
                {isLive
                  ? "🏁 2026 F1 ZONE 🏁"
                  : error
                    ? "❌ ERROR"
                    : loading
                      ? "⏳ LOADING"
                      : "🏁 SECRET F1 ZONE 🏁"}
              </h1>
              <p
                style={{
                  fontSize: "1.1rem",
                  margin: 0,
                  color: "#000",
                  opacity: 0.8,
                }}
              >
                {isLive
                  ? "2026 Season Data Connected - Real-time Updates Active"
                  : error
                    ? `Error: ${error}`
                    : loading
                      ? "Loading 2026 F1 data..."
                      : "You found hidden Formula 1 command center!"}
              </p>
              {error && (
                <button
                  onClick={refreshData}
                  style={{
                    marginTop: "15px",
                    padding: "10px 20px",
                    background: "#fff",
                    border: "2px solid #000",
                    borderRadius: "5px",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  🔄 Retry
                </button>
              )}
            </div>

            {/* Next Race Countdown */}
            <div className="windowTop" style={{ background: "#03274B" }}>
              <p style={{ color: "#fff" }}>⏱️ Next Race Countdown</p>
              <div className="windowCircle">
                <div className="circle" style={{ background: "#fff" }}></div>
                <div className="circle" style={{ background: "#fff" }}></div>
                <div className="circle" style={{ background: "#fff" }}></div>
              </div>
            </div>
            <div className="windowContent" style={{ marginBottom: "30px" }}>
              <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <h2
                  style={{
                    fontSize: "2rem",
                    color: "#03274B",
                    marginBottom: "10px",
                  }}
                >
                  {nextRace?.race || "Loading..."}
                </h2>
                <p style={{ fontSize: "1.2rem", color: "#666" }}>
                  📍 {nextRace?.circuit || "Loading..."} • Round{" "}
                  {nextRace?.round || 1}/24
                </p>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                  gap: "15px",
                  marginBottom: "20px",
                }}
              >
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <div
                    key={unit}
                    style={{
                      background: "#cfd3da",
                      border: "2px solid #000",
                      padding: "15px",
                      textAlign: "center",
                      boxShadow: "4px 4px 0px #000",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "2.5rem",
                        fontWeight: "bold",
                        color: "#50B6D1",
                      }}
                    >
                      {value || 0}
                    </div>
                    <div
                      style={{
                        fontSize: "0.9rem",
                        textTransform: "uppercase",
                        fontWeight: "bold",
                      }}
                    >
                      {unit}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Start Lights */}
            <div className="windowTop" style={{ background: "#FFA0A0" }}>
              <p>🚦 Start Lights Reflex Test</p>
              <div className="windowCircle">
                <div className="circle" style={{ background: "#03274B" }}></div>
                <div className="circle" style={{ background: "#03274B" }}></div>
                <div className="circle" style={{ background: "#03274B" }}></div>
              </div>
            </div>
            <div className="windowContent" style={{ marginBottom: "30px" }}>
              <p
                style={{
                  textAlign: "center",
                  fontSize: "0.95rem",
                  opacity: 0.75,
                  marginTop: 0,
                }}
              >
                Five red lights, then they're out. Hit SPACE or tap the instant
                they go dark to clock your reaction time. Move early and the
                stewards hand you a jump start.
              </p>
              <StartLights />
            </div>

            {/* Race Simulator */}
            <div className="windowTop" style={{ background: "#89A8C7" }}>
              <p>🎛️ Strategy Simulator</p>
              <div className="windowCircle">
                <div className="circle" style={{ background: "#FFD700" }}></div>
                <div className="circle" style={{ background: "#FFD700" }}></div>
                <div className="circle" style={{ background: "#FFD700" }}></div>
              </div>
            </div>
            <div className="windowContent">
              <h2
                style={{
                  fontSize: "1.8rem",
                  marginTop: 0,
                  marginBottom: "6px",
                  color: "#03274B",
                }}
              >
                📊 Run the 58 laps
              </h2>
              <p
                style={{
                  fontSize: "0.95rem",
                  opacity: 0.75,
                  marginTop: 0,
                  marginBottom: "20px",
                }}
              >
                Pick a compound, set your fuel and aggression, then let the
                strategy room do the maths. Every run is different.
              </p>
              <RaceSimulator
                raceName={nextRace?.race}
                circuit={nextRace?.circuit}
              />
            </div>
          </section>
        </div>
      </main>

      <footer
        style={{ textAlign: "center", padding: "40px", marginTop: "20px" }}
      >
        <p style={{ color: "#565f89", fontSize: "0.9rem" }}>
          🏎️ F1 Command Center - Lights Out and Away We Go!
        </p>
        <p
          style={{
            color: "#565f89",
            fontSize: "0.8rem",
            marginTop: "10px",
            opacity: 0.6,
          }}
        >
          Last updated: {lastUpdated.toLocaleString()} • Konami Code Easter Egg
          • Keep this secret! 🤫
        </p>
      </footer>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default F1Page;

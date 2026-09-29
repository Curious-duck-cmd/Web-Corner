import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import VisitorCounter from "../components/VisitorCounter";
import { useF1Data } from "../hooks/useF1Data";
import TestCenteredGif from "../components/TestCenteredGif";
import "../App.css";

// Cat GIF Easter Egg Component with Cat Rain
function CatGifEasterEgg() {
  const [clicks, setClicks] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);

  const handleClick = (e) => {
    const newClicks = clicks + 1;
    setClicks(newClicks);

    if (newClicks === 3) {
      setShowAnimation(true);
      for (let i = 0; i < 30; i++) {
        setTimeout(() => {
          createFallingCat();
        }, i * 100);
      }
      setTimeout(() => {
        setShowAnimation(false);
        setClicks(0);
      }, 4000);
    }
  };

  const createFallingCat = () => {
    const cat = document.createElement("img");
    cat.src = "/image/cat.gif";
    cat.style.position = "fixed";
    cat.style.width = "100px";
    cat.style.pointerEvents = "none";
    cat.style.zIndex = "9999";
    cat.style.left = Math.random() * window.innerWidth + "px";
    cat.style.top = "-100px";
    document.body.appendChild(cat);
    const fallDuration = 2000 + Math.random() * 1000;
    const rotation = Math.random() * 720 - 360;
    cat.animate(
      [
        { transform: "translateY(0) rotate(0deg)", opacity: 1 },
        {
          transform: `translateY(${window.innerHeight + 100}px) rotate(${rotation}deg)`,
          opacity: 0.5,
        },
      ],
      { duration: fallDuration, easing: "ease-in" },
    );
    setTimeout(() => cat.remove(), fallDuration);
  };

  return (
    <>
      <img
        src="/image/cat.gif"
        id="blinkies"
        alt="cat"
        onClick={handleClick}
        style={{
          cursor: "pointer",
          transition: "transform 0.3s ease",
          transform: showAnimation ? "scale(1.2) rotate(360deg)" : "scale(1)",
          position: "relative",
        }}
        title={
          clicks > 0 && clicks < 3
            ? `Click ${3 - clicks} more times for a surprise!`
            : "Click me!"
        }
      />
      {showAnimation && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "4rem",
            animation: "bounce 0.5s infinite",
            pointerEvents: "none",
            zIndex: 9998,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "2rem",
              marginTop: "10px",
              color: "#50B6D1",
              fontWeight: "bold",
            }}
          >
            CAT RAIN!
          </div>
        </div>
      )}
    </>
  );
}

// F1 Easter Egg Component
function F1EasterEgg() {
  const [f1Clicks, setF1Clicks] = useState(0);
  const [showF1Effect, setShowF1Effect] = useState(false);
  const [showGif, setShowGif] = useState(false);

  const [konamiCode, setKonamiCode] = useState([]);

  const targetKonami = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];

  useEffect(() => {
    const handleKonami = (e) => {
      const newCode = [...konamiCode, e.key].slice(-10);
      setKonamiCode(newCode);
      if (JSON.stringify(newCode) === JSON.stringify(targetKonami)) {
        unlockF1Page();
        setKonamiCode([]);
      }

      // Close GIF modal with ESC key
      if (e.key === "Escape" && showGif) {
        setShowGif(false);
      }
    };
    window.addEventListener("keydown", handleKonami);
    return () => window.removeEventListener("keydown", handleKonami);
  }, [konamiCode, showGif]);

  const unlockF1Page = () => {
    // Trigger the same effect as 5 clicks
    triggerF1Effect();
  };

  const handleF1Click = () => {
    const newClicks = f1Clicks + 1;
    setF1Clicks(newClicks);

    if (newClicks === 5) {
      triggerF1Effect();
      setF1Clicks(0);
    }
  };

  const triggerF1Effect = () => {
    // Show GIF modal
    setShowGif(true);

    // Play F1 sound
    const audio = new Audio();
    audio.src =
      "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZUQ0PVqzn77BfGgs+ltj1xnMpBSp+zPLaizsIHGe57OihUg4NTqPj8bllHAU2jdXzyH0vBSZ1xe/akjwIF2S46+mnVBELTKXh8rpmHgU0i9Lzyn0wBSh5ye3dkj0JGmm97OmjUQ4OUanl8r1oHwc3kdXzy3wxByp9y+/blEAKG2y/7eykUhAOVK3o8sBoIAg5kdX0zH4yByx/zPDbl0MLHW/B7+6lVBIOV7Do8sJrIgo7ldj0zYE0CCuBzu/dnEQMHnLC8O+nVhQPWLLq88RsIws9mNr1z4I2Cix+0PDfnkYOIHTF8/CpWRUSXbXs9MduJAw+m9z1z4Q4DC6Czu7hokYOI3XF8/GrWhUUYLjv9clwJQ5Am9310oU6DS+Dz+7hpUgPJHfH9POsXBYVYrnx9sl0JxBAnd70z4Y7DjGDzuzipUkPJXnI9PSuXRcXZbv09Mt2KRFBn+D10Ig8DzKEz+zjp0oQJnrI9fSwXxgZZ731z4g+DzOF0OzlqU0RKHvJ9feyYRgaab749Mt5KhJCoeH114k/DzSG0evmqk4SIHrJ9vKxYhkaarnz9M16KRNCo+P224tADzSH0ezmq08SIXzK9vKzYxocb7z09cx8LBRDpOT33I1BETaI0uzprFETI33M9/O0ZRwdb7309s+ALRVEpuX33I5CEjaJ0u3qrlIUJH7N+PS2aB0ecL3199CBLxZFqOb43ZBDEjaK0+7rr1MVJYDPefS4ax4fc8H29dGEMBdGqef43pJEEjeL1O/ssVQWJoHQ+fS6bSAhdMH39tOGMxlHrOj64JNFEjiM1fDttVYXJ4LR+vW8byEidcP49tSINRpIrej645RGEjmM1vHvuFgYKIPT+/W+cSMjdsT59tWKOBtKr+r755ZHEzqN1/LwulkaKYTV/PXAcyUkd8X69teNOhxLsev76JhJFDuO2PTxvVwbKoXW/PXDdSYld8b79tiPPB1Ms+356plKFTyP2fTzwF4cK4bY/fXFdygmeM==";
    audio.play().catch(() => {});

    // Create lots of F1 emojis falling
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        createFallingF1();
      }, i * 100);
    }

    setShowF1Effect(true);
    setTimeout(() => {
      setShowF1Effect(false);
      // Auto-close GIF modal after 2 seconds
      setShowGif(false);
      // Navigate to F1 page
      window.location.href = "/f1";
    }, 2000); // Show for only 2 seconds
  };

  const createFallingF1 = () => {
    const f1 = document.createElement("div");
    f1.textContent = "🏎️";
    f1.style.position = "fixed";
    f1.style.fontSize = "60px";
    f1.style.pointerEvents = "none";
    f1.style.zIndex = "9999";
    f1.style.left = Math.random() * window.innerWidth + "px";
    f1.style.top = "-100px";
    document.body.appendChild(f1);
    const fallDuration = 1500 + Math.random() * 1000;
    f1.animate(
      [
        { transform: "translateY(0) translateX(0)", opacity: 1 },
        {
          transform: `translateY(${window.innerHeight + 100}px) translateX(${(Math.random() - 0.5) * 200}px)`,
          opacity: 0.5,
        },
      ],
      { duration: fallDuration, easing: "ease-in" },
    );
    setTimeout(() => f1.remove(), fallDuration);
  };

  return (
    <>
      <div
        onClick={handleF1Click}
        style={{
          position: "fixed",
          bottom: "10px",
          left: "10px",
          width: "30px",
          height: "30px",
          cursor: "pointer",
          opacity: 0.1,
          transition: "opacity 0.3s",
          fontSize: "20px",
          zIndex: 1000,
        }}
        onMouseEnter={(e) => (e.target.style.opacity = 0.3)}
        onMouseLeave={(e) => (e.target.style.opacity = 0.1)}
        title={`${f1Clicks}/5 - Click for F1 surprise!`}
      >
        🏁
      </div>

      <TestCenteredGif show={showGif} onClose={() => setShowGif(false)} />

      {showF1Effect && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10000,
            textAlign: "center",
            pointerEvents: "none",
            animation: "f1Flash 0.5s ease-out",
          }}
        >
          <div
            style={{
              fontSize: "5rem",
              marginBottom: "20px",
              animation: "checkeredWave 1s infinite",
            }}
          >
            🏎️
          </div>
          <div
            style={{
              fontSize: "2.5rem",
              color: "#FF0000",
              fontWeight: "bold",
              textShadow: "3px 3px 0px #000",
              fontFamily: "monospace",
            }}
          ></div>
        </div>
      )}
      <style>{`
        @keyframes f1Flash { 0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); } 100% { opacity: 0; transform: translate(-50%, -50%) scale(1); } }
        @keyframes checkeredWave { 0%, 100% { transform: rotate(-10deg); } 50% { transform: rotate(10deg); } }
        @keyframes speedBoost { 0% { filter: blur(0px); } 50% { filter: blur(3px); transform: scale(1.02); } 100% { filter: blur(0px); } }
        @keyframes drsGlow { 0%, 100% { box-shadow: 4px 4px 0px #000, 0 0 10px #00FF00; } 50% { box-shadow: 4px 4px 0px #000, 0 0 20px #00FF00; } }
      `}</style>
    </>
  );
}

// F1 Race Calendar Component
function F1RaceCalendar() {
  const { nextRace, seasonProgress, completedRaces } = useF1Data();
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
    <div style={{ marginBottom: "30px" }}>
      <div
        style={{
          padding: "20px",
          background: "#cfd3da",
          border: "2px solid #000",
          borderRadius: "5px",
          boxShadow: "4px 4px 0px #000",
        }}
      >
        <h2
          style={{
            fontSize: "1.8rem",
            marginBottom: "15px",
            textAlign: "center",
            color: "#03274B",
          }}
        >
          NEXT RACE
        </h2>
        <div style={{ textAlign: "center", marginBottom: "15px" }}>
          <div
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "5px",
              color: "#000",
            }}
          >
            {nextRace?.race || "Loading..."}
          </div>
          <div style={{ fontSize: "1.1rem", color: "#333" }}>
            📍 {nextRace?.circuit || "Loading..."}
          </div>
          <div style={{ fontSize: "0.9rem", marginTop: "5px", opacity: 0.7 }}>
            Round {nextRace?.round || 1} of 24 • 11 Teams • 22 Drivers
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div
              key={unit}
              style={{
                background: "#fff",
                border: "2px solid #000",
                padding: "10px",
                borderRadius: "5px",
                textAlign: "center",
                boxShadow: "3px 3px 0px #000",
              }}
            >
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  color: "#50B6D1",
                }}
              >
                {value || 0}
              </div>
              <div
                style={{
                  fontSize: "0.8rem",
                  textTransform: "uppercase",
                  color: "#000",
                  opacity: 0.7,
                }}
              >
                {unit}
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "20px" }}>
          <div
            style={{
              background: "#fff",
              height: "30px",
              borderRadius: "5px",
              overflow: "hidden",
              border: "2px solid #000",
              boxShadow: "3px 3px 0px #000",
            }}
          >
            <div
              style={{
                background: "#0600EF",
                height: "100%",
                width: `${seasonProgress}%`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                color: "#fff",
                transition: "width 0.5s ease",
                fontSize: "0.9rem",
              }}
            >
              {seasonProgress}%
            </div>
          </div>
          <p
            style={{
              fontSize: "0.8rem",
              textAlign: "center",
              marginTop: "5px",
              opacity: 0.7,
              color: "#000",
            }}
          >
            Season Progress ({seasonProgress}% complete • {completedRaces}/24
            races)
          </p>
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  const [isLoginOpen, setLoginOpen] = useState(false);

  return (
    <div className="portfolio-wrapper">
      <F1EasterEgg />
      <header>
        <div className="windowTop">
          <p>
            <img
              src="/image/Map_Pin_Grub.png"
              style={{
                width: "20px",
                verticalAlign: "middle",
                marginRight: "8px",
              }}
              alt="icon"
            />
            Darshan's_Web.exe
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
        <div className="container">
          <div className="sidecontent">
            <div className="windowTop">
              <p>About me</p>
              <div className="windowCircle">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
              </div>
            </div>
            <div className="windowContent">
              <h1>Darshan, student trying everything ...</h1>
              <img
                src="/image/Untitled.png"
                style={{ width: "100%", maxWidth: "275px", margin: "15px 0" }}
                alt="Darshan"
              />
              <p>
                <b>&gt;&gt; Class: </b>Student, Gamer{" "}
              </p>
              <p>
                <b>&gt;&gt; Level: </b>99
              </p>
              <p>
                <b>&gt;&gt; Special Abilities: </b>gaming, drawing, writing{" "}
              </p>

              {/* --- NEW SECTION: SKILL INVENTORY --- */}
              <div
                style={{
                  marginTop: "20px",
                  marginBottom: "20px",
                  padding: "15px",
                  border: "2px dashed #000",
                  background: "rgba(255, 255, 255, 0.2)",
                  borderRadius: "4px",
                }}
              >
                <h2
                  style={{
                    fontSize: "1.1rem",
                    marginBottom: "10px",
                    color: "#03274B",
                  }}
                >
                  🎒 SKILL INVENTORY
                </h2>
                <ul
                  style={{
                    listStyleType: "none",
                    padding: 0,
                    margin: 0,
                    fontSize: "0.9rem",
                  }}
                >
                  {[
                    {
                      text: "ZED - +50 Debugging",
                      icon: "🗡️",
                      hint: "Legendary Weapon of Code",
                    },
                    {
                      text: "Gaming PC - +100 Stealth",
                      icon: "🛡️",
                      hint: "Epic Gaming Rig",
                    },
                    {
                      text: "Sketchbook - Level 5 Artist",
                      icon: "📜",
                      hint: "Rare Creative Item",
                    },
                    {
                      text: "React - +30 Logic",
                      icon: "🧪",
                      hint: "Magic Framework",
                    },
                    {
                      text: "Coffee - Haste Buff",
                      icon: "⚡",
                      hint: "Consumable: Speed Boost",
                    },
                    {
                      text: "F1 Map - Max Speed",
                      icon: "🗺️",
                      hint: "Treasure Map: Racing Edition",
                    },
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="loot-item"
                      style={{ marginBottom: "10px", padding: "5px" }}
                    >
                      <span style={{ marginRight: "8px" }}>{item.icon}</span>
                      <span className="loot-text" style={{ cursor: "default" }}>
                        {item.text}
                      </span>
                      <div className="loot-hint">{item.hint}</div>
                    </li>
                  ))}
                </ul>
              </div>

              <br />
              <CatGifEasterEgg />
              <p>
                I am someone who loves to learn and try new things. Come follow
                me on my side quests!
              </p>

              {/* --- NEW SECTION: TROPHY ROOM --- */}
              <div
                style={{
                  marginTop: "25px",
                  padding: "15px",
                  border: "2px dashed #000",
                  background: "rgba(255, 255, 255, 0.2)",
                  borderRadius: "4px",
                }}
              >
                <h2
                  style={{
                    fontSize: "1.1rem",
                    marginBottom: "10px",
                    color: "#03274B",
                  }}
                >
                  🏆 RECENT LOOT (Digital Garden)
                </h2>
                <ul
                  style={{
                    listStyleType: "none",
                    padding: 0,
                    margin: 0,
                    fontSize: "0.9rem",
                  }}
                >
                  {[
                    {
                      text: "Finished 30-day drawing challenge",
                      hint: "Unlocked 'Consistent Artist' perk!",
                    },
                    {
                      text: "Finally beat Elden Ring",
                      hint: "Patience +100 / Sanity -5",
                    },
                    {
                      text: "Solved complex  bug",
                      hint: "Effect: 'Simply Lovely' mood boost",
                    },
                    {
                      text: "Speedran Hollow Knight",
                      hint: "Effect: Ego Boosted",
                    },
                  ].map((loot, i) => (
                    <li
                      key={i}
                      className="loot-item"
                      style={{ marginBottom: "10px", padding: "5px" }}
                    >
                      <span style={{ marginRight: "8px" }}>⚜️</span>
                      <span className="loot-text" style={{ cursor: "default" }}>
                        {loot.text}
                      </span>
                      <div className="loot-hint">{loot.hint}</div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="separate">
                <h1>Other places to find me</h1>
                <ul>
                  <li>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://www.instagram.com/da.rs.han"
                    >
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="http://www.youtube.com/@xosmic5787"
                    >
                      YouTube Channel
                    </a>
                  </li>
                </ul>
              </div>

              <div
                className="separate"
                style={{
                  marginTop: "30px",
                  padding: "15px",
                  border: "2px dashed #000",
                  background: "rgba(255, 255, 255, 0.2)",
                  borderRadius: "4px",
                }}
              >
                <h2
                  style={{
                    fontSize: "1.1rem",
                    marginBottom: "10px",
                    color: "#03274B",
                  }}
                >
                  🏎️ MY F1 CORNER
                </h2>
                <ul
                  style={{
                    listStyleType: "none",
                    padding: 0,
                    margin: 0,
                    fontSize: "0.9rem",
                  }}
                >
                  {[
                    {
                      text: "Favorite Driver: Max Verstappen",
                      icon: "🏎️",
                      hint: "3x World Champion",
                    },
                    {
                      text: "Favorite Team: Red Bull Racing",
                      icon: "🏁",
                      hint: "Energy Drink Powered",
                    },
                    {
                      text: "Watching Since: 2020",
                      icon: "📅",
                      hint: "The Covid Era Beginnings",
                    },
                    {
                      text: "Favorite Circuit: Spa-Francorchamps",
                      icon: "🏔️",
                      hint: "Eau Rouge is simply lovely",
                    },
                    {
                      text: "Dream: Attend Monaco GP",
                      icon: "🌟",
                      hint: "Ultimate F1 Experience",
                    },
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="loot-item"
                      style={{ marginBottom: "10px", padding: "5px" }}
                    >
                      <span style={{ marginRight: "8px" }}>{item.icon}</span>
                      <span className="loot-text" style={{ cursor: "default" }}>
                        {item.text}
                      </span>
                      <div className="loot-hint">{item.hint}</div>
                    </li>
                  ))}
                </ul>
                <p
                  style={{
                    fontSize: "0.85rem",
                    marginTop: "15px",
                    opacity: 0.7,
                    fontStyle: "italic",
                    textAlign: "center",
                    borderTop: "1px dashed #000",
                    paddingTop: "10px",
                  }}
                >
                  "Simply lovely" - The drive for perfection
                </p>
              </div>
            </div>
          </div>

          <div className="content">
            <div className="windowTop">
              <p>Overview</p>
              <div className="windowCircle">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
              </div>
            </div>
            <div className="windowContent">
              <div className="post">
                <h1>What's going on here??</h1>
                <p>
                  Heyo! Welcome to my website! I decided to create a personal
                  corner in the web for myself to make something fun without the
                  constraints of social media algorithms.
                </p>
                <p>
                  <b>
                    <i>
                      In other words... It's my little space of creativity on
                      the big interweb!
                    </i>
                  </b>
                </p>
              </div>
              <div className="post">
                <h1>Current Focus:</h1>
                <p>Python & API Integration</p>
                <div className="progressBar">
                  {/* You can update this percentage as you clear the milestones below */}
                  <div
                    className="progress"
                    style={{ width: "45%", backgroundColor: "#3776ab" }}
                  >
                    <p>45% - Intermediate</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="windowTop" style={{ marginTop: "20px" }}>
              <p>Fun things</p>
              <div className="windowCircle">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
              </div>
            </div>
            <div className="windowContent">
              {/* Currently Reading Section */}
              <div
                style={{
                  marginBottom: "30px",
                  padding: "20px",
                  background: "#50B6D1",
                  border: "2px solid #000",
                  boxShadow: "6px 6px 0px #000",
                }}
              >
                <h2
                  style={{
                    marginTop: 0,
                    marginBottom: "15px",
                    fontSize: "1.5rem",
                  }}
                >
                  📖 Currently Reading
                </h2>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                    flexWrap: "wrap",
                  }}
                >
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.goodreads.com/book/show/32277642-the-king-in-yellow"
                    style={{ flexShrink: 0 }}
                  >
                    <div
                      className="book-card"
                      style={{
                        width: "140px",
                        aspectRatio: "2/3",
                        background: "#fff",
                        border: "2px solid #000",
                        padding: "8px",
                        boxShadow: "5px 5px 0px #000",
                      }}
                    >
                      <img
                        src="https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1742853462i/32277642.jpg"
                        alt="The King in Yellow"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          border: "1px solid #000",
                        }}
                      />
                    </div>
                  </a>
                  <div style={{ flex: 1, minWidth: "200px" }}>
                    <h3 style={{ margin: "0 0 10px 0", fontSize: "1.3rem" }}>
                      The King in Yellow
                    </h3>
                    <p
                      style={{
                        margin: "0 0 8px 0",
                        fontSize: "1rem",
                        opacity: 0.8,
                      }}
                    >
                      <b>by</b> Robert W. Chambers
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.95rem",
                        lineHeight: "1.5",
                      }}
                    >
                      A collection of horror stories featuring mysterious
                      references to a forbidden play. Exploring themes of
                      madness, art, and the supernatural.
                    </p>
                  </div>
                </div>
              </div>

              <h1>Darshan's Book Shelf</h1>
              <div className="bookshelf">
                <div className="book-item">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.goodreads.com/book/show/36278177-record-of-a-spaceborn-few"
                  >
                    <div className="book-card">
                      <img
                        src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1626027310i/36278177.jpg"
                        alt="Spaceborn Few"
                      />
                    </div>
                  </a>
                  <p className="book-title">Spaceborn Few</p>
                </div>

                <div className="book-item">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.goodreads.com/book/show/40189879-the-traitor-baru-cormorant"
                  >
                    <div className="book-card">
                      <img
                        src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1526945167i/40189879.jpg"
                        alt="Traitor Baru"
                      />
                    </div>
                  </a>
                  <p className="book-title">Traitor Baru</p>
                </div>

                <div className="book-item">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.goodreads.com/book/show/32277642-the-king-in-yellow"
                  >
                    <div className="book-card">
                      <img
                        src="https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1742853462i/32277642.jpg"
                        alt="King in Yellow"
                      />
                    </div>
                  </a>
                  <p className="book-title">King in Yellow</p>
                </div>
              </div>

              <div className="separate">
                <h1>Darshan's Go-To Music</h1>
                <div className="separate">
                  <iframe
                    data-testid="embed-iframe"
                    style={{
                      borderRadius: "12px",
                      width: "100%",
                      maxWidth: "100%",
                    }}
                    src="https://open.spotify.com/embed/artist/3yY2gUcIsjMr8hjo51PoJ8?utm_source=generator&theme=0"
                    width="100%"
                    height="352"
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* F1 2026 Season Container */}
            <div
              className="windowTop"
              style={{ marginTop: "20px", background: "#50B6D1" }}
            >
              <p>🏁 F1 2026 Season</p>
              <div className="windowCircle">
                <div className="circle" style={{ background: "#FFA0A0" }}></div>
                <div className="circle" style={{ background: "#FFA0A0" }}></div>
                <div className="circle" style={{ background: "#FFA0A0" }}></div>
              </div>
            </div>
            <div className="windowContent">
              <F1RaceCalendar />
              <div
                style={{
                  padding: "15px",
                  background: "#03274B",
                  border: "2px solid #000",
                  borderRadius: "5px",
                  marginTop: "15px",
                }}
              >
                <p
                  style={{
                    color: "#50B6D1",
                    fontSize: "0.9rem",
                    margin: 0,
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  💡 TIP: Try the Konami code (↑↑↓↓←→←→BA) for a surprise!
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <VisitorCounter />

          <p style={{ fontSize: "1.5rem", margin: 0 }}>
            <i>"At the crossroads, don't turn left"</i>
          </p>

          <button
            onClick={() => setLoginOpen(true)}
            className="project-link"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "5px 10px",
              textDecoration: "none",
              fontStyle: "normal",
            }}
          >
            ADMIN LOGIN 🔒
          </button>
        </div>
      </footer>

      {/* LOGIN POPUP */}
      {isLoginOpen && (
        <div className="overlay">
          <div
            className="popupContainer"
            style={{ width: "90%", maxWidth: "450px" }}
          >
            <div className="windowTop" style={{ background: "#f96a6a" }}>
              <p style={{ color: "white" }}>
                <span style={{ marginRight: "8px" }}>⚠️</span>
                System_Alert.exe
              </p>
              <div className="windowCircle">
                <div className="circle" style={{ background: "#fff" }}></div>
                <div className="circle" style={{ background: "#fff" }}></div>
                <div className="circle" style={{ background: "#fff" }}></div>
              </div>
            </div>

            <div className="windowContent popupBox">
              <div
                className="warning-blink"
                style={{ fontSize: "4rem", marginBottom: "10px" }}
              >
                ⚠️
              </div>

              <h1 style={{ fontSize: "1.8rem", color: "#000" }}>
                RESTRICTED ACCESS
              </h1>

              <div
                className="admin-status-box"
                style={{
                  background: "#03274B",
                  border: "2px solid #000",
                  padding: "15px",
                  margin: "20px 0",
                  boxShadow: "4px 4px 0px #000",
                }}
              >
                <p style={{ color: "#50B6D1", margin: 0, fontWeight: "bold" }}>
                  [ ! ADMIN PRIVILEGES REQUIRED ! ]
                </p>
              </div>

              <p style={{ fontSize: "1.1rem", marginBottom: "30px" }}>
                This sector is encrypted. Please provide credentials or return
                to the terminal.
              </p>

              <div
                className="popupButtons"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                <Link
                  to="/AdminLogin"
                  onClick={() => setLoginOpen(false)}
                  className="nav-a-style"
                  style={{
                    background: "#50B6D1",
                    color: "#000",
                    padding: "15px",
                    border: "2px solid #000",
                    boxShadow: "6px 6px 0px #000",
                    textDecoration: "none",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  PROCEED TO LOGIN
                </Link>
                <button
                  onClick={() => setLoginOpen(false)}
                  className="loginBtn cancel"
                  style={{
                    width: "100%",
                    padding: "12px",
                    fontSize: "1rem",
                    backgroundColor: "#FFA0A0",
                  }}
                >
                  BACK TO SAFETY
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;

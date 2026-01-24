import React, { useState, useEffect } from "react";

function F1Page() {
  const [selectedTab, setSelectedTab] = useState("standings");
  const [nextRace, setNextRace] = useState({
    name: "Australian Grand Prix",
    circuit: "Albert Park Circuit",
    date: new Date("2026-03-06"),
    round: 1,
    country: "Australia",
  });
  const [timeLeft, setTimeLeft] = useState({});

  // Driver Standings Data (2026 Season - Pre-season)
  const driverStandings = [
    {
      pos: 1,
      driver: "Max Verstappen",
      team: "Red Bull Racing",
      points: 0,
      wins: 0,
      color: "#0600EF",
    },
    {
      pos: 2,
      driver: "Lando Norris",
      team: "McLaren",
      points: 0,
      wins: 0,
      color: "#FF8700",
    },
    {
      pos: 3,
      driver: "Charles Leclerc",
      team: "Ferrari",
      points: 0,
      wins: 0,
      color: "#DC0000",
    },
    {
      pos: 4,
      driver: "Lewis Hamilton",
      team: "Ferrari",
      points: 0,
      wins: 0,
      color: "#DC0000",
    },
    {
      pos: 5,
      driver: "Oscar Piastri",
      team: "McLaren",
      points: 0,
      wins: 0,
      color: "#FF8700",
    },
    {
      pos: 6,
      driver: "George Russell",
      team: "Mercedes",
      points: 0,
      wins: 0,
      color: "#00D2BE",
    },
    {
      pos: 7,
      driver: "Kimi Antonelli",
      team: "Mercedes",
      points: 0,
      wins: 0,
      color: "#00D2BE",
    },
    {
      pos: 8,
      driver: "Carlos Sainz",
      team: "Williams",
      points: 0,
      wins: 0,
      color: "#005AFF",
    },
    {
      pos: 9,
      driver: "Fernando Alonso",
      team: "Aston Martin",
      points: 0,
      wins: 0,
      color: "#006F62",
    },
    {
      pos: 10,
      driver: "Lance Stroll",
      team: "Aston Martin",
      points: 0,
      wins: 0,
      color: "#006F62",
    },
  ];

  // Constructor Standings Data (2026 Season - Pre-season)
  const constructorStandings = [
    {
      pos: 1,
      team: "Red Bull Racing",
      points: 0,
      wins: 0,
      color: "#0600EF",
    },
    { pos: 2, team: "McLaren", points: 0, wins: 0, color: "#FF8700" },
    { pos: 3, team: "Ferrari", points: 0, wins: 0, color: "#DC0000" },
    { pos: 4, team: "Mercedes", points: 0, wins: 0, color: "#00D2BE" },
    { pos: 5, team: "Aston Martin", points: 0, wins: 0, color: "#006F62" },
    { pos: 6, team: "Alpine", points: 0, wins: 0, color: "#0090FF" },
    { pos: 7, team: "Williams", points: 0, wins: 0, color: "#005AFF" },
    { pos: 8, team: "Racing Bulls", points: 0, wins: 0, color: "#2B4562" },
    { pos: 9, team: "Audi", points: 0, wins: 0, color: "#C1002B" },
    { pos: 10, team: "Haas", points: 0, wins: 0, color: "#FFFFFF" },
  ];

  // 2026 Race Calendar
  const raceCalendar = [
    {
      round: 1,
      race: "Australian Grand Prix",
      circuit: "Albert Park Circuit",
      date: "Mar 6-8",
      country: "🇦🇺",
    },
    {
      round: 2,
      race: "Chinese Grand Prix",
      circuit: "Shanghai International Circuit",
      date: "Mar 13-15",
      country: "🇨🇳",
    },
    {
      round: 3,
      race: "Japanese Grand Prix",
      circuit: "Suzuka Circuit",
      date: "Mar 27-29",
      country: "🇯🇵",
    },
    {
      round: 4,
      race: "Bahrain Grand Prix",
      circuit: "Bahrain International Circuit",
      date: "Apr 10-12",
      country: "🇧🇭",
    },
    {
      round: 5,
      race: "Saudi Arabian Grand Prix",
      circuit: "Jeddah Corniche Circuit",
      date: "Apr 17-19",
      country: "🇸🇦",
    },
    {
      round: 6,
      race: "Miami Grand Prix",
      circuit: "Miami International Autodrome",
      date: "May 1-3",
      country: "🇺🇸",
    },
    {
      round: 7,
      race: "Canadian Grand Prix",
      circuit: "Circuit Gilles Villeneuve",
      date: "May 22-24",
      country: "🇨🇦",
    },
    {
      round: 8,
      race: "Monaco Grand Prix",
      circuit: "Circuit de Monaco",
      date: "Jun 5-7",
      country: "🇲🇨",
    },
    {
      round: 9,
      race: "Spanish Grand Prix",
      circuit: "Circuit de Barcelona-Catalunya",
      date: "Jun 12-14",
      country: "🇪🇸",
    },
    {
      round: 10,
      race: "Austrian Grand Prix",
      circuit: "Red Bull Ring",
      date: "Jun 26-28",
      country: "🇦🇹",
    },
    {
      round: 11,
      race: "British Grand Prix",
      circuit: "Silverstone Circuit",
      date: "Jul 3-5",
      country: "🇬🇧",
    },
    {
      round: 12,
      race: "Belgian Grand Prix",
      circuit: "Circuit de Spa-Francorchamps",
      date: "Jul 17-19",
      country: "🇧🇪",
    },
    {
      round: 13,
      race: "Hungarian Grand Prix",
      circuit: "Hungaroring",
      date: "Jul 24-26",
      country: "🇭🇺",
    },
    {
      round: 14,
      race: "Dutch Grand Prix",
      circuit: "Circuit Zandvoort",
      date: "Aug 21-23",
      country: "🇳🇱",
    },
    {
      round: 15,
      race: "Italian Grand Prix",
      circuit: "Autodromo Nazionale di Monza",
      date: "Sep 4-6",
      country: "🇮🇹",
    },
    {
      round: 16,
      race: "Spanish Grand Prix",
      circuit: "Circuit de Madrid",
      date: "Sep 11-13",
      country: "🇪🇸",
    },
    {
      round: 17,
      race: "Azerbaijan Grand Prix",
      circuit: "Baku City Circuit",
      date: "Sep 24-26",
      country: "🇦🇿",
    },
    {
      round: 18,
      race: "Singapore Grand Prix",
      circuit: "Marina Bay Street Circuit",
      date: "Oct 9-11",
      country: "🇸🇬",
    },
    {
      round: 19,
      race: "United States Grand Prix",
      circuit: "Circuit of the Americas",
      date: "Oct 23-25",
      country: "🇺🇸",
    },
    {
      round: 20,
      race: "Mexico City Grand Prix",
      circuit: "Autódromo Hermanos Rodríguez",
      date: "Oct 30-Nov 1",
      country: "🇲🇽",
    },
    {
      round: 21,
      race: "Brazilian Grand Prix",
      circuit: "Autódromo José Carlos Pace",
      date: "Nov 6-8",
      country: "🇧🇷",
    },
    {
      round: 22,
      race: "Las Vegas Grand Prix",
      circuit: "Las Vegas Street Circuit",
      date: "Nov 19-21",
      country: "🇺🇸",
    },
    {
      round: 23,
      race: "Qatar Grand Prix",
      circuit: "Losail International Circuit",
      date: "Nov 27-29",
      country: "🇶🇦",
    },
    {
      round: 24,
      race: "Abu Dhabi Grand Prix",
      circuit: "Yas Marina Circuit",
      date: "Dec 4-6",
      country: "🇦🇪",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = nextRace.date - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
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
                background: "#50B6D1",
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
                🏁 SECRET F1 ZONE UNLOCKED! 🏁
              </h1>
              <p
                style={{
                  fontSize: "1.1rem",
                  margin: 0,
                  color: "#000",
                  opacity: 0.8,
                }}
              >
                You found the hidden Formula 1 command center!
              </p>
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
                  {nextRace.name}
                </h2>
                <p style={{ fontSize: "1.2rem", color: "#666" }}>
                  📍 {nextRace.circuit} • Round {nextRace.round}/24
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

            {/* Tab Navigation */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginBottom: "20px",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => setSelectedTab("standings")}
                className="loginBtn"
                style={{
                  background: selectedTab === "standings" ? "#50B6D1" : "#fff",
                  padding: "12px 24px",
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
              >
                🏆 STANDINGS
              </button>
              <button
                onClick={() => setSelectedTab("calendar")}
                className="loginBtn"
                style={{
                  background: selectedTab === "calendar" ? "#50B6D1" : "#fff",
                  padding: "12px 24px",
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
              >
                📅 CALENDAR
              </button>
            </div>

            {/* Driver Standings Tab */}
            {selectedTab === "standings" && (
              <>
                <div className="windowTop" style={{ background: "#FFA0A0" }}>
                  <p>🏆 2026 Championship Standings</p>
                  <div className="windowCircle">
                    <div
                      className="circle"
                      style={{ background: "#89A8C7" }}
                    ></div>
                    <div
                      className="circle"
                      style={{ background: "#89A8C7" }}
                    ></div>
                    <div
                      className="circle"
                      style={{ background: "#89A8C7" }}
                    ></div>
                  </div>
                </div>
                <div className="windowContent" style={{ marginBottom: "30px" }}>
                  <h2
                    style={{
                      fontSize: "1.8rem",
                      marginBottom: "20px",
                      color: "#03274B",
                    }}
                  >
                    Driver Standings
                  </h2>
                  <div style={{ overflowX: "auto" }}>
                    <table
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        fontSize: "1rem",
                      }}
                    >
                      <thead>
                        <tr
                          style={{
                            background: "#cfd3da",
                            borderBottom: "3px solid #000",
                          }}
                        >
                          <th
                            style={{
                              padding: "12px",
                              textAlign: "left",
                              border: "2px solid #000",
                            }}
                          >
                            Pos
                          </th>
                          <th
                            style={{
                              padding: "12px",
                              textAlign: "left",
                              border: "2px solid #000",
                            }}
                          >
                            Driver
                          </th>
                          <th
                            style={{
                              padding: "12px",
                              textAlign: "left",
                              border: "2px solid #000",
                            }}
                          >
                            Team
                          </th>
                          <th
                            style={{
                              padding: "12px",
                              textAlign: "center",
                              border: "2px solid #000",
                            }}
                          >
                            Points
                          </th>
                          <th
                            style={{
                              padding: "12px",
                              textAlign: "center",
                              border: "2px solid #000",
                            }}
                          >
                            Wins
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {driverStandings.map((driver) => (
                          <tr
                            key={driver.pos}
                            style={{
                              background:
                                driver.pos === 1
                                  ? "#FFD700"
                                  : driver.pos % 2 === 0
                                    ? "#fff"
                                    : "#f5f5f5",
                              transition: "all 0.2s ease",
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.background = "#50B6D1")
                            }
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background =
                                driver.pos === 1
                                  ? "#FFD700"
                                  : driver.pos % 2 === 0
                                    ? "#fff"
                                    : "#f5f5f5";
                            }}
                          >
                            <td
                              style={{
                                padding: "12px",
                                fontWeight: "bold",
                                border: "1px solid #000",
                              }}
                            >
                              {driver.pos}
                            </td>
                            <td
                              style={{
                                padding: "12px",
                                fontWeight: "bold",
                                border: "1px solid #000",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                }}
                              >
                                <div
                                  style={{
                                    width: "4px",
                                    height: "30px",
                                    background: driver.color,
                                    border: "1px solid #000",
                                  }}
                                ></div>
                                {driver.driver}
                              </div>
                            </td>
                            <td
                              style={{
                                padding: "12px",
                                border: "1px solid #000",
                              }}
                            >
                              {driver.team}
                            </td>
                            <td
                              style={{
                                padding: "12px",
                                textAlign: "center",
                                fontWeight: "bold",
                                border: "1px solid #000",
                              }}
                            >
                              {driver.points}
                            </td>
                            <td
                              style={{
                                padding: "12px",
                                textAlign: "center",
                                border: "1px solid #000",
                              }}
                            >
                              {driver.wins}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Constructor Standings */}
                <div className="windowTop" style={{ background: "#89A8C7" }}>
                  <p>🏗️ Constructor Standings</p>
                  <div className="windowCircle">
                    <div
                      className="circle"
                      style={{ background: "#FFA0A0" }}
                    ></div>
                    <div
                      className="circle"
                      style={{ background: "#FFA0A0" }}
                    ></div>
                    <div
                      className="circle"
                      style={{ background: "#FFA0A0" }}
                    ></div>
                  </div>
                </div>
                <div className="windowContent">
                  <div style={{ overflowX: "auto" }}>
                    <table
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        fontSize: "1rem",
                      }}
                    >
                      <thead>
                        <tr
                          style={{
                            background: "#cfd3da",
                            borderBottom: "3px solid #000",
                          }}
                        >
                          <th
                            style={{
                              padding: "12px",
                              textAlign: "left",
                              border: "2px solid #000",
                            }}
                          >
                            Pos
                          </th>
                          <th
                            style={{
                              padding: "12px",
                              textAlign: "left",
                              border: "2px solid #000",
                            }}
                          >
                            Team
                          </th>
                          <th
                            style={{
                              padding: "12px",
                              textAlign: "center",
                              border: "2px solid #000",
                            }}
                          >
                            Points
                          </th>
                          <th
                            style={{
                              padding: "12px",
                              textAlign: "center",
                              border: "2px solid #000",
                            }}
                          >
                            Wins
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {constructorStandings.map((team) => (
                          <tr
                            key={team.pos}
                            style={{
                              background:
                                team.pos === 1
                                  ? "#FFD700"
                                  : team.pos % 2 === 0
                                    ? "#fff"
                                    : "#f5f5f5",
                              transition: "all 0.2s ease",
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.background = "#50B6D1")
                            }
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background =
                                team.pos === 1
                                  ? "#FFD700"
                                  : team.pos % 2 === 0
                                    ? "#fff"
                                    : "#f5f5f5";
                            }}
                          >
                            <td
                              style={{
                                padding: "12px",
                                fontWeight: "bold",
                                border: "1px solid #000",
                              }}
                            >
                              {team.pos}
                            </td>
                            <td
                              style={{
                                padding: "12px",
                                fontWeight: "bold",
                                border: "1px solid #000",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                }}
                              >
                                <div
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    background: team.color,
                                    border: "2px solid #000",
                                  }}
                                ></div>
                                {team.team}
                              </div>
                            </td>
                            <td
                              style={{
                                padding: "12px",
                                textAlign: "center",
                                fontWeight: "bold",
                                border: "1px solid #000",
                              }}
                            >
                              {team.points}
                            </td>
                            <td
                              style={{
                                padding: "12px",
                                textAlign: "center",
                                border: "1px solid #000",
                              }}
                            >
                              {team.wins}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {/* Race Calendar Tab */}
            {selectedTab === "calendar" && (
              <>
                <div className="windowTop" style={{ background: "#03274B" }}>
                  <p style={{ color: "#fff" }}>📅 2026 F1 Race Calendar</p>
                  <div className="windowCircle">
                    <div
                      className="circle"
                      style={{ background: "#fff" }}
                    ></div>
                    <div
                      className="circle"
                      style={{ background: "#fff" }}
                    ></div>
                    <div
                      className="circle"
                      style={{ background: "#fff" }}
                    ></div>
                  </div>
                </div>
                <div className="windowContent">
                  <h2
                    style={{
                      fontSize: "1.8rem",
                      marginBottom: "20px",
                      color: "#03274B",
                    }}
                  >
                    24 Races • March - December 2026
                  </h2>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(300px, 1fr))",
                      gap: "20px",
                    }}
                  >
                    {raceCalendar.map((race) => (
                      <div
                        key={race.round}
                        className="post"
style={{
                           padding: "15px",
                           background: race.round === 1 ? "#50B6D1" : "#cfd3da",
                           border: "2px solid #000",
                           boxShadow: "4px 4px 0px #000",
                           transition: "all 0.3s ease",
                           maxHeight: "none",
                         }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-5px)";
                          e.currentTarget.style.boxShadow = "6px 6px 0px #000";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow = "4px 4px 0px #000";
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "10px",
                          }}
                        >
                          <span style={{ fontSize: "2rem" }}>
                            {race.country}
                          </span>
                          <span
                            style={{
                              background: "#000",
                              color: "#fff",
                              padding: "4px 12px",
                              border: "2px solid #000",
                              fontWeight: "bold",
                              fontSize: "0.9rem",
                            }}
                          >
                            R{race.round}
                          </span>
                        </div>
                        <h3
                          style={{
                            fontSize: "1.3rem",
                            marginBottom: "8px",
                            color: "#000",
                          }}
                        >
                          {race.race}
                        </h3>
                        <p
                          style={{
                            fontSize: "0.95rem",
                            marginBottom: "8px",
                            opacity: 0.8,
                          }}
                        >
                          {race.circuit}
                        </p>
                        <p
                          style={{
                            fontSize: "1.1rem",
                            fontWeight: "bold",
                            color: "#000",
                          }}
                        >
                          📅 {race.date}
                        </p>
{race.round === 1 && (
                           <div
                             style={{
                               marginTop: "10px",
                               padding: "8px",
                               background: "#FFD700",
                               border: "2px solid #000",
                               textAlign: "center",
                               fontWeight: "bold",
                               fontSize: "0.9rem",
                             }}
                           >
                             🏁 NEXT RACE
                           </div>
                         )}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
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
          Konami Code Easter Egg • Keep this secret! 🤫
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

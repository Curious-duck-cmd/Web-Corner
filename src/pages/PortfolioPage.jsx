import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

const PortfolioPage = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const skills = [
    {
      category: "Frontend Development",
      items:
        "React 18, Hooks, Router, State Management, Component Architecture",
    },
    {
      category: "Backend & Database",
      items:
        "Supabase, PostgreSQL, Row Level Security, Realtime API, Cloud Storage",
    },
    {
      category: "Styling & Design",
      items:
        "CSS3, Grid, Flexbox, Animations, Responsive Design, Retro Aesthetics",
    },
    {
      category: "Game Development",
      items:
        "Canvas API, Game Loops, Collision Detection, Physics, AI Pathfinding",
    },
    {
      category: "Tools & Build",
      items: "Vite, Git, NPM, Chrome DevTools, VS Code",
    },
    {
      category: "Core Programming",
      items:
        "JavaScript ES6+, HTML5, DOM Manipulation, Async/Await, Event Handling",
    },
  ];

  const achievements = [
    {
      title: "Built Complete Portfolio Website",
      description: "20+ integrated features, 2500+ lines of code",
      date: "2026",
      icon: "🏆",
    },
    {
      title: "Developed 5 Full Games",
      description:
        "Tetris, Snake, Pong, Slots, Roulette - all with working mechanics",
      date: "2026",
      icon: "🎮",
    },
    {
      title: "Implemented Real-Time Systems",
      description: "Chat application with WebSocket connectivity",
      date: "2026",
      icon: "⚡",
    },
    {
      title: "Mastered Authentication",
      description: "Role-based access control with JWT and RLS policies",
      date: "2026",
      icon: "🔒",
    },
    {
      title: "Cloud Storage Integration",
      description: "Image gallery with Supabase storage and lightbox viewer",
      date: "2026",
      icon: "☁️",
    },
    {
      title: "Mobile-First Development",
      description: "Fully responsive across all devices and screen sizes",
      date: "2026",
      icon: "📱",
    },
  ];

  return (
    <div className="portfolio-wrapper">
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
            Darshan_Gyawali_Profile_v3.exe
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
          {/* Profile Card Sidebar */}
          <aside className="sidecontent">
            <div className="windowTop" style={{ background: "#FFA0A0" }}>
              <p>Profile_Card.sys</p>
              <div className="windowCircle">
                <div className="circle" style={{ background: "#89A8C7" }}></div>
                <div className="circle" style={{ background: "#89A8C7" }}></div>
                <div className="circle" style={{ background: "#89A8C7" }}></div>
              </div>
            </div>
            <div className="windowContent">
              <img
                src="/image/self.jpg"
                style={{
                  width: "100%",
                  borderBottom: "2px solid #000",
                  background: "white",
                  transition: "transform 0.3s ease",
                }}
                alt="Darshan Gyawali"
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.02)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              />
              <div className="separate">
                <p>
                  <b>NAME:</b> Darshan Gyawali
                </p>
                <p>
                  <b>ROLE:</b> Full-Stack Developer
                </p>
                <p>
                  <b>FOCUS:</b> React & Web Development
                </p>
                <p>
                  <b>LOC:</b> Imadol, Lalitpur, Nepal 🇳🇵
                </p>
                <p>
                  <b>STACK:</b> React, Supabase, Canvas API
                </p>
                <p
                  style={{
                    marginTop: "15px",
                    fontSize: "0.9rem",
                    opacity: 0.7,
                  }}
                >
                  <b>STATUS:</b>{" "}
                  <span style={{ color: "#50B6D1" }}>
                    ● Building & Learning
                  </span>
                </p>
              </div>

              {/* Stats Section */}
              <div
                className="separate"
                style={{
                  marginTop: "25px",
                  padding: "15px",
                  background: "rgba(80, 182, 209, 0.1)",
                  border: "2px solid #50B6D1",
                  borderRadius: "5px",
                }}
              >
                <h2
                  style={{
                    fontSize: "1rem",
                    marginBottom: "10px",
                    color: "#03274B",
                  }}
                >
                  📊 Quick Stats
                </h2>
                <div style={{ fontSize: "0.85rem", lineHeight: "1.8" }}>
                  <p>
                    • <b>20</b> Projects Completed
                  </p>
                  <p>
                    • <b>5</b> Games Developed
                  </p>
                  <p>
                    • <b>2500+</b> Lines of Code
                  </p>
                  <p>
                    • <b>8+</b> Technologies Mastered
                  </p>
                  <p>
                    • <b>100%</b> Responsive Design
                  </p>
                </div>
              </div>

              {/* Quick Links Section */}
              <div className="separate" style={{ marginTop: "30px" }}>
                <h2 style={{ fontSize: "1.2rem", marginBottom: "10px" }}>
                  Quick Links
                </h2>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <a
                    href="https://github.com/Curious-duck-cmd"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      padding: "8px 12px",
                      background: "#fff",
                      border: "2px solid #000",
                      textDecoration: "none",
                      color: "#000",
                      fontSize: "0.9rem",
                      textAlign: "center",
                      boxShadow: "3px 3px 0px #000",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow = "5px 5px 0px #50B6D1";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "3px 3px 0px #000";
                    }}
                  >
                    💻 GitHub Portfolio
                  </a>
                  <a
                    href="mailto:darshangyawali44@gmail.com"
                    style={{
                      padding: "8px 12px",
                      background: "#fff",
                      border: "2px solid #000",
                      textDecoration: "none",
                      color: "#000",
                      fontSize: "0.9rem",
                      textAlign: "center",
                      boxShadow: "3px 3px 0px #000",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow = "5px 5px 0px #50B6D1";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "3px 3px 0px #000";
                    }}
                  >
                    ✉️ Email Me
                  </a>
                  <a
                    href="/assets/About Me.pdf"
                    download
                    style={{
                      padding: "8px 12px",
                      background: "#50B6D1",
                      border: "2px solid #000",
                      textDecoration: "none",
                      color: "#000",
                      fontSize: "0.9rem",
                      fontWeight: "bold",
                      textAlign: "center",
                      boxShadow: "3px 3px 0px #000",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow = "5px 5px 0px #FFA0A0";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "3px 3px 0px #000";
                    }}
                  >
                    📄 Download CV
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <section className="content">
            {/* About Section */}
            <div className="windowTop" style={{ background: "#03274B" }}>
              <p style={{ color: "#fff" }}>About_Developer.txt</p>
              <div className="windowCircle">
                <div className="circle" style={{ background: "#fff" }}></div>
                <div className="circle" style={{ background: "#fff" }}></div>
                <div className="circle" style={{ background: "#fff" }}></div>
              </div>
            </div>
            <div className="windowContent">
              <h2
                style={{
                  fontSize: "1.8rem",
                  marginBottom: "15px",
                  color: "#03274B",
                }}
              >
                EXECUTIVE SUMMARY
              </h2>
              <p
                style={{
                  fontSize: "1.2rem",
                  lineHeight: "1.6",
                  marginBottom: "20px",
                }}
              >
                Computer engineering student turned full-stack developer with a
                passion for creating engaging, interactive web experiences.
                Specialized in React development, game programming, real-time
                systems, and retro-inspired design.
              </p>
              <p style={{ fontSize: "1.2rem", lineHeight: "1.6" }}>
                Recently completed a comprehensive personal portfolio project
                featuring 20+ integrated features including real-time chat, game
                development, cloud storage, authentication systems, and
                responsive design. Committed to writing clean, maintainable code
                and creating delightful user experiences.
              </p>

              {/* Recent Projects Highlight */}
              <div className="separate">
                <h2
                  style={{
                    fontSize: "1.6rem",
                    marginBottom: "15px",
                    color: "#03274B",
                  }}
                >
                  🚀 RECENT PROJECT HIGHLIGHTS
                </h2>
                <div style={{ display: "grid", gap: "15px" }}>
                  <div
                    className="post"
                    style={{
                      maxHeight: "none",
                      background:
                        "linear-gradient(135deg, #50B6D1 0%, #89A8C7 100%)",
                      color: "#000",
                    }}
                  >
                    <h3 style={{ fontSize: "1.3rem", marginBottom: "8px" }}>
                      Retro Portfolio Website
                    </h3>
                    <p
                      style={{
                        fontSize: "1rem",
                        lineHeight: "1.5",
                        marginBottom: "10px",
                      }}
                    >
                      Built a fully-featured personal website with 20+
                      interconnected features, including real-time chat, 5
                      games, blog system, image gallery, and admin dashboard.
                      Features comprehensive responsive design and retro OS
                      aesthetics.
                    </p>
                    <p style={{ fontSize: "0.85rem", opacity: 0.8 }}>
                      <b>Tech:</b> React, Supabase, Canvas API, CSS3, Vite
                    </p>
                  </div>

                  <div
                    className="post"
                    style={{
                      maxHeight: "none",
                      background:
                        "linear-gradient(135deg, #FFA0A0 0%, #FFD3B6 100%)",
                      color: "#000",
                    }}
                  >
                    <h3 style={{ fontSize: "1.3rem", marginBottom: "8px" }}>
                      Game Development Suite
                    </h3>
                    <p
                      style={{
                        fontSize: "1rem",
                        lineHeight: "1.5",
                        marginBottom: "10px",
                      }}
                    >
                      Developed 5 complete games from scratch: Tetris (with
                      rotation matrices), Snake (grid system), Pong (AI
                      opponent), Slot Machine (weighted RNG), and Roulette
                      (probability system). All with smooth animations and
                      mobile controls.
                    </p>
                    <p style={{ fontSize: "0.85rem", opacity: 0.8 }}>
                      <b>Tech:</b> Canvas API, React, Game Algorithms, Physics
                    </p>
                  </div>

                  <div
                    className="post"
                    style={{
                      maxHeight: "none",
                      background:
                        "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
                      color: "#000",
                    }}
                  >
                    <h3 style={{ fontSize: "1.3rem", marginBottom: "8px" }}>
                      Real-Time Chat System
                    </h3>
                    <p
                      style={{
                        fontSize: "1rem",
                        lineHeight: "1.5",
                        marginBottom: "10px",
                      }}
                    >
                      Created a full-stack chat application with user
                      authentication, persistent message history, real-time
                      synchronization via WebSocket, and elegant UI states.
                      Includes secure session management and responsive design.
                    </p>
                    <p style={{ fontSize: "0.85rem", opacity: 0.8 }}>
                      <b>Tech:</b> Supabase Realtime, PostgreSQL, React,
                      WebSocket
                    </p>
                  </div>
                </div>
              </div>

              {/* Academic Background */}
              <div className="separate">
                <h2
                  style={{
                    fontSize: "1.6rem",
                    marginBottom: "15px",
                    color: "#03274B",
                  }}
                >
                  🎓 ACADEMIC BACKGROUND
                </h2>
                <div
                  className="post"
                  style={{ marginBottom: "20px", maxHeight: "none" }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "start",
                      flexWrap: "wrap",
                      gap: "10px",
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontSize: "1.3rem",
                          fontWeight: "bold",
                          marginBottom: "5px",
                        }}
                      >
                        Bachelor of Computer Engineering
                      </p>
                      <p style={{ fontSize: "1.1rem", color: "#666" }}>
                        Kathford International College
                      </p>
                    </div>
                    <span
                      style={{
                        background: "#50B6D1",
                        padding: "5px 10px",
                        border: "2px solid #000",
                        fontSize: "0.9rem",
                        fontWeight: "bold",
                      }}
                    >
                      2021 - Present
                    </span>
                  </div>
                </div>

                <div className="post" style={{ maxHeight: "none" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "start",
                      flexWrap: "wrap",
                      gap: "10px",
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontSize: "1.3rem",
                          fontWeight: "bold",
                          marginBottom: "5px",
                        }}
                      >
                        +2 Science (Physics, Chemistry, Mathematics)
                      </p>
                      <p style={{ fontSize: "1.1rem", color: "#666" }}>
                        Milestone International College
                      </p>
                    </div>
                    <span
                      style={{
                        background: "#FFA0A0",
                        padding: "5px 10px",
                        border: "2px solid #000",
                        fontSize: "0.9rem",
                        fontWeight: "bold",
                      }}
                    >
                      2020 - 2021
                    </span>
                  </div>
                </div>
              </div>

              {/* Technical Skills */}
              <div className="separate">
                <h2
                  style={{
                    fontSize: "1.6rem",
                    marginBottom: "15px",
                    color: "#03274B",
                  }}
                >
                  💻 TECHNICAL EXPERTISE
                </h2>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: "15px",
                  }}
                >
                  {skills.map((skill, index) => (
                    <div
                      key={index}
                      className="post"
                      style={{
                        background: hoveredSkill === index ? "#fff" : "#cfd3da",
                        transition: "all 0.3s ease",
                        transform:
                          hoveredSkill === index
                            ? "translateX(5px)"
                            : "translateX(0)",
                        cursor: "pointer",
                        maxHeight: "none",
                      }}
                      onMouseEnter={() => setHoveredSkill(index)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <p style={{ fontSize: "1.2rem", marginBottom: "5px" }}>
                        <b style={{ color: "#03274B" }}>{skill.category}:</b>
                      </p>
                      <p style={{ fontSize: "1.1rem", color: "#333" }}>
                        {skill.items}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div className="separate">
                <h2
                  style={{
                    fontSize: "1.6rem",
                    marginBottom: "15px",
                    color: "#03274B",
                  }}
                >
                  🏆 KEY ACHIEVEMENTS
                </h2>
                <div style={{ display: "grid", gap: "15px" }}>
                  {achievements.map((achievement, idx) => (
                    <div
                      key={idx}
                      className="post"
                      style={{
                        background: "#fff",
                        border: "2px solid #000",
                        padding: "20px",
                        display: "flex",
                        gap: "15px",
                        alignItems: "start",
                        transition: "all 0.3s ease",
                        maxHeight: "none",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-3px)";
                        e.currentTarget.style.boxShadow = "6px 6px 0px #50B6D1";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "4px 4px 0px #000";
                      }}
                    >
                      <div style={{ fontSize: "2rem", flexShrink: 0 }}>
                        {achievement.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3
                          style={{
                            fontSize: "1.2rem",
                            marginBottom: "5px",
                            color: "#03274B",
                          }}
                        >
                          {achievement.title}
                        </h3>
                        <p
                          style={{
                            fontSize: "1rem",
                            marginBottom: "5px",
                            color: "#333",
                          }}
                        >
                          {achievement.description}
                        </p>
                        <p style={{ fontSize: "0.85rem", opacity: 0.6 }}>
                          {achievement.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interests Section */}
              <div className="separate">
                <h2
                  style={{
                    fontSize: "1.6rem",
                    marginBottom: "15px",
                    color: "#03274B",
                  }}
                >
                  🎯 INTERESTS & PASSIONS
                </h2>
                <div className="post" style={{ maxHeight: "none" }}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(120px, 1fr))",
                      gap: "10px",
                    }}
                  >
                    {[
                      "🎮 Gaming",
                      "✏️ Writing",
                      "🎨 Drawing",
                      "📚 Reading",
                      "💻 Coding",
                      "🎵 Music",
                      "🏎️ Formula 1",
                      "🎬 Movies",
                    ].map((hobby, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: "10px",
                          background: "#fff",
                          border: "1px solid #000",
                          textAlign: "center",
                          fontSize: "0.9rem",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = "scale(1.05)";
                          e.target.style.background = "#50B6D1";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = "scale(1)";
                          e.target.style.background = "#fff";
                        }}
                      >
                        {hobby}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: "40px 20px",
          borderTop: "2px solid #50B6D1",
          marginTop: "40px",
          background: "rgba(26, 27, 38, 0.5)",
        }}
      >
        <p
          style={{ fontSize: "1.2rem", marginBottom: "20px", color: "#e1e2e7" }}
        >
          <b>Let's Connect & Build Something Amazing!</b>
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
            marginBottom: "20px",
          }}
        >
          <a
            href="https://github.com/Curious-duck-cmd"
            target="_blank"
            rel="noreferrer"
            className="project-link"
            style={{ color: "#50B6D1" }}
          >
            VIEW_GITHUB_REPOS →
          </a>

          <a
            href="mailto:darshangyawali44@gmail.com"
            className="project-link"
            style={{ color: "#50B6D1" }}
          >
            SEND_EMAIL →
          </a>

          <a
            href="/assets/About Me.pdf"
            download
            className="project-link"
            style={{ color: "#FFA0A0" }}
          >
            DOWNLOAD_CV.PDF ↓
          </a>
        </div>
        <p style={{ fontSize: "0.9rem", color: "#565f89", marginTop: "15px" }}>
          📞 Contact: 9869244510 | 📍 Location: Imadol, Lalitpur, Nepal
        </p>
        <p
          style={{
            fontSize: "0.8rem",
            color: "#565f89",
            marginTop: "10px",
            opacity: 0.6,
          }}
        >
          © 2026 Darshan Gyawali | Built with React, Supabase & Retro Vibes ✨
        </p>
      </footer>
    </div>
  );
};

export default PortfolioPage;

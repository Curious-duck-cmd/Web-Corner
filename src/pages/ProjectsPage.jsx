import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function ProjectsPage() {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const projects = [
    {
      id: 1,
      title: "Personal Retro Portfolio Website",
      tech: "React, React Router, CSS3, Responsive Design, Vite",
      description:
        "A fully-featured 90s-inspired personal portfolio website with retro OS aesthetics, window-based UI components, pixel-perfect styling, and comprehensive mobile optimization. Features animated components, Easter eggs, visitor counter, and nostalgic design elements throughout.",
      link: "/",
      tags: ["web", "design", "react", "frontend"],
      status: "Live",
      color: "#50B6D1",
    },
    {
      id: 2,
      title: "Real-Time Chat Application",
      tech: "React, Supabase, PostgreSQL, Realtime API, WebSocket",
      description:
        "Full-stack real-time messaging platform with user authentication, live message updates, persistent chat history, username identification, and responsive design. Features secure sessions, database integration, real-time synchronization, and elegant locked/unlocked states for guests vs authenticated users.",
      link: "/chat",
      tags: ["web", "backend", "database", "realtime"],
      status: "Live",
      color: "#FFA0A0",
    },
    {
      id: 3,
      title: "Cloud Image Gallery with Lightbox",
      tech: "Supabase Storage, React, RLS Policies, Modal System",
      description:
        "Dynamic media gallery with secure cloud storage, full-screen lightbox viewer with keyboard/arrow navigation, image metadata display, and real-time database syncing. Features row-level security policies, responsive grid layout, smooth transitions, and click-to-enlarge functionality.",
      link: "/view-gallery",
      tags: ["web", "backend", "cloud", "ui"],
      status: "Live",
      color: "#89A8C7",
    },
    {
      id: 4,
      title: "Personal Blog System with CMS",
      tech: "React, Supabase, CRUD Operations, Authentication, Admin Dashboard",
      description:
        "Full-featured content management system for personal blogging with protected admin dashboard, post creation/editing, mood tracking, rich text support, chronological display, and beautiful typography. Includes authentication-based access control and animated post loading.",
      link: "/blog",
      tags: ["web", "cms", "database", "auth"],
      status: "Live",
      color: "#50B6D1",
    },
    {
      id: 5,
      title: "Retro Arcade - 5 Classic Games",
      tech: "React, Canvas API, Game Logic, LocalStorage, Algorithms",
      description:
        "Collection of five fully functional retro games with individual high score tracking: Tetris (line-clearing puzzle with rotation), Snake (classic arcade growth), Pong (AI opponent), Slot Machine (weighted RNG casino), and Roulette (red/black betting). Features smooth 60fps animations, collision detection, dual control systems for desktop/mobile, and persistent scoring.",
      link: "/games",
      tags: ["web", "game", "canvas", "algorithms"],
      status: "Live",
      color: "#FFFF00",
    },
    {
      id: 6,
      title: "Tetris Game Engine",
      tech: "React, Canvas Rendering, State Management, Matrix Operations",
      description:
        "Classic Tetris implementation with piece rotation matrices, multi-directional collision detection, line clearing mechanics with animation, progressive difficulty system based on lines cleared, level progression, and smooth rendering at 60fps. Includes keyboard and touch controls with score persistence and game over states.",
      link: "/tetris",
      tags: ["game", "canvas", "algorithms"],
      status: "Live",
      color: "#50B6D1",
    },
    {
      id: 7,
      title: "Snake Game with Grid System",
      tech: "React, Canvas API, Game Loop, Collision Detection",
      description:
        "Classic snake game with grid-based movement, dynamic food generation, self-collision detection, growing snake body mechanics, and smooth animations at optimal speed. Features mobile directional buttons, desktop arrow key controls, high score tracking, and instant game over on collision.",
      link: "/snake",
      tags: ["game", "canvas", "algorithms"],
      status: "Live",
      color: "#89A8C7",
    },
    {
      id: 8,
      title: "Pong with AI Opponent",
      tech: "React, Canvas, Physics Engine, AI Pathfinding",
      description:
        "Classic Pong game with intelligent AI opponent featuring realistic ball physics, dynamic paddle collision with angle variation, scoring system with win conditions, and smooth 60 FPS rendering. Includes predictive AI movement that tracks ball position and mobile touch controls alongside keyboard input.",
      link: "/pong",
      tags: ["game", "canvas", "ai"],
      status: "Live",
      color: "#FFA0A0",
    },
    {
      id: 9,
      title: "Slot Machine Casino Game",
      tech: "React, Canvas API, Weighted RNG, Animation System",
      description:
        "Feature-rich slot machine with weighted random number generation for realistic outcomes, spinning reel animations, comprehensive paytable (50x jackpot for three 7s), credit management system, and persistent scoring. Includes bet adjustment, auto-spin animation cycles, and reset functionality.",
      link: "/slotmachine",
      tags: ["game", "canvas", "algorithms"],
      status: "Live",
      color: "#FFD700",
    },
    {
      id: 10,
      title: "Roulette Wheel Game",
      tech: "React, Canvas, Probability System, History Tracking",
      description:
        "Full roulette game with red/black betting system, complete wheel implementation (0-36 with proper color distribution), spinning wheel animation with suspense, bet history tracking, and house advantage (green 0). Features adjustable bet amounts, credit management, and win/loss calculations.",
      link: "/roulette",
      tags: ["game", "canvas", "algorithms"],
      status: "Live",
      color: "#006400",
    },
    {
      id: 11,
      title: "Admin Authentication System",
      tech: "Supabase Auth, Protected Routes, Role-Based Access Control, RLS",
      description:
        "Comprehensive security system with email-based authentication, role verification against profiles table, session management, and protected dashboard routes. Implements database-level Row Level Security (RLS) policies, secure content management, separate admin login page, and automatic redirect on unauthorized access.",
      link: "/dashboard",
      tags: ["web", "security", "auth", "backend"],
      status: "Live",
      color: "#89A8C7",
    },
    {
      id: 12,
      title: "F1 Secret Easter Egg Page",
      tech: "React, Konami Code Detection, State Management, Mock Data API",
      description:
        "Hidden Formula 1 command center unlocked via Konami code (↑↑↓↓←→←→BA) or hidden flag clicks. Features live race countdown with days/hours/minutes/seconds, full 2026 season calendar with all 24 rounds, driver championship standings with team colors, constructor standings, season progress bar, and retro sound effects on unlock.",
      link: "/f1",
      tags: ["web", "easteregg", "ui", "animation"],
      status: "Live",
      color: "#0600EF",
    },
    {
      id: 13,
      title: "Visitor Counter Component",
      tech: "React, SessionStorage, CSS Animations, LED Display",
      description:
        "Retro LED-style visitor counter with flip animations on digit changes, session-based unique visit tracking to prevent spam, cyan glow effects, 6-digit display format, and persistent storage. Features realistic retro aesthetic and smooth number transitions.",
      link: "/",
      tags: ["web", "component", "frontend"],
      status: "Live",
      color: "#50B6D1",
    },
    {
      id: 14,
      title: "Cat Rain Easter Egg",
      tech: "React, DOM Manipulation, CSS Animations, Click Detection",
      description:
        "Hidden interactive easter egg triggered by triple-clicking cat GIF. Features 30 falling animated cat images with random horizontal positioning, rotation effects, staggered timing (100ms intervals), fade-out animation, and automatic cleanup after 4 seconds with DOM element removal.",
      link: "/",
      tags: ["web", "animation", "easteregg"],
      status: "Live",
      color: "#FFA0A0",
    },
    {
      id: 15,
      title: "Responsive Navigation System",
      tech: "React Router, CSS Grid, Responsive Design, Touch Optimization",
      description:
        "Comprehensive navigation system with automatic grid layout (7 columns → 4 → 2 → 1 based on screen size), icon-based links with hover effects, smooth transitions, and consistent styling across all pages. Features automatic breakpoints using CSS Grid auto-fit and minmax for perfect responsiveness.",
      link: "/",
      tags: ["web", "frontend", "responsive"],
      status: "Live",
      color: "#89A8C7",
    },
    {
      id: 16,
      title: "Book Showcase Component",
      tech: "React, CSS Animations, External API Links, Hover Effects",
      description:
        'Interactive book display with Goodreads integration, 3D tilt effects on hover, shadow color changes, book cover images, and clickable links to full reviews. Features "Currently Reading" section with detailed book info, author display, and description excerpt.',
      link: "/",
      tags: ["web", "ui", "component"],
      status: "Live",
      color: "#50B6D1",
    },
    {
      id: 17,
      title: "Skill Inventory System",
      tech: "React, CSS Tooltips, Hover States, RPG-Style UI",
      description:
        "RPG-inspired skills display with hover tooltips showing item descriptions, rarity indicators, and stat bonuses. Features gaming-themed items (ZED editor, Gaming PC, Sketchbook) with personality-filled descriptions and smooth tooltip animations.",
      link: "/",
      tags: ["web", "ui", "design"],
      status: "Live",
      color: "#FFA0A0",
    },
    {
      id: 18,
      title: "Trophy/Loot System",
      tech: "React, Tooltip Components, Achievement Display",
      description:
        "Achievement showcase styled as game loot drops with hover-revealed tooltips. Displays recent accomplishments (30-day art challenge, Elden Ring completion, Hollow Knight speedrun) with effect descriptions and personality. Features clean list design with icons and hidden detail reveals.",
      link: "/",
      tags: ["web", "ui", "gamification"],
      status: "Live",
      color: "#89A8C7",
    },
    {
      id: 19,
      title: "F1 Countdown Widget",
      tech: "React, Date Calculations, Progress Bars, Real-Time Updates",
      description:
        "Live countdown timer to next Formula 1 race with days/hours/minutes/seconds display, animated progress bar showing season completion percentage (races completed/24), race information display, and circuit details. Updates every second with smooth transitions.",
      link: "/",
      tags: ["web", "component", "realtime"],
      status: "Live",
      color: "#0600EF",
    },
    {
      id: 20,
      title: "Modal & Overlay System",
      tech: "React, Portal Pattern, Keyboard Events, Backdrop Filter",
      description:
        "Reusable modal/overlay system with backdrop blur effects, click-outside-to-close functionality, escape key support, smooth fade-in animations, and proper z-index management. Used for admin login warnings, lightbox viewer, and future features. Prevents body scroll when active.",
      link: "/",
      tags: ["web", "component", "ui"],
      status: "Live",
      color: "#50B6D1",
    },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.tags.includes(activeFilter));

  const allTags = ["all", ...new Set(projects.flatMap((p) => p.tags))];

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
              alt="icon"
            />
            Project_Archive_v2.exe
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
          }}
        >
          <section style={{ width: "100%", maxWidth: "1200px" }}>
            <div className="windowTop" style={{ background: "#03274B" }}>
              <p style={{ color: "#fff" }}>📁 Complete_Project_Database.db</p>
              <div className="windowCircle">
                <div className="circle" style={{ background: "#fff" }}></div>
                <div className="circle" style={{ background: "#fff" }}></div>
                <div className="circle" style={{ background: "#fff" }}></div>
              </div>
            </div>

            <div
              className="windowContent"
              style={{
                background: "#e1e2e7",
                padding: "40px",
                border: "2px solid #000",
                boxShadow: "12px 12px 0px #000",
              }}
            >
              <h2 style={{ marginTop: 0, fontSize: "2rem", color: "#03274B" }}>
                💼 COMPLETE PROJECT PORTFOLIO
              </h2>
              <p
                style={{
                  fontSize: "1.2rem",
                  marginBottom: "30px",
                  color: "#333",
                }}
              >
                A comprehensive showcase of 20 interconnected features,
                components, and systems built while learning full-stack
                development. Each project demonstrates mastery of React,
                Supabase, game development, real-time systems, authentication,
                and modern web technologies.
              </p>

              {/* Filter Buttons */}
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginBottom: "30px",
                  flexWrap: "wrap",
                }}
              >
                {allTags.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    style={{
                      padding: "8px 16px",
                      background: activeFilter === filter ? "#50B6D1" : "#fff",
                      border: "2px solid #000",
                      boxShadow:
                        activeFilter === filter
                          ? "3px 3px 0px #000"
                          : "2px 2px 0px #000",
                      cursor: "pointer",
                      fontFamily: "monospace",
                      fontSize: "0.9rem",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      transition: "all 0.2s ease",
                      color: "#000",
                    }}
                    onMouseEnter={(e) => {
                      if (activeFilter !== filter) {
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.boxShadow = "4px 4px 0px #000";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeFilter !== filter) {
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow = "2px 2px 0px #000";
                      }
                    }}
                  >
                    {filter === "all" ? "🔍 All" : `#${filter}`}
                  </button>
                ))}
              </div>

              <p
                style={{
                  fontSize: "0.9rem",
                  marginBottom: "20px",
                  opacity: 0.6,
                  fontFamily: "monospace",
                }}
              >
                Showing {filteredProjects.length} project
                {filteredProjects.length !== 1 ? "s" : ""}
              </p>

              {/* Projects Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                  gap: "25px",
                }}
              >
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="post"
                    style={{
                      background:
                        hoveredProject === project.id ? "#fff" : "#cfd3da",
                      padding: "25px",
                      border: "2px solid #000",
                      boxShadow:
                        hoveredProject === project.id
                          ? "8px 8px 0px " + project.color
                          : "4px 4px 0px #000",
                      transition: "all 0.3s ease",
                      transform:
                        hoveredProject === project.id
                          ? "translateY(-5px)"
                          : "translateY(0)",
                      cursor: "pointer",
                      position: "relative",
                      overflow: "hidden",
                      maxHeight: "none",
                    }}
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "15px",
                        right: "15px",
                        padding: "4px 8px",
                        background:
                          project.status === "Live" ? "#50B6D1" : "#89A8C7",
                        border: "1px solid #000",
                        fontSize: "0.7rem",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                      }}
                    >
                      {project.status}
                    </div>

                    <h3
                      style={{
                        fontSize: "2rem",
                        color: project.color,
                        marginBottom: "10px",
                        fontFamily: "monospace",
                      }}
                    >
                      {String(project.id).padStart(2, "0")}
                    </h3>

                    <h4
                      style={{
                        fontSize: "1.4rem",
                        marginBottom: "10px",
                        color: "#000",
                      }}
                    >
                      {project.title}
                    </h4>

                    <p
                      style={{
                        fontSize: "0.9rem",
                        marginBottom: "12px",
                        color: "#666",
                      }}
                    >
                      <b>Tech:</b> {project.tech}
                    </p>

                    <p
                      style={{
                        fontSize: "1rem",
                        lineHeight: "1.5",
                        marginBottom: "15px",
                        color: "#333",
                      }}
                    >
                      {project.description}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        marginBottom: "15px",
                        flexWrap: "wrap",
                      }}
                    >
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            padding: "3px 8px",
                            background: "#e1e2e7",
                            border: "1px solid #000",
                            fontSize: "0.75rem",
                            fontFamily: "monospace",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      to={project.link}
                      className="project-link"
                      style={{ fontSize: "1rem" }}
                    >
                      VIEW_PROJECT →
                    </Link>
                  </div>
                ))}
              </div>

              {/* Stats Section */}
              <div
                className="separate"
                style={{
                  marginTop: "40px",
                  padding: "25px",
                  background: "#03274B",
                  border: "2px solid #000",
                  borderRadius: "5px",
                  boxShadow: "6px 6px 0px #000",
                }}
              >
                <h3
                  style={{
                    color: "#fff",
                    marginBottom: "20px",
                    fontSize: "1.4rem",
                  }}
                >
                  📊 PROJECT STATISTICS
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                    gap: "15px",
                  }}
                >
                  <div style={{ textAlign: "center", color: "#fff" }}>
                    <p
                      style={{
                        fontSize: "2rem",
                        fontWeight: "bold",
                        color: "#50B6D1",
                      }}
                    >
                      {projects.length}
                    </p>
                    <p style={{ fontSize: "0.9rem" }}>Total Projects</p>
                  </div>
                  <div style={{ textAlign: "center", color: "#fff" }}>
                    <p
                      style={{
                        fontSize: "2rem",
                        fontWeight: "bold",
                        color: "#50B6D1",
                      }}
                    >
                      {projects.filter((p) => p.status === "Live").length}
                    </p>
                    <p style={{ fontSize: "0.9rem" }}>Live Projects</p>
                  </div>
                  <div style={{ textAlign: "center", color: "#fff" }}>
                    <p
                      style={{
                        fontSize: "2rem",
                        fontWeight: "bold",
                        color: "#FFFF00",
                      }}
                    >
                      5
                    </p>
                    <p style={{ fontSize: "0.9rem" }}>Games Built</p>
                  </div>
                  <div style={{ textAlign: "center", color: "#fff" }}>
                    <p
                      style={{
                        fontSize: "2rem",
                        fontWeight: "bold",
                        color: "#FFA0A0",
                      }}
                    >
                      {allTags.length - 1}
                    </p>
                    <p style={{ fontSize: "0.9rem" }}>Technologies</p>
                  </div>
                  <div style={{ textAlign: "center", color: "#fff" }}>
                    <p
                      style={{
                        fontSize: "2rem",
                        fontWeight: "bold",
                        color: "#89A8C7",
                      }}
                    >
                      2500+
                    </p>
                    <p style={{ fontSize: "0.9rem" }}>Lines of Code</p>
                  </div>
                  <div style={{ textAlign: "center", color: "#fff" }}>
                    <p
                      style={{
                        fontSize: "2rem",
                        fontWeight: "bold",
                        color: "#50B6D1",
                      }}
                    >
                      3
                    </p>
                    <p style={{ fontSize: "0.9rem" }}>Easter Eggs</p>
                  </div>
                </div>
              </div>

              {/* Tech Stack Summary */}
              <div className="separate" style={{ marginTop: "30px" }}>
                <h3
                  style={{
                    fontSize: "1.4rem",
                    marginBottom: "15px",
                    color: "#03274B",
                  }}
                >
                  🛠️ COMPLETE TECHNOLOGY STACK
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "15px",
                  }}
                >
                  {[
                    { name: "Frontend", tech: "React 18, Hooks, Router" },
                    { name: "Backend", tech: "Supabase, PostgreSQL, RLS" },
                    { name: "Graphics", tech: "Canvas API, CSS Animations" },
                    { name: "Storage", tech: "localStorage, Cloud Storage" },
                    { name: "Realtime", tech: "Supabase Realtime, WebSocket" },
                    { name: "Security", tech: "JWT Auth, Role-Based Access" },
                    { name: "Build Tools", tech: "Vite, NPM, Git" },
                    { name: "Styling", tech: "CSS3, Grid, Flexbox" },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="post"
                      style={{
                        padding: "15px",
                        background: "#fff",
                        border: "2px solid #000",
                        boxShadow: "3px 3px 0px #000",
                        maxHeight: "none",
                      }}
                    >
                      <h4
                        style={{
                          fontSize: "1rem",
                          marginBottom: "5px",
                          color: "#50B6D1",
                        }}
                      >
                        {item.name}
                      </h4>
                      <p
                        style={{ fontSize: "0.9rem", margin: 0, opacity: 0.8 }}
                      >
                        {item.tech}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer
        style={{
          textAlign: "center",
          marginTop: "20px",
          paddingBottom: "30px",
        }}
      >
        <p
          style={{ color: "#565f89", fontSize: "0.9rem", marginBottom: "10px" }}
        >
          Want to collaborate on a project?
        </p>
        <a
          href="mailto:darshangyawali44@gmail.com"
          className="project-link"
          style={{ fontSize: "1.1rem" }}
        >
          GET_IN_TOUCH →
        </a>
        <p
          style={{
            color: "#565f89",
            fontSize: "0.8rem",
            marginTop: "20px",
            opacity: 0.6,
          }}
        >
          <b>System Status:</b> All 20 Projects Operational | Build 2026.01 |
          Running Smoothly
        </p>
      </footer>
    </div>
  );
}

export default ProjectsPage;

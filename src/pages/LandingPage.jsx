import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../landing.css";

const EMAIL = "darshangyawali44@gmail.com";
const GITHUB = "https://github.com/Curious-duck-cmd";
const CV = "/assets/About Me.pdf";

const SESSION = [
  { ps1: "whoami", out: "Darshan Gyawali — software developer" },
  { ps1: "location", out: "Lalitpur, Nepal · UTC+5:45" },
  { ps1: "stack --top", out: "react · supabase · postgres · canvas · vite" },
  { ps1: "focus", out: "front-end craft, back-end plumbing, and games" },
  { ps1: "status", out: "open to junior developer roles", accent: true },
  { ps1: "contact", out: EMAIL, accent: true },
];

const STACK = [
  {
    name: "Frontend",
    items: [
      "React",
      "Hooks",
      "React Router",
      "State Management",
      "Component Architecture",
      "JavaScript ES6+",
      "HTML5",
    ],
  },
  {
    name: "Backend & Data",
    items: [
      "Supabase",
      "PostgreSQL",
      "Row Level Security",
      "Realtime API",
      "Cloud Storage",
      "JWT Auth",
    ],
  },
  {
    name: "Styling & Motion",
    items: [
      "CSS3",
      "Grid",
      "Flexbox",
      "Responsive Design",
      "Animation",
      "Web Animations API",
    ],
  },
  {
    name: "Game Development",
    items: [
      "Canvas API",
      "Game Loops",
      "Collision Detection",
      "Physics",
      "AI Pathfinding",
    ],
  },
  {
    name: "Tooling",
    items: [
      "Vite",
      "Git",
      "NPM",
      "ESLint",
      "Chrome DevTools",
      "VS Code",
    ],
  },
  {
    name: "Practice",
    items: [
      "Component Reuse",
      "Responsive QA",
      "Debugging",
      "Code Review",
      "Documentation",
    ],
  },
];

const WORK = [
  {
    name: "Retro Portfolio Website",
    body: "A full personal site with twenty-plus interconnected features: real-time chat, five playable games, a blog CMS, a cloud gallery with lightbox, Supabase auth with row level security, an admin dashboard and a hidden F1 easter egg. Mobile-first, consistent retro OS design language.",
    tech: ["React", "Supabase", "Canvas", "Vite", "CSS3"],
    link: "/webcorner",
    linkLabel: "live",
  },
  {
    name: "Real-Time Chat Application",
    body: "Full-stack chat with authentication, persistent history and live synchronisation over Supabase Realtime. Session management, loading and error states, and a layout that holds up on a phone.",
    tech: ["Supabase Realtime", "PostgreSQL", "React"],
    link: "/chat",
    linkLabel: "open app",
  },
  {
    name: "Retro Arcade — five games",
    body: "Tetris with rotation matrices, Snake on a grid, Pong with an AI opponent, a weighted-RNG slot machine and a probability-driven roulette. All on requestAnimationFrame loops with touch controls.",
    tech: ["Canvas API", "Game Loops", "AI", "Physics"],
    link: "/games",
    linkLabel: "play",
  },
  {
    name: "F1 Command Center",
    body: "Easter egg page behind a Konami code listener. Race countdown, a five-light start sequence with Web Audio beeps that doubles as a reflex tester, and a seeded strategy simulator that runs 58 laps and classifies the field.",
    tech: ["React", "Web Audio", "Simulation"],
    link: "/f1",
    linkLabel: "open",
  },
  {
    name: "Cloud Image Gallery",
    body: "Supabase storage backed gallery with lazy loading, keyboard-navigable lightbox and scroll locking. Handles empty, loading and error states.",
    tech: ["Supabase", "Storage", "React"],
    link: "/view-gallery",
    linkLabel: "open",
  },
  {
    name: "Blog CMS",
    body: "Writing system on Supabase with create, edit and publish behind authenticated routes, plus tag filtering and reading time.",
    tech: ["Supabase", "CRUD", "React"],
    link: "/blog",
    linkLabel: "read",
  },
];

const EDUCATION = [
  {
    title: "Bachelor of Computer Engineering",
    org: "Kathford International College",
    meta: "2021 — present",
  },
  {
    title: "+2 Science — Physics, Chemistry, Mathematics",
    org: "Milestone International College",
    meta: "2020 — 2021",
  },
];

const FACTS = [
  ["Based in", "Lalitpur, Nepal"],
  ["Timezone", "UTC+5:45"],
  ["Focus", "React + Supabase"],
  ["Projects", "20+ shipped"],
  ["Games", "5, all playable"],
  ["Status", "Open to junior roles"],
];

function useSession(lines) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (shown >= lines.length) return;
    const timer = setTimeout(
      () => setShown((s) => s + 1),
      shown === 0 ? 350 : 320,
    );
    return () => clearTimeout(timer);
  }, [shown, lines.length]);

  return shown;
}

function LandingPage() {
  const shown = useSession(SESSION);

  return (
    <div className="lp-page">
      <header className="lp-bar">
        <div className="lp-wrap lp-bar-inner">
          <span className="lp-bar-path">
            ~/<b>darshan</b>
          </span>
          <nav className="lp-bar-links">
            <a className="lp-bar-link" href="#profile">
              profile
            </a>
            <a className="lp-bar-link" href="#stack">
              stack
            </a>
            <a className="lp-bar-link" href="#work">
              work
            </a>
            <a className="lp-bar-link" href="#contact">
              contact
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="lp-hero">
          <div className="lp-wrap">
            <div className="lp-dossier">
              <div className="lp-dossier-head">
                <div>
                  <h1 className="lp-name">Darshan Gyawali</h1>
                  <p className="lp-role">
                    Software developer. <b>React</b>, Supabase and Canvas. I
                    build things for the web.
                  </p>
                </div>
                <span className="lp-status">
                  <i />
                  open to work
                </span>
              </div>

              <div className="lp-term">
                {SESSION.slice(0, shown).map((line) => (
                  <div className="lp-tline" key={line.ps1}>
                    <span className="lp-tline-ps1">$ {line.ps1}</span>
                    <span
                      className={
                        line.accent ? "lp-tline-accent" : "lp-tline-out"
                      }
                    >
                      {line.out}
                    </span>
                  </div>
                ))}
                {shown < SESSION.length && <span className="lp-caret" />}
              </div>

              <div className="lp-hero-foot">
                <a className="lp-btn lp-btn-solid" href={`mailto:${EMAIL}`}>
                  Email
                </a>
                <a
                  className="lp-btn"
                  href={GITHUB}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
                <a className="lp-btn" href={CV} download>
                  Résumé ↓
                </a>
                <Link className="lp-btn" to="/webcorner">
                  Personal website →
                </Link>
                <span className="lp-hero-foot-note">
                  6 lines above, no tracking
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="lp-sec" id="profile">
          <div className="lp-wrap">
            <div className="lp-sec-head">
              <span className="lp-sec-idx">01</span>
              <h2 className="lp-sec-title">Profile</h2>
            </div>

            <div className="lp-split">
              <div className="lp-prose">
                <p>
                  I am a computer engineering student in Lalitpur, Nepal, and I
                  build for the web. Mostly React front-ends, Supabase
                  back-ends, and games on canvas.
                </p>
                <p>
                  Almost everything I have shipped is self-directed, including
                  this site. I like working end to end, which mostly means
                  designing the data model and the component tree together
                  instead of handing a finished design over and hoping
                  somebody else can build it. Auth, realtime, storage, routing
                  and the interface all sit in the same repo, and I can explain
                  every part of it.
                </p>
                <p>
                  The games were the useful accident. Writing Tetris rotation
                  matrices and an AI Pong opponent taught me more about frame-rate
                  independent loops, input timing and state machines than any
                  course did, and it is the reason the rest of my code is
                  organised the way it is.
                </p>
                <p>
                  I am looking for a junior developer role where I can keep
                  learning quickly and ship work I would actually put my name on.
                </p>
              </div>

              <dl className="lp-dl">
                {FACTS.map(([key, value]) => (
                  <React.Fragment key={key}>
                    <dt>{key}</dt>
                    <dd>{value}</dd>
                  </React.Fragment>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section className="lp-sec" id="stack">
          <div className="lp-wrap">
            <div className="lp-sec-head">
              <span className="lp-sec-idx">02</span>
              <h2 className="lp-sec-title">Stack</h2>
              <span className="lp-sec-aside">what I reach for</span>
            </div>

            <div className="lp-stack">
              {STACK.map((group) => (
                <div className="lp-stack-row" key={group.name}>
                  <div className="lp-stack-name">{group.name}</div>
                  <div className="lp-stack-list">
                    {group.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="lp-sec" id="work">
          <div className="lp-wrap">
            <div className="lp-sec-head">
              <span className="lp-sec-idx">03</span>
              <h2 className="lp-sec-title">Work</h2>
              <span className="lp-sec-aside">
                all of these are live —{" "}
                <a href={GITHUB} target="_blank" rel="noreferrer">
                  github
                </a>
              </span>
            </div>

            <div className="lp-work">
              {WORK.map((project, i) => (
                <article className="lp-work-row" key={project.name}>
                  <div className="lp-work-idx">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h3 className="lp-work-name">{project.name}</h3>
                    <p className="lp-work-body">{project.body}</p>
                    <div className="lp-work-tech">
                      {project.tech.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                  </div>
                  <div className="lp-work-links">
                    <Link className="lp-work-link" to={project.link}>
                      {project.linkLabel} →
                    </Link>
                    <a
                      className="lp-work-link lp-work-link-dim"
                      href={GITHUB}
                      target="_blank"
                      rel="noreferrer"
                    >
                      source
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="lp-sec" id="education">
          <div className="lp-wrap">
            <div className="lp-sec-head">
              <span className="lp-sec-idx">04</span>
              <h2 className="lp-sec-title">Education</h2>
            </div>

            <div className="lp-edu">
              {EDUCATION.map((entry) => (
                <div className="lp-edu-item" key={entry.title}>
                  <div className="lp-edu-title">{entry.title}</div>
                  <div className="lp-edu-org">{entry.org}</div>
                  <div className="lp-edu-meta">{entry.meta}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="lp-sec" id="contact">
          <div className="lp-wrap">
            <div className="lp-sec-head">
              <span className="lp-sec-idx">05</span>
              <h2 className="lp-sec-title">Contact</h2>
            </div>

            <div className="lp-contact">
              <a className="lp-contact-cell" href={`mailto:${EMAIL}`}>
                <div className="lp-contact-key">Email</div>
                <div className="lp-contact-val">{EMAIL}</div>
              </a>
              <a
                className="lp-contact-cell"
                href={GITHUB}
                target="_blank"
                rel="noreferrer"
              >
                <div className="lp-contact-key">GitHub</div>
                <div className="lp-contact-val">@Curious-duck-cmd</div>
              </a>
              <a className="lp-contact-cell" href={CV} download>
                <div className="lp-contact-key">Résumé</div>
                <div className="lp-contact-val">About Me.pdf</div>
              </a>
              <div className="lp-contact-cell">
                <div className="lp-contact-key">Location</div>
                <div className="lp-contact-val">Lalitpur, Nepal</div>
              </div>
            </div>

            <div className="lp-cta">
              <p>
                If you are hiring a junior developer and want someone who will
                read the schema before touching the UI, my inbox is open. I
                reply to everything, and I am happy to walk you through any
                project above in detail.
              </p>
              <p style={{ marginBottom: 0 }}>
                <a className="lp-btn lp-btn-solid" href={`mailto:${EMAIL}`}>
                  Write to me
                </a>{" "}
                <a className="lp-btn" href={CV} download>
                  Download résumé
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="lp-foot">
        <div className="lp-wrap">
          <div className="lp-foot-row">
            <div className="lp-foot-meta">
              <p>© 2026 Darshan Gyawali</p>
              <p>Built with React, Vite and no analytics.</p>
            </div>
            <div className="lp-foot-legacy">
              <span>Also built a full retro personal website</span>
              <Link className="lp-btn" to="/webcorner">
                My Personal Website →
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;

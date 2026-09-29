import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../landing.css";

const EMAIL = "darshangyawali44@gmail.com";
const GITHUB = "https://github.com/Curious-duck-cmd";
const CV = "/assets/About Me.pdf";

const SESSION = [
  { ps1: "whoami", out: "Darshan Gyawali, software developer" },
  { ps1: "location", out: "Lalitpur, Nepal · UTC+5:45" },
  { ps1: "stack --top", out: "react · supabase · postgres · canvas" },
  { ps1: "shipped", out: "20+ projects, 5 playable games" },
  { ps1: "status", out: "open to junior dev roles", tone: "green" },
  { ps1: "contact", out: EMAIL, tone: "pink" },
];

const FACTS = [
  ["Based in", "Lalitpur, Nepal"],
  ["Timezone", "UTC+5:45"],
  ["Focus", "React + Supabase"],
  ["Shipped", "20+ projects"],
  ["Games", "5, all playable"],
  ["Status", "Open to junior roles"],
];

const WORK = [
  {
    name: "Retro Portfolio Website",
    body: "My personal site, and the biggest thing I have built. Twenty-plus features that actually work: real-time chat, five playable games, a blog CMS, a cloud gallery with lightbox, Supabase auth with row level security, an admin dashboard, and a hidden F1 easter egg behind a Konami code.",
    tech: ["React", "Supabase", "Canvas", "Vite", "CSS3"],
    to: "/webcorner",
    label: "Visit site",
  },
  {
    name: "Real-Time Chat Application",
    body: "Full-stack chat with authentication, persistent history and live synchronisation over Supabase Realtime. Proper session handling, and loading and error states that do not fall apart on a phone.",
    tech: ["Supabase Realtime", "PostgreSQL", "React"],
    to: "/chat",
    label: "Open app",
  },
  {
    name: "Retro Arcade — five games",
    body: "Tetris with rotation matrices, Snake on a grid, Pong against a real AI opponent, a weighted-RNG slot machine and a probability-driven roulette. Every one runs on a requestAnimationFrame loop and works with touch.",
    tech: ["Canvas", "Game Loops", "AI", "Physics"],
    to: "/games",
    label: "Play",
  },
  {
    name: "F1 Command Center",
    body: "An easter egg page. Race countdown, a five-light start sequence with Web Audio beeps that doubles as a reflex tester, and a seeded strategy simulator that runs 58 laps and classifies the field.",
    tech: ["React", "Web Audio", "Simulation"],
    to: "/f1",
    label: "Open",
  },
  {
    name: "Cloud Image Gallery",
    body: "Supabase storage backed gallery with lazy loading, a keyboard-navigable lightbox and scroll locking. Handles empty, loading and error states instead of pretending they do not exist.",
    tech: ["Supabase", "Storage", "React"],
    to: "/view-gallery",
    label: "Open",
  },
  {
    name: "Blog CMS",
    body: "A writing system on Supabase with create, edit and publish behind authenticated routes, plus tag filtering and reading time.",
    tech: ["Supabase", "CRUD", "React"],
    to: "/blog",
    label: "Read",
  },
];

const STACK = [
  {
    name: "Frontend",
    items: [
      "React",
      "Hooks",
      "React Router",
      "State Management",
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
      "Realtime",
      "Cloud Storage",
      "JWT Auth",
    ],
  },
  {
    name: "Styling & Motion",
    items: ["CSS3", "Grid", "Flexbox", "Responsive", "Animation"],
  },
  {
    name: "Game Dev",
    items: ["Canvas", "Game Loops", "Collision", "Physics", "AI"],
  },
  {
    name: "Tooling",
    items: ["Vite", "Git", "NPM", "ESLint", "Chrome DevTools"],
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

const EDUCATION = [
  {
    year: "2021 — completed",
    title: "Bachelor of Computer Engineering",
  },
  {
    year: "2020 — 2021",
    title: "+2 Science — Physics, Chemistry, Mathematics",
  },
];

const CONTACT = [
  { key: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
  { key: "GitHub", value: "@Curious-duck-cmd", href: GITHUB, external: true },
  { key: "Résumé", value: "About Me.pdf", href: CV },
  { key: "Location", value: "Lalitpur, Nepal" },
];

function useSession(lines) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (shown >= lines.length) return;
    const timer = setTimeout(
      () => setShown((s) => s + 1),
      shown === 0 ? 320 : 290,
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
          <span className="lp-bar-id">
            <i className="lp-bar-dot" />
            <span>
              darshan<b>.gyawali</b>
            </span>
          </span>
          <nav className="lp-bar-links">
            <a className="lp-bar-link" href="#work">
              Work
            </a>
            <a className="lp-bar-link" href="#stack">
              Stack
            </a>
            <a className="lp-bar-link" href="#about">
              About
            </a>
            <a className="lp-bar-link" href="#education">
              Education
            </a>
          </nav>
          <a className="lp-bar-cta" href={CV} download>
            Résumé
          </a>
        </div>
      </header>

      <main>
        <section className="lp-hero">
          <div className="lp-wrap lp-hero-grid">
            <div>
              <div className="lp-hello">
                <i />
                <span>available</span> for junior developer roles
              </div>

              <h1 className="lp-title">Hi, I&apos;m Darshan.</h1>

              <p className="lp-lede">
                Computer engineering graduate in Lalitpur, Nepal. I make{" "}
                <b>React front-ends</b>, <b>Supabase back-ends</b> and{" "}
                <b>games on canvas</b> — usually all inside the same repo.
              </p>

              <div className="lp-actions">
                <a
                  className="lp-btn lp-btn-solid"
                  href={`mailto:${EMAIL}`}
                >
                  Get in touch
                </a>
                <Link className="lp-btn" to="/webcorner">
                  See what I&apos;ve built →
                </Link>
                <a
                  className="lp-btn lp-btn-pink"
                  href={GITHUB}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              </div>

              <div className="lp-hero-meta">
                <span>
                  <b>20+</b> projects
                </span>
                <span>
                  <b>5</b> playable games
                </span>
                <span>
                  <b>Lalitpur</b>, Nepal
                </span>
                <span>
                  <b>UTC+5:45</b>
                </span>
              </div>
            </div>

            <div className="lp-stack-visual">
              <div className="lp-term">
                <div className="lp-term-bar">
                  <i />
                  <i />
                  <i />
                  <span>~/portfolio — bash</span>
                </div>
                <div className="lp-term-body">
                  {SESSION.slice(0, shown).map((line) => (
                    <div className="lp-tline" key={line.ps1}>
                      <span className="lp-tps1">$ {line.ps1}</span>
                      <span
                        className={
                          line.tone === "pink"
                            ? "lp-tout lp-tout-pink"
                            : line.tone === "green"
                              ? "lp-tout lp-tout-accent"
                              : "lp-tout"
                        }
                      >
                        {line.out}
                      </span>
                    </div>
                  ))}
                  {shown < SESSION.length && <span className="lp-caret" />}
                </div>
              </div>

              <figure className="lp-photo">
                <img
                  src="/image/darshan.jpg"
                  width="900"
                  height="1200"
                  alt="Darshan Gyawali"
                  loading="eager"
                />
                <figcaption className="lp-photo-cap">
                  <b>Darshan Gyawali</b>
                  <span>2026</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="lp-sec" id="work">
          <div className="lp-wrap">
            <div className="lp-sec-head">
              <div className="lp-kicker">
                <b>01</b> / work
              </div>
              <h2 className="lp-h2">Things I have actually shipped</h2>
              <p className="lp-sec-sub">
                Everything below is live and running right now. Click into any
                of them and use it — the games in particular are worth the
                detour.
              </p>
            </div>

            <div className="lp-work">
              {WORK.map((project, i) => (
                <article className="lp-work-card" key={project.name}>
                  <div className="lp-work-idx">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h3 className="lp-work-name">{project.name}</h3>
                    <p className="lp-work-body">{project.body}</p>
                    <div className="lp-work-tech">
                      {project.tech.map((item) => (
                        <span className="lp-chip" key={item}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="lp-work-links">
                    <Link className="lp-work-link" to={project.to}>
                      {project.label} →
                    </Link>
                    <a
                      className="lp-work-link lp-work-link-dim"
                      href={GITHUB}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Source
                    </a>
                  </div>
                </article>
              ))}
            </div>

            <div className="lp-more">
              <Link className="lp-btn" to="/webcorner">
                Open my personal website
              </Link>
              <Link className="lp-btn" to="/projects">
                Full project list
              </Link>
            </div>
          </div>
        </section>

        <section className="lp-sec" id="about">
          <div className="lp-wrap">
            <div className="lp-sec-head">
              <div className="lp-kicker">
                <b>02</b> / about
              </div>
              <h2 className="lp-h2">A developer who reads the schema first</h2>
            </div>

            <div className="lp-about-grid">
              <div className="lp-prose">
                <p className="lp-pull">
                  &ldquo;Simply lovely&rdquo; is how I would describe what I
                  want to build. Useful first, then a bit of personality on
                  top.
                </p>
                <p>
                  Almost everything I have shipped is self-directed, including
                  the site you are on. I like working end to end, which in
                  practice means designing the data model and the component
                  tree together instead of handing a finished design over and
                  hoping somebody else can build it. Auth, realtime, storage,
                  routing and the interface all live in one repo, and I can
                  explain every part of it.
                </p>
                <p>
                  The games were the useful accident. Writing Tetris rotation
                  matrices and an AI Pong opponent taught me more about
                  frame-rate independent loops, input timing and state machines
                  than any course did, and it is the reason the rest of my code
                  is organised the way it is.
                </p>
                <p>
                  I am looking for a junior developer role where I can keep
                  learning quickly and ship work I would actually put my name
                  on.
                </p>
              </div>

              <dl className="lp-facts">
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
              <div className="lp-kicker">
                <b>03</b> / stack
              </div>
              <h2 className="lp-h2">What I reach for</h2>
            </div>

            <div className="lp-stack">
              {STACK.map((group) => (
                <div className="lp-stack-cell" key={group.name}>
                  <div className="lp-stack-name">{group.name}</div>
                  <div className="lp-stack-list">
                    {group.items.map((item) => (
                      <span className="lp-chip" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="lp-sec" id="education">
          <div className="lp-wrap">
            <div className="lp-sec-head">
              <div className="lp-kicker">
                <b>04</b> / education
              </div>
              <h2 className="lp-h2">Where I studied</h2>
            </div>

            <div className="lp-edu">
              {EDUCATION.map((entry) => (
                <div className="lp-edu-card" key={entry.title}>
                  <div className="lp-edu-year">{entry.year}</div>
                  <h3 className="lp-edu-title">{entry.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="lp-sec" id="contact">
          <div className="lp-wrap">
            <div className="lp-sec-head">
              <div className="lp-kicker">
                <b>05</b> / contact
              </div>
              <h2 className="lp-h2">Get in touch</h2>
            </div>

            <div className="lp-contact-grid">
              {CONTACT.map((item) => {
                const inner = (
                  <>
                    <div className="lp-contact-key">{item.key}</div>
                    <div className="lp-contact-val">{item.value}</div>
                  </>
                );

                if (!item.href) {
                  return (
                    <div className="lp-contact-card" key={item.key}>
                      {inner}
                    </div>
                  );
                }

                return (
                  <a
                    className="lp-contact-card"
                    key={item.key}
                    href={item.href}
                    {...(item.external
                      ? { target: "_blank", rel: "noreferrer" }
                      : {})}
                  >
                    {inner}
                  </a>
                );
              })}
            </div>

            <div className="lp-closing">
              <h3>At the crossroads, don&apos;t turn left.</h3>
              <p>
                If you are hiring a junior developer and want someone who will
                look at the data model before touching the UI, my inbox is open.
                I reply to everything and I am happy to walk you through any
                project above in detail.
              </p>
              <div className="lp-closing-actions">
                <a className="lp-btn lp-btn-solid" href={`mailto:${EMAIL}`}>
                  Write to me
                </a>
                <a
                  className="lp-btn lp-btn-ghost-light"
                  href={GITHUB}
                  target="_blank"
                  rel="noreferrer"
                >
                  See my code
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="lp-foot">
        <div className="lp-wrap lp-foot-row">
          <div className="lp-foot-meta">
            <p>© 2026 Darshan Gyawali</p>
            <p>Built with React and Vite. No analytics, no tracking.</p>
          </div>
          <div className="lp-foot-legacy">
            <span>I also built a full retro personal website</span>
            <Link className="lp-btn" to="/webcorner">
              My Personal Website →
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;

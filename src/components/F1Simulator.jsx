import React, { useState, useRef, useEffect, useCallback } from "react";

const DRIVERS = [
  { name: "Lando Norris", num: 4, team: "McLaren", color: "#FF8700", pace: 0.52 },
  { name: "Oscar Piastri", num: 81, team: "McLaren", color: "#FF8700", pace: 0.55 },
  { name: "Max Verstappen", num: 1, team: "Red Bull Racing", color: "#0600EF", pace: 0.5 },
  { name: "Isack Hadjar", num: 6, team: "Red Bull Racing", color: "#0600EF", pace: 0.72 },
  { name: "Charles Leclerc", num: 16, team: "Ferrari", color: "#DC0000", pace: 0.58 },
  { name: "Lewis Hamilton", num: 44, team: "Ferrari", color: "#DC0000", pace: 0.6 },
  { name: "George Russell", num: 63, team: "Mercedes", color: "#00D2BE", pace: 0.62 },
  { name: "Kimi Antonelli", num: 12, team: "Mercedes", color: "#00D2BE", pace: 0.75 },
  { name: "Fernando Alonso", num: 14, team: "Aston Martin", color: "#006F62", pace: 0.66 },
  { name: "Lance Stroll", num: 18, team: "Aston Martin", color: "#006F62", pace: 0.86 },
  { name: "Pierre Gasly", num: 10, team: "Alpine", color: "#0090FF", pace: 0.71 },
  { name: "Franco Colapinto", num: 43, team: "Alpine", color: "#0090FF", pace: 0.83 },
  { name: "Alex Albon", num: 23, team: "Williams", color: "#005AFF", pace: 0.74 },
  { name: "Carlos Sainz", num: 55, team: "Williams", color: "#005AFF", pace: 0.7 },
  { name: "Esteban Ocon", num: 31, team: "Haas", color: "#E8E8E8", pace: 0.79 },
  { name: "Oliver Bearman", num: 87, team: "Haas", color: "#E8E8E8", pace: 0.92 },
  { name: "Liam Lawson", num: 30, team: "Racing Bulls", color: "#2B4562", pace: 0.85 },
  { name: "Arvid Lindblad", num: 41, team: "Racing Bulls", color: "#2B4562", pace: 0.95 },
  { name: "Nico Hulkenberg", num: 27, team: "Audi", color: "#C1002B", pace: 0.78 },
  { name: "Gabriel Bortoleto", num: 5, team: "Audi", color: "#C1002B", pace: 0.9 },
  { name: "Sergio Perez", num: 11, team: "Cadillac", color: "#FFD700", pace: 0.87 },
  { name: "Valtteri Bottas", num: 2, team: "Cadillac", color: "#FFD700", pace: 0.89 },
];

const COMPOUNDS = {
  soft: {
    id: "soft",
    label: "Soft",
    code: "S",
    band: "#FF3B30",
    pace: -0.16,
    laps: 18,
    stops: 2,
    note: "Qualifying grip, dies fast",
  },
  medium: {
    id: "medium",
    label: "Medium",
    code: "M",
    band: "#FFD60A",
    pace: -0.05,
    laps: 30,
    stops: 1,
    note: "The all-rounder",
  },
  hard: {
    id: "hard",
    label: "Hard",
    code: "H",
    band: "#F2F2F7",
    pace: 0.14,
    laps: 46,
    stops: 0,
    note: "Slow but you never stop",
  },
  inter: {
    id: "inter",
    label: "Intermediate",
    code: "I",
    band: "#34C759",
    pace: -0.02,
    laps: 34,
    stops: 1,
    note: "For a damp track",
  },
  wet: {
    id: "wet",
    label: "Full Wet",
    code: "W",
    band: "#0A84FF",
    pace: 0.1,
    laps: 28,
    stops: 2,
    note: "Monsoon territory",
  },
};

const POINTS = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];
const RACE_LAPS = 58;
const PIT_SECONDS = 24;

const mulberry32 = (seed) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const formatGap = (seconds) => {
  if (seconds < 0.005) return "";
  if (seconds < 60) return `+${seconds.toFixed(3)}`;
  const m = Math.floor(seconds / 60);
  const s = (seconds % 60).toFixed(3).padStart(6, "0");
  return `+${m}:${s}`;
};

const useAudioContext = () => {
  const ctxRef = useRef(null);

  const getContext = useCallback(() => {
    if (!ctxRef.current) {
      const Ctor =
        window.AudioContext || window.webkitAudioContext;
      if (Ctor) ctxRef.current = new Ctor();
    }
    if (ctxRef.current?.state === "suspended") ctxRef.current.resume();
    return ctxRef.current;
  }, []);

  const beep = useCallback(
    (frequency, duration = 0.18, volume = 0.15) => {
      const ctx = getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.value = frequency;
      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + duration,
      );
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    },
    [getContext],
  );

  return { getContext, beep };
};

const REACTION_BANDS = [
  {
    max: 160,
    label: "NEURAL LINK",
    color: "#39ff88",
    note: "Grid average is 200-250ms. That is not a human number.",
  },
  {
    max: 210,
    label: "QUALI PACE",
    color: "#FFD60A",
    note: "Faster than most of the field. Pole position pace.",
  },
  {
    max: 260,
    label: "PODIUM PACE",
    color: "#50B6D1",
    note: "Right inside the real F1 average band.",
  },
  {
    max: 330,
    label: "MIDFIELD",
    color: "#FFA0A0",
    note: "Fine, but the gap to the front is already gone.",
  },
  {
    max: Infinity,
    label: "PIT LANE",
    color: "#8E8E93",
    note: "The safety car would not even be surprised.",
  },
];

const getBand = (ms) =>
  REACTION_BANDS.find((band) => ms < band.max) || REACTION_BANDS.at(-1);

function StartLights() {
  const [lights, setLights] = useState([0, 0, 0, 0, 0]);
  const [phase, setPhase] = useState("idle");
  const [attempt, setAttempt] = useState(null);
  const [history, setHistory] = useState([]);
  const timers = useRef([]);
  const phaseRef = useRef("idle");
  const goAtRef = useRef(0);
  const launchedAtRef = useRef(0);
  const { getContext, beep } = useAudioContext();

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const changePhase = useCallback((next) => {
    phaseRef.current = next;
    setPhase(next);
  }, []);

  const commit = useCallback(
    (payload) => {
      clearTimers();
      changePhase("result");
      setAttempt(payload);
      if (payload.ms !== null) {
        setHistory((prev) => [payload, ...prev].slice(0, 5));
      }
    },
    [changePhase, clearTimers],
  );

  useEffect(() => clearTimers, [clearTimers]);

  useEffect(() => {
    const handleInput = (event) => {
      if (event.type === "keydown" && event.key !== " ") return;

      const now = performance.now();
      if (now - launchedAtRef.current < 450) return;

      const current = phaseRef.current;

      if (current === "arming" || current === "running") {
        beep(140, 0.5, 0.24);
        commit({ ms: null, falseStart: true });
        return;
      }

      if (current === "go") {
        beep(1320, 0.28, 0.24);
        commit({
          ms: Math.round(now - goAtRef.current),
          falseStart: false,
        });
      }
    };

    window.addEventListener("pointerdown", handleInput);
    window.addEventListener("keydown", handleInput);
    return () => {
      window.removeEventListener("pointerdown", handleInput);
      window.removeEventListener("keydown", handleInput);
    };
  }, [beep, commit]);

  const run = useCallback(() => {
    clearTimers();
    getContext();
    launchedAtRef.current = performance.now();
    changePhase("arming");
    setLights([0, 0, 0, 0, 0]);
    setAttempt(null);

    timers.current.push(setTimeout(() => changePhase("running"), 1400));

    for (let i = 0; i < 5; i++) {
      timers.current.push(
        setTimeout(() => {
          setLights((prev) => prev.map((v, idx) => (idx === i ? 1 : v)));
          beep(320 + i * 40, 0.22, 0.18);
        }, 1400 + i * 950),
      );
    }

    const outAt = 1400 + 5 * 950 + 1200 + Math.random() * 1400;

    timers.current.push(
      setTimeout(() => {
        setLights([0, 0, 0, 0, 0]);
        goAtRef.current = performance.now();
        changePhase("go");
        beep(880, 0.5, 0.22);
      }, outAt),
    );

    timers.current.push(
      setTimeout(() => {
        if (phaseRef.current === "go") commit({ ms: null, falseStart: false });
      }, outAt + 4000),
    );
  }, [beep, changePhase, clearTimers, commit, getContext]);

  const best = history.reduce(
    (min, entry) =>
      entry.ms !== null && (min === null || entry.ms < min) ? entry.ms : min,
    null,
  );

  const band = attempt?.ms ? getBand(attempt.ms) : null;
  const busy = phase === "arming" || phase === "running" || phase === "go";

  const label =
    phase === "arming"
      ? "GET READY"
      : phase === "running"
        ? "HOLD..."
        : phase === "go"
          ? "GO! TAP OR HIT SPACE"
          : phase === "result" && attempt?.falseStart
            ? "JUMP START"
            : phase === "result" && attempt && attempt.ms === null
              ? "LIGHTS OUT AND AWAY"
              : "REFLEX TEST";

  return (
    <div
      style={{
        background: "#111",
        border: "4px solid #000",
        borderRadius: "10px",
        padding: "28px 20px",
        boxShadow: "6px 6px 0px #000",
        textAlign: "center",
        color: "#fff",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "18px",
          marginBottom: "22px",
        }}
      >
        {lights.map((on, i) => (
          <div
            key={i}
            style={{
              width: "46px",
              height: "46px",
              borderRadius: "50%",
              background: on
                ? "radial-gradient(circle at 35% 30%, #ff6b6b, #c81e1e)"
                : "#2a1414",
              border: "3px solid #000",
              boxShadow: on
                ? "0 0 22px 6px rgba(255,40,40,0.65)"
                : "inset 0 4px 8px rgba(0,0,0,0.9)",
              transition: "all 180ms ease",
            }}
          />
        ))}
      </div>

      <div
        style={{
          fontFamily: "monospace",
          fontSize: "1.4rem",
          fontWeight: "bold",
          letterSpacing: "3px",
          color: phase === "go" ? "#39ff88" : "#50B6D1",
          textShadow: phase === "go" ? "0 0 18px #39ff88" : "none",
          marginBottom: "16px",
        }}
      >
        {label}
      </div>

      <div
        style={{
          minHeight: "104px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginBottom: "18px",
        }}
      >
        {attempt?.falseStart ? (
          <>
            <div
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                color: "#FF3B30",
                fontFamily: "monospace",
              }}
            >
              ⚠️ +5s PENALTY
            </div>
            <div style={{ fontSize: "0.9rem", opacity: 0.8 }}>
              You went before the lights went out. The stewards were not kind.
            </div>
          </>
        ) : attempt && attempt.ms !== null ? (
          <>
            <div
              style={{
                fontSize: "3.2rem",
                fontWeight: "bold",
                fontFamily: "monospace",
                color: band.color,
                textShadow: `0 0 24px ${band.color}66`,
              }}
            >
              {attempt.ms} ms
            </div>
            <div
              style={{
                fontSize: "1rem",
                fontWeight: "bold",
                letterSpacing: "2px",
                color: band.color,
              }}
            >
              {band.label}
            </div>
            <div style={{ fontSize: "0.85rem", opacity: 0.75 }}>
              {band.note}
            </div>
          </>
        ) : attempt ? (
          <>
            <div
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                fontFamily: "monospace",
                opacity: 0.85,
              }}
            >
              🏁 NO TIME SET
            </div>
            <div style={{ fontSize: "0.9rem", opacity: 0.75 }}>
              You watched the lights go out instead of reacting. Try again.
            </div>
          </>
        ) : (
          <div style={{ fontSize: "0.9rem", opacity: 0.65 }}>
            Start the sequence, then tap anywhere or press SPACE the instant the
            lights go out. Move early and you get a jump start.
          </div>
        )}
      </div>

      <button
        onClick={run}
        className="loginBtn"
        style={{
          background: busy ? "#cfd3da" : "#50B6D1",
          color: "#000",
          border: "3px solid #000",
          boxShadow: "4px 4px 0px #000",
          padding: "12px 26px",
          fontSize: "1rem",
          fontWeight: "bold",
          letterSpacing: "1px",
          cursor: busy ? "not-allowed" : "pointer",
        }}
      >
        {phase === "result" || phase === "idle" ? "🏁 LIGHTS OUT" : "..."}
      </button>

      {history.length > 0 && (
        <div style={{ marginTop: "22px" }}>
          <div
            style={{
              fontSize: "0.75rem",
              letterSpacing: "2px",
              opacity: 0.6,
              marginBottom: "10px",
            }}
          >
            SESSION TIMES
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              justifyContent: "center",
            }}
          >
            {history.map((entry, i) => (
              <span
                key={`${entry.ms}-${i}`}
                style={{
                  fontFamily: "monospace",
                  fontSize: "0.85rem",
                  padding: "5px 10px",
                  border: "2px solid #444",
                  borderRadius: "4px",
                  background: entry.ms !== null ? "#1c1c1e" : "#3a1515",
                  color:
                    entry.ms !== null
                      ? entry.ms === best
                        ? "#FFD60A"
                        : "#50B6D1"
                      : "#FF3B30",
                }}
              >
                {entry.ms !== null ? `${entry.ms} ms` : "JUMP"}
              </span>
            ))}
          </div>
          {best !== null && (
            <div
              style={{
                marginTop: "12px",
                fontSize: "0.8rem",
                opacity: 0.7,
                fontFamily: "monospace",
              }}
            >
              SESSION BEST: {best} ms
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function RaceSimulator({ raceName, circuit }) {
  const [compound, setCompound] = useState("medium");
  const [fuelSlider, setFuelSlider] = useState(50);
  const [aggression, setAggression] = useState(50);
  const [result, setResult] = useState(null);
  const [running, setRunning] = useState(false);

  const simulate = useCallback(() => {
    setRunning(true);

    const seed =
      Date.now() ^
      (compound.length * 7919) ^
      (fuelSlider * 104729) ^
      (aggression * 1299709);
    const rand = mulberry32(seed);

    const chosen = COMPOUNDS[compound];
    const fuelFactor = (fuelSlider - 50) / 100;
    const aggressionFactor = (aggression - 50) / 100;
    const stints = chosen.stops + 1;
    const lapsPerStint = Math.max(
      6,
      Math.round(RACE_LAPS / stints) + Math.round((rand() - 0.5) * 4),
    );

    const entries = DRIVERS.map((driver) => {
      const rivalPace = driver.pace + (rand() - 0.5) * 0.14;
      const compoundPace = chosen.pace + (rand() - 0.5) * 0.05;
      const fuelPace = -fuelFactor * 0.22 * (lapsPerStint / RACE_LAPS) * 8;
      const push = aggressionFactor * 0.14;
      const perLap = rivalPace + compoundPace + fuelPace + push;

      const stintPenalty =
        Math.max(0, lapsPerStint - chosen.laps) * 0.05;

      const total = perLap * RACE_LAPS + stintPenalty * stints;
      const pitTime = chosen.stops * PIT_SECONDS;
      const bestLap = 88 + perLap * 4 + rand() * 0.6;

      return {
        ...driver,
        laps: RACE_LAPS,
        pitTime,
        bestLap,
        total: total + pitTime,
      };
    });

    entries.sort((a, b) => a.total - b.total);
    const winner = entries[0];

    const classified = entries.map((entry, index) => ({
      ...entry,
      pos: index + 1,
      time: 90 * RACE_LAPS + entry.total,
      gap: entry.total - winner.total,
      points: POINTS[index] || 0,
    }));

    const fastest = classified.reduce((a, b) =>
      a.bestLap <= b.bestLap ? a : b,
    );

    setResult({
      classified,
      fastest,
      lapsPerStint,
      stints,
      compound: chosen,
      circuit: circuit || "Albert Park Circuit",
      race: raceName || "Australian Grand Prix",
    });

    setRunning(false);
  }, [aggression, compound, fuelSlider, raceName, circuit]);

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: "12px",
          marginBottom: "22px",
        }}
      >
        {Object.values(COMPOUNDS).map((item) => {
          const active = compound === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCompound(item.id)}
              style={{
                background: active ? item.band : "#cfd3da",
                color: active ? "#000" : "#1c1c1e",
                border: active ? "4px solid #000" : "2px solid #000",
                boxShadow: active ? "6px 6px 0px #000" : "3px 3px 0px #000",
                padding: "14px 10px",
                cursor: "pointer",
                textAlign: "center",
                transition: "all 0.15s ease",
                transform: active ? "translate(-3px, -3px)" : "none",
              }}
            >
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  fontFamily: "monospace",
                }}
              >
                {item.code}
              </div>
              <div style={{ fontSize: "0.85rem", fontWeight: "bold" }}>
                {item.label}
              </div>
              <div style={{ fontSize: "0.7rem", opacity: 0.75 }}>
                {item.note}
              </div>
            </button>
          );
        })}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginBottom: "22px",
        }}
      >
        <label
          style={{
            background: "#fff",
            border: "2px solid #000",
            boxShadow: "4px 4px 0px #000",
            padding: "12px 14px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "bold",
              fontSize: "0.9rem",
              marginBottom: "8px",
            }}
          >
            <span>FUEL LOAD</span>
            <span style={{ color: "#007AFF" }}>{fuelSlider}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={fuelSlider}
            onChange={(e) => setFuelSlider(Number(e.target.value))}
            style={{ width: "100%" }}
          />
          <div style={{ fontSize: "0.72rem", opacity: 0.7, marginTop: "6px" }}>
            Light = fast and fading, heavy = slow but safe
          </div>
        </label>

        <label
          style={{
            background: "#fff",
            border: "2px solid #000",
            boxShadow: "4px 4px 0px #000",
            padding: "12px 14px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "bold",
              fontSize: "0.9rem",
              marginBottom: "8px",
          }}
          >
            <span>AGGRESSION</span>
            <span style={{ color: "#FF3B30" }}>{aggression}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={aggression}
            onChange={(e) => setAggression(Number(e.target.value))}
            style={{ width: "100%" }}
          />
          <div style={{ fontSize: "0.72rem", opacity: 0.7, marginTop: "6px" }}>
            Push hard for track position, or nurse the tyres home
          </div>
        </label>
      </div>

      <button
        onClick={simulate}
        disabled={running}
        className="loginBtn"
        style={{
          width: "100%",
          background: running ? "#cfd3da" : "#FFA0A0",
          color: "#000",
          border: "3px solid #000",
          boxShadow: "6px 6px 0px #000",
          padding: "16px",
          fontSize: "1.1rem",
          fontWeight: "bold",
          letterSpacing: "2px",
          cursor: running ? "wait" : "pointer",
        }}
      >
        {running ? "⏳ SIMULATING..." : "🏁 SIMULATE RACE"}
      </button>

      {result && (
        <div style={{ marginTop: "26px" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              justifyContent: "center",
              marginBottom: "18px",
              textAlign: "center",
            }}
          >
            <span
              style={{
                background: "#03274B",
                color: "#50B6D1",
                padding: "6px 12px",
                border: "2px solid #000",
                fontSize: "0.85rem",
                fontWeight: "bold",
              }}
            >
              {result.race}
            </span>
            <span
              style={{
                background: "#cfd3da",
                padding: "6px 12px",
                border: "2px solid #000",
                fontSize: "0.85rem",
                fontWeight: "bold",
              }}
            >
              📍 {result.circuit}
            </span>
            <span
              style={{
                background: result.compound.band,
                padding: "6px 12px",
                border: "2px solid #000",
                fontSize: "0.85rem",
                fontWeight: "bold",
              }}
            >
              {result.compound.code} TYRE • {result.stints} STINTS •{" "}
              {result.lapsPerStint} LAPS/STINT
            </span>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "0.9rem",
              }}
            >
              <thead>
                <tr
                  style={{
                    background: "#cfd3da",
                    borderBottom: "3px solid #000",
                  }}
                >
                  {["Pos", "Driver", "Team", "Tyre", "Best Lap", "Gap", "Pts"].map(
                    (heading) => (
                      <th
                        key={heading}
                        style={{
                          padding: "10px",
                          textAlign:
                            heading === "Driver" || heading === "Team"
                              ? "left"
                              : "center",
                          border: "2px solid #000",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {heading}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {result.classified.map((entry) => (
                  <tr
                    key={entry.name}
                    style={{
                      background:
                        entry.pos === 1
                          ? "#FFD700"
                          : entry.pos % 2 === 0
                            ? "#fff"
                            : "#f5f5f5",
                    }}
                  >
                    <td
                      style={{
                        padding: "9px",
                        fontWeight: "bold",
                        border: "1px solid #000",
                        textAlign: "center",
                      }}
                    >
                      {entry.pos}
                    </td>
                    <td
                      style={{
                        padding: "9px",
                        fontWeight: "bold",
                        border: "1px solid #000",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <span
                          style={{
                            background: entry.color,
                            border: "1px solid #000",
                            color: "#000",
                            padding: "1px 6px",
                            fontFamily: "monospace",
                            fontSize: "0.8rem",
                          }}
                        >
                          {entry.num}
                        </span>
                        {entry.name}
                        {entry.name === result.fastest.name && " ⚡"}
                      </div>
                    </td>
                    <td
                      style={{
                        padding: "9px",
                        border: "1px solid #000",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {entry.team}
                    </td>
                    <td
                      style={{
                        padding: "9px",
                        border: "1px solid #000",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {result.compound.code}
                    </td>
                    <td
                      style={{
                        padding: "9px",
                        border: "1px solid #000",
                        textAlign: "center",
                        fontFamily: "monospace",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {entry.bestLap.toFixed(3)}
                    </td>
                    <td
                      style={{
                        padding: "9px",
                        border: "1px solid #000",
                        textAlign: "center",
                        fontFamily: "monospace",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {formatGap(entry.gap) || "LEADER"}
                    </td>
                    <td
                      style={{
                        padding: "9px",
                        border: "1px solid #000",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {entry.points || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p
            style={{
              marginTop: "14px",
              fontSize: "0.85rem",
              textAlign: "center",
              opacity: 0.75,
            }}
          >
            ⚡ Fastest lap: {result.fastest.name} — 0 bonus points in 2026.
          </p>
        </div>
      )}
    </div>
  );
}

export { StartLights, RaceSimulator };

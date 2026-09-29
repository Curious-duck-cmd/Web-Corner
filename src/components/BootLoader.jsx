import React, { useState, useEffect } from "react";

const BOOT_LINES = [
  "> mounting react runtime",
  "> loading application shell",
  "> resolving routes",
  "> connecting supabase client",
  "> hydrating components",
  "> ready",
];

const BootLoader = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= BOOT_LINES.length) return;
    const timer = setTimeout(
      () => setStep((s) => s + 1),
      step === BOOT_LINES.length - 1 ? 260 : 190,
    );
    return () => clearTimeout(timer);
  }, [step]);

  const progress = Math.round(((step + 1) / BOOT_LINES.length) * 100);
  const done = step >= BOOT_LINES.length - 1;

  return (
    <div className="lp-boot">
      <div className="lp-boot-grid" aria-hidden="true" />
      <div className="lp-boot-glow" aria-hidden="true" />

      <div className="lp-boot-inner">
        <div className="lp-boot-logo">
          <span className="lp-boot-mark">DG</span>
          <span>
            darshan<span className="lp-boot-accent">.gyawali</span>
          </span>
        </div>

        <div className="lp-boot-lines">
          {BOOT_LINES.slice(0, step + 1).map((line, i) => (
            <div
              className={`lp-boot-line${
                i === step && !done ? " lp-boot-line-active" : ""
              }`}
              key={line}
            >
              {done && i === BOOT_LINES.length - 1 ? "✓ " : ""}
              {line}
            </div>
          ))}
          <span className="lp-boot-caret" />
        </div>

        <div className="lp-boot-progress">
          <div className="lp-boot-bar">
            <div className="lp-boot-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="lp-boot-meta">
            <span>initializing experience</span>
            <span>{String(progress).padStart(3, "0")}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BootLoader;

import React, { useState, useEffect } from "react";

const Screensaver = ({ idleTime = 60000 }) => {
  const [isIdle, setIsIdle] = useState(false);
  let timer;

  const resetTimer = () => {
    setIsIdle(false);
    clearTimeout(timer);
    timer = setTimeout(() => setIsIdle(true), idleTime);
  };

  useEffect(() => {
    const events = [
      "mousemove",
      "keydown",
      "mousedown",
      "touchstart",
      "touchmove",
      "click",
    ];

    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      clearTimeout(timer);
    };
  }, []);

  if (!isIdle) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
        zIndex: 99999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img 
        src="/image/redbull.webp" 
        alt="Red Bull Screensaver"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <div
        style={{
          position: "absolute",
          color: "white",
          bottom: "20px",
          opacity: 0.4,
        }}
      >
        Press any key to wake up
      </div>
    </div>
  );
};

export default Screensaver;

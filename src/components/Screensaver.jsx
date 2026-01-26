import React, { useState, useEffect } from 'react';

const Screensaver = ({ idleTime = 60000 }) => {
  const [isIdle, setIsIdle] = useState(false);
  let timer;

  const resetTimer = () => {
    setIsIdle(false);
    clearTimeout(timer);
    timer = setTimeout(() => setIsIdle(true), idleTime);
  };

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'mousedown', 'touchstart', 'touchmove'];
    
    events.forEach(event => window.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      events.forEach(event => window.removeEventListener(event, resetTimer));
      clearTimeout(timer);
    };
  }, []);

  if (!isIdle) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, width: '100vw', height: '100vh',
      backgroundColor: 'black', zIndex: 99999,
      display: 'flex', justifyContent: 'center', alignItems: 'center'
    }}>
      <video 
        autoPlay 
        muted 
        loop 
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      >
        <source src="/videos/your-screensaver.mp4" type="video/mp4" />
      </video>
      <div style={{ position: 'absolute', color: 'white', bottom: '20px', opacity: 0.5 }}>
        Press any key to wake up
      </div>
    </div>
  );
};

export default Screensaver;
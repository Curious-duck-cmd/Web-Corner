import React, { useState, useEffect } from 'react';

function VisitorCounter() {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get current count from localStorage
    const currentCount = parseInt(localStorage.getItem('visitorCount') || '0');
    
    // Check if this is a new visit (using sessionStorage)
    const hasVisited = sessionStorage.getItem('hasVisited');
    
    if (!hasVisited) {
      // New visit - increment counter
      const newCount = currentCount + 1;
      localStorage.setItem('visitorCount', newCount.toString());
      sessionStorage.setItem('hasVisited', 'true');
      setCount(newCount);
    } else {
      // Returning visit in same session
      setCount(currentCount);
    }
    
    setIsLoading(false);
  }, []);

  const formatNumber = (num) => {
    return num.toString().padStart(6, '0');
  };

  const digits = formatNumber(count).split('');

  return (
    <div style={{
      display: 'inline-block',
      background: '#000',
      border: '3px solid #50B6D1',
      padding: '15px 20px',
      boxShadow: '6px 6px 0px #50B6D1',
      fontFamily: 'monospace',
      margin: '20px 0'
    }}>
      <div style={{
        fontSize: '0.8rem',
        color: '#50B6D1',
        marginBottom: '8px',
        textAlign: 'center',
        letterSpacing: '2px'
      }}>
        🌐 VISITOR COUNT
      </div>
      
      <div style={{
        display: 'flex',
        gap: '4px',
        justifyContent: 'center'
      }}>
        {digits.map((digit, index) => (
          <div
            key={index}
            style={{
              background: '#1a1b26',
              border: '2px solid #50B6D1',
              padding: '8px 12px',
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#50B6D1',
              fontFamily: 'monospace',
              minWidth: '45px',
              textAlign: 'center',
              boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.5)',
              animation: isLoading ? 'none' : `digitFlip 0.5s ease-out ${index * 0.1}s backwards`
            }}
          >
            {digit}
          </div>
        ))}
      </div>

      <div style={{
        fontSize: '0.7rem',
        color: '#50B6D1',
        marginTop: '8px',
        textAlign: 'center',
        opacity: 0.6
      }}>
        TOTAL VISITS
      </div>

      <style>{`
        @keyframes digitFlip {
          0% {
            transform: rotateX(90deg);
            opacity: 0;
          }
          100% {
            transform: rotateX(0deg);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default VisitorCounter;
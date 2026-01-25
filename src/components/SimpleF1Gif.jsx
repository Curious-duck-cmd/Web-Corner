import React, { useState } from 'react';

const SimpleF1Gif = ({ show, onClose }) => {
  const [fallbackUrl, setFallbackUrl] = useState('/gifs/f1-motorsport.gif');

  // Only render if show is true
  if (!show) return null;

  return (
    <div 
      className="f1-gif-modal"
      onClick={onClose}
    >
      <div 
        className="f1-gif-container"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="f1-gif-close" 
          onClick={onClose}
          title="Close (ESC)"
        >
          ✕
        </button>
        
        {/* Try local file first, fallback to online GIF */}
        <img 
          src={fallbackUrl}
          alt="F1 Motorsport"
          style={{
            display: 'block',
            maxWidth: '90vw',
            maxHeight: '80vh',
            width: 'auto',
            height: 'auto',
            borderRadius: '8px',
            border: '3px solid #50B6D1',
            boxShadow: '0 0 20px rgba(80, 182, 209, 0.5)',
            objectFit: 'contain'
          }}
          onError={(e) => {
            // Fallback to a placeholder if local file doesn't exist
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzAzMjc0QiIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNTBCMkQxIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjI0cHgiPkYxIE1vdG9yc3BvcnQgR0lGPC90ZXh0PgogIDx0ZXh0IHg9IjUwJSIgeT0iNjAlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjODc4Nzg3IiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjE2cHgiPlVwbG9hZCB5b3VyIEdJRiB0bzovZ2lmcy9mMS1tb3RvcnNwb3J0LmdpZjwvdGV4dD4KICA8dGV4dCB4PSI1MCUiIHk9IjcwJSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI0Y4QTgwMCIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxNHB4Ij7wnZmU2ZjYnIFVzYSBmb3IgYW5pbWF0ZWQgR0lGPC90ZXh0Pgo8L3N2Zz4=';
          }}
        />
        
        <div style={{
          marginTop: '20px',
          textAlign: 'center',
          fontFamily: 'monospace',
          color: '#50B6D1',
          fontSize: '1.2rem',
          fontWeight: 'bold'
        }}>
          🏎️ F1 MOTOSPORT GIF 🏎️
        </div>
      </div>
    </div>
  );
};

export default SimpleF1Gif;
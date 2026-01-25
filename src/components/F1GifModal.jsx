import React, { useEffect, useState } from 'react';

const F1GifModal = ({ show, onClose }) => {
  const [gifLoaded, setGifLoaded] = useState(false);

  useEffect(() => {
    if (show) {
      // Load Tenor script when modal opens
      const script = document.createElement('script');
      script.src = 'https://tenor.com/embed.js';
      script.async = true;
      script.type = 'text/javascript';
      
      script.onload = () => {
        setGifLoaded(true);
      };
      
      script.onerror = () => {
        console.error('Failed to load Tenor script');
        // Fallback to iframe if script fails
        setGifLoaded(true);
      };
      
      document.body.appendChild(script);
      
      return () => {
        // Clean up script when modal closes
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    }
  }, [show]);

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
        
        {gifLoaded ? (
          <div 
            className="tenor-gif-embed" 
            data-postid="3507622333064106617" 
            data-share-method="host" 
            data-aspect-ratio="1.04622" 
            data-width="100%"
          >
            <a href="https://tenor.com/view/picturecross-motorsport-f1-gif-3507622333064106617">
              Picturecross Motorsport Sticker
            </a>
            from <a href="https://tenor.com/search/picturecross-stickers">
              Picturecross Stickers
            </a>
          </div>
        ) : (
          <div style={{ 
            color: '#50B6D1', 
            fontFamily: 'monospace',
            textAlign: 'center',
            padding: '40px'
          }}>
            Loading F1 content... 🏎️
          </div>
        )}
      </div>
    </div>
  );
};

export default F1GifModal;
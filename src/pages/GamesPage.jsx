import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function GamesPage() {
  return (
    <div className="portfolio-wrapper">
      <header>
        <div className="windowTop">
          <p>
            <img src="/image/Map_Pin_Grub.png" style={{ width: '18px', verticalAlign: 'middle', marginRight: '5px' }} alt="" />
            Games_Menu.exe
          </p>
          <div className="windowCircle">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
        </div>
        <div className="windowContent header-main">
          <nav>
            <Link to="/"><img src="/image/home.png" className="nav-icon" alt="" /> <span>Home</span></Link>
            <Link to="/blog"><img src="/image/life.png" className="nav-icon" alt="" /> <span>Life Blog</span></Link>
            <Link to="/projects"><img src="/image/made.png" className="nav-icon" alt="" /> <span>Stuff I Made</span></Link>
            <Link to="/portfolio"><img src="/image/me.png" className="nav-icon" alt="" /> <span>Who Am I</span></Link>
            <Link to="/view-gallery"><img src="/image/frame.png" className="nav-icon" alt="" /> <span>Gallery</span></Link>
            <Link to="/games"><img src="/image/joystick.png" className="nav-icon" alt="" /> <span>Games</span></Link>
            <Link to="/chat"><img src="/image/babble.png" className="nav-icon" alt="" /> <span>Chat</span></Link>
          </nav>
        </div>
      </header>

      <main style={{ padding: '40px', textAlign: 'center' }}>
        <h1 style={{ 
  marginBottom: '30px',
  fontSize: '2rem',
  fontWeight: '800',
  fontFamily: 'system-ui, -apple-system, sans-serif',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '15px',
  textAlign: 'center'
}}>
  <span className="floating-emoji" style={{ fontSize: '2.5rem' }}>🕹️</span> 
  <span style={{
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    paddingBottom: '5px' // Prevents letters like 'g' from being cut off
  }}>
    Game Collection
  </span>
</h1>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          {/* Tetris Game Launcher */}
          <Link to="/Tetris" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="windowContent" style={{ 
              width: '200px', 
              padding: '20px', 
              border: '4px solid #000', 
              boxShadow: '8px 8px 0px #000',
              background: '#50B6D1',
              cursor: 'pointer'
            }}>
              <img src="/image/tetris.png" style={{ width: '64px' }} alt="Tetris" />
              <h3>TETRIS</h3>
              <p>Click to Play</p>
            </div>
          </Link>

          {/* You can add more game links here in the future */}
        </div>
      </main>
    </div>
  );
}

export default GamesPage;
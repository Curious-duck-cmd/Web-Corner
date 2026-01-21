import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function GamesPage() {
  const games = [
    {
      name: 'TETRIS',
      path: '/tetris',
      color: '#50B6D1',
      image: '/image/tetris.png',
      description: 'Stack blocks and clear lines!'
    },
    {
      name: 'SNAKE',
      path: '/snake',
      color: '#89A8C7',
      image: '/image/snake-game.png',
      description: 'Eat food and grow longer!'
    },
    {
      name: 'PONG',
      path: '/pong',
      color: '#f6b4b4',
      image: '/image/ping-pong.png',
      description: 'Beat the AI in classic pong!'
    },
    
  ];

  const casinoGames = [
    {
      name: 'SLOT MACHINE',
      path: '/slotmachine',
      color: '#FFD700',
      image: '/image/slot-machine.png',
      description: 'Spin to win big jackpots!'
    },
    {
      name: 'ROULETTE',
      path: '/roulette',
      color: '#006400',
      image: '/image/roulette.png',
      description: 'Red or Black? Place your bets!'
    }
  ];

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

      <main>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          padding: '40px 20px',
          width: '100%'
        }}>
          <section style={{ width: '100%', maxWidth: '1000px' }}>
            <div className="windowTop" style={{ background: '#03274B' }}>
              <p style={{ color: '#fff' }}>Game_Selection.db</p>
              <div className="windowCircle">
                <div className="circle" style={{ background: '#fff' }}></div>
                <div className="circle" style={{ background: '#fff' }}></div>
                <div className="circle" style={{ background: '#fff' }}></div>
              </div>
            </div>
            
            <div className="windowContent">
              <h1 style={{ 
                marginBottom: '30px',
                fontSize: '2rem',
                textAlign: 'center',
                color: '#03274B'
              }}>
                🕹️ RETRO ARCADE
              </h1>
              
              <p style={{ 
                textAlign: 'center', 
                fontSize: '1.1rem', 
                marginBottom: '40px',
                opacity: 0.8 
              }}>
                Choose your game and try to beat the high score!
              </p>

              <h2 style={{ fontSize: '1.8rem', marginBottom: '20px', color: '#03274B' }}>
                🎮 CLASSIC ARCADE
              </h2>

              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '30px',
                marginBottom: '40px'
              }}>
                {games.map((game, index) => (
                  <Link 
                    key={game.name}
                    to={game.path} 
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <div 
                      className="post"
                      style={{ 
                        padding: '30px', 
                        border: '4px solid #000', 
                        boxShadow: '6px 6px 0px #000',
                        background: game.color,
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.3s ease',
                        animation: `slideIn 0.5s ease-out ${index * 0.1}s backwards`,
                        maxHeight: 'none'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-8px) rotate(-2deg)';
                        e.currentTarget.style.boxShadow = '10px 10px 0px #000';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0) rotate(0deg)';
                        e.currentTarget.style.boxShadow = '6px 6px 0px #000';
                      }}
                    >
                      <div style={{ marginBottom: '20px' }}>
                        <img 
                          src={game.image} 
                          alt={game.name}
                          style={{
                            width: '80px',
                            height: '80px',
                            objectFit: 'contain',
                            filter: 'drop-shadow(3px 3px 0px #000)'
                          }}
                        />
                      </div>
                      <h3 style={{ 
                        fontSize: '1.8rem', 
                        marginBottom: '10px',
                        color: '#000',
                        fontWeight: 'bold'
                      }}>
                        {game.name}
                      </h3>
                      <p style={{ 
                        fontSize: '1rem',
                        margin: 0,
                        color: '#000',
                        opacity: 0.8
                      }}>
                        {game.description}
                      </p>
                      <div style={{
                        marginTop: '20px',
                        padding: '10px',
                        background: '#000',
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: '0.9rem',
                        border: '2px solid #000'
                      }}>
                        CLICK TO PLAY ▶
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Casino Games Section */}
              <h2 style={{ fontSize: '1.8rem', marginTop: '50px', marginBottom: '20px', color: '#ff0000' }}>
                🎰 CASINO GAMES
              </h2>

              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '30px',
                marginBottom: '40px'
              }}>
                {casinoGames.map((game, index) => (
                  <Link 
                    key={game.name}
                    to={game.path} 
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <div 
                      className="post"
                      style={{ 
                        padding: '30px', 
                        border: '4px solid #000', 
                        boxShadow: '6px 6px 0px #000',
                        background: game.color,
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.3s ease',
                        animation: `slideIn 0.5s ease-out ${index * 0.1}s backwards`,
                        maxHeight: 'none'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-8px) rotate(-2deg)';
                        e.currentTarget.style.boxShadow = '10px 10px 0px #000';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0) rotate(0deg)';
                        e.currentTarget.style.boxShadow = '6px 6px 0px #000';
                      }}
                    >
                      <div style={{ marginBottom: '20px' }}>
                        <img 
                          src={game.image} 
                          alt={game.name}
                          style={{
                            width: '80px',
                            height: '80px',
                            objectFit: 'contain',
                            filter: 'drop-shadow(3px 3px 0px #000)'
                          }}
                        />
                      </div>
                      <h3 style={{ 
                        fontSize: '1.8rem', 
                        marginBottom: '10px',
                        color: '#000',
                        fontWeight: 'bold'
                      }}>
                        {game.name}
                      </h3>
                      <p style={{ 
                        fontSize: '1rem',
                        margin: 0,
                        color: '#000',
                        opacity: 0.8
                      }}>
                        {game.description}
                      </p>
                      <div style={{
                        marginTop: '20px',
                        padding: '10px',
                        background: '#000',
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: '0.9rem',
                        border: '2px solid #000'
                      }}>
                        CLICK TO PLAY ▶
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Game Stats */}
              <div style={{
                padding: '25px',
                background: '#03274B',
                border: '2px solid #000',
                borderRadius: '5px',
                boxShadow: '6px 6px 0px #000',
                textAlign: 'center'
              }}>
                <h3 style={{ 
                  color: '#fff', 
                  marginBottom: '15px',
                  fontSize: '1.4rem'
                }}>
                  🏆 YOUR HIGH SCORES
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: '15px'
                }}>
                  <div style={{ color: '#fff' }}>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#50B6D1', margin: 0 }}>
                      {localStorage.getItem('tetrisHighScore') || 0}
                    </p>
                    <p style={{ fontSize: '0.9rem', margin: 0 }}>Tetris</p>
                  </div>
                  <div style={{ color: '#fff' }}>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#89A8C7', margin: 0 }}>
                      {localStorage.getItem('snakeHighScore') || 0}
                    </p>
                    <p style={{ fontSize: '0.9rem', margin: 0 }}>Snake</p>
                  </div>
                  <div style={{ color: '#fff' }}>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#FFA0A0', margin: 0 }}>
                      {localStorage.getItem('pongWins') || 0}
                    </p>
                    <p style={{ fontSize: '0.9rem', margin: 0 }}>Pong Wins</p>
                  </div>
                  
                </div>
              </div>

              {/* Instructions */}
              <div className="separate" style={{ marginTop: '30px' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#03274B' }}>
                  🎮 ARCADE TIPS
                </h2>
                <div className="post" style={{ maxHeight: 'none' }}>
                  <ul style={{ listStylePosition: 'inside', fontSize: '1rem', lineHeight: '1.8' }}>
                    <li>All games work on both desktop and mobile devices</li>
                    <li>Use arrow keys on desktop, touch controls on mobile</li>
                    <li>High scores are saved automatically in your browser</li>
                    <li>Challenge yourself to beat your personal best!</li>
                    <li>Each game gets progressively harder as you score more points</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer style={{ textAlign: 'center', padding: '40px', marginTop: '20px' }}>
        <p style={{ color: '#565f89', fontSize: '0.9rem' }}>
          🕹️ Retro Arcade - {games.length} Games Available
        </p>
        <p style={{ color: '#565f89', fontSize: '0.8rem', marginTop: '10px', opacity: 0.6 }}>
          More games coming soon!
        </p>
      </footer>
    </div>
  );
}

export default GamesPage;
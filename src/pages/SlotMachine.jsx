import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function SlotMachine() {
  const [credits, setCredits] = useState(100);
  const [bet, setBet] = useState(10);
  const [spinning, setSpinning] = useState(false);
  const [reels, setReels] = useState(['🍒', '🍒', '🍒']);
  const [message, setMessage] = useState('Pull the lever to start!');
  const [totalWon, setTotalWon] = useState(0);

  const symbols = ['🍒', '🍋', '🍊', '🍇', '🔔', '💎', '7️⃣'];
  const spinningRef = useRef([]);

  useEffect(() => {
    const saved = localStorage.getItem('slotCredits');
    if (saved) setCredits(parseInt(saved));
    
    const savedWon = localStorage.getItem('slotTotalWon');
    if (savedWon) setTotalWon(parseInt(savedWon));
  }, []);

  const calculateWin = (result) => {
    const [r1, r2, r3] = result;
    
    // Jackpot - three 7s
    if (r1 === '7️⃣' && r2 === '7️⃣' && r3 === '7️⃣') {
      return bet * 50;
    }
    
    // Three diamonds
    if (r1 === '💎' && r2 === '💎' && r3 === '💎') {
      return bet * 25;
    }
    
    // Three of any same symbol
    if (r1 === r2 && r2 === r3) {
      return bet * 10;
    }
    
    // Two matching symbols
    if (r1 === r2 || r2 === r3 || r1 === r3) {
      return bet * 2;
    }
    
    return 0;
  };

  const getWinMessage = (winAmount) => {
    if (winAmount === 0) return 'Better luck next time!';
    if (winAmount >= bet * 50) return '🎉 JACKPOT! 🎉';
    if (winAmount >= bet * 20) return '💎 BIG WIN! 💎';
    if (winAmount >= bet * 10) return '🔥 GREAT WIN! 🔥';
    return '✨ You won! ✨';
  };

  const spin = () => {
    if (spinning || credits < bet) return;
    
    setSpinning(true);
    setCredits(credits - bet);
    setMessage('Spinning...');
    
    // Animate spinning
    let spinCount = 0;
    const maxSpins = 20;
    
    const spinInterval = setInterval(() => {
      setReels([
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)]
      ]);
      
      spinCount++;
      
      if (spinCount >= maxSpins) {
        clearInterval(spinInterval);
        
        // Final result
        const finalReels = [
          symbols[Math.floor(Math.random() * symbols.length)],
          symbols[Math.floor(Math.random() * symbols.length)],
          symbols[Math.floor(Math.random() * symbols.length)]
        ];
        
        setReels(finalReels);
        
        const winAmount = calculateWin(finalReels);
        const newCredits = credits - bet + winAmount;
        
        setCredits(newCredits);
        localStorage.setItem('slotCredits', newCredits.toString());
        
        if (winAmount > 0) {
          const newTotal = totalWon + winAmount;
          setTotalWon(newTotal);
          localStorage.setItem('slotTotalWon', newTotal.toString());
        }
        
        setMessage(getWinMessage(winAmount) + (winAmount > 0 ? ` Won: ${winAmount} credits!` : ''));
        setSpinning(false);
      }
    }, 100);
  };

  const resetCredits = () => {
    setCredits(100);
    localStorage.setItem('slotCredits', '100');
    setMessage('Credits reset to 100!');
  };

  return (
    <div className="portfolio-wrapper">
      <header>
        <div className="windowTop">
          <p>
            <img src="/image/Map_Pin_Grub.png" style={{ width: '18px', verticalAlign: 'middle', marginRight: '5px' }} alt="" />
            Casino_Games.exe
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
        <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 20px', width: '100%' }}>
          <section style={{ width: '100%', maxWidth: '700px' }}>
            <div className="windowTop" style={{ background: '#03274B' }}>
              <p style={{ color: '#fff' }}>SLOT_MACHINE.bin</p>
              <div className="windowCircle">
                <div className="circle" style={{ background: '#fff' }}></div>
                <div className="circle" style={{ background: '#fff' }}></div>
                <div className="circle" style={{ background: '#fff' }}></div>
              </div>
            </div>
            
            <div className="windowContent" style={{ textAlign: 'center' }}>
              <h1 style={{ marginBottom: '20px', fontSize: '2rem', color: '#03274B' }}>
                🎰 SLOT MACHINE
              </h1>

              {/* Stats */}
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '15px',
                marginBottom: '30px'
              }}>
                <div style={{ 
                  padding: '15px', 
                  background: '#50B6D1', 
                  border: '2px solid #000',
                  boxShadow: '4px 4px 0px #000'
                }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>CREDITS</div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#000' }}>{credits}</div>
                </div>
                <div style={{ 
                  padding: '15px', 
                  background: '#FFA0A0', 
                  border: '2px solid #000',
                  boxShadow: '4px 4px 0px #000'
                }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>BET</div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{bet}</div>
                </div>
                <div style={{ 
                  padding: '15px', 
                  background: '#89A8C7', 
                  border: '2px solid #000',
                  boxShadow: '4px 4px 0px #000'
                }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>TOTAL WON</div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#000' }}>{totalWon}</div>
                </div>
              </div>

              {/* Slot Machine */}
              <div style={{
                background: '#e1e2e7',
                border: '4px solid #000',
                borderRadius: '10px',
                padding: '30px',
                marginBottom: '30px',
                boxShadow: '8px 8px 0px #000'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '20px',
                  marginBottom: '30px',
                  flexWrap: 'wrap'
                }}>
                  {reels.map((symbol, index) => (
                    <div
                      key={index}
                      style={{
                        width: '100px',
                        height: '120px',
                        background: '#cfd3da',
                        border: '3px solid #000',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '4rem',
                        borderRadius: '5px',
                        boxShadow: 'inset 3px 3px 5px rgba(0,0,0,0.2)',
                        animation: spinning ? 'spinReel 0.1s linear infinite' : 'none'
                      }}
                    >
                      {symbol}
                    </div>
                  ))}
                </div>

                {/* Message */}
                <div style={{
                  padding: '15px',
                  background: '#03274B',
                  border: '2px solid #000',
                  borderRadius: '5px',
                  marginBottom: '20px',
                  boxShadow: '4px 4px 0px #000'
                }}>
                  <p style={{ 
                    color: '#50B6D1', 
                    fontSize: '1.2rem', 
                    fontWeight: 'bold',
                    margin: 0
                  }}>
                    {message}
                  </p>
                </div>

                {/* Bet Controls */}
                <div style={{ marginBottom: '20px' }}>
                  <p style={{ fontWeight: 'bold', marginBottom: '10px', fontSize: '1.1rem', color: '#03274B' }}>
                    ADJUST BET:
                  </p>
                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {[5, 10, 25, 50].map(amount => (
                      <button
                        key={amount}
                        onClick={() => setBet(amount)}
                        className="loginBtn"
                        style={{
                          background: bet === amount ? '#50B6D1' : '#fff',
                          border: '2px solid #000',
                          padding: '10px 20px',
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          boxShadow: '3px 3px 0px #000'
                        }}
                      >
                        {amount}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Spin Button */}
                <button
                  onClick={spin}
                  disabled={spinning || credits < bet}
                  className="loginBtn"
                  style={{
                    fontSize: '1.3rem',
                    padding: '15px 40px',
                    background: spinning || credits < bet ? '#ccc' : '#FFA0A0',
                    color: '#000',
                    border: '3px solid #000',
                    fontWeight: 'bold',
                    cursor: spinning || credits < bet ? 'not-allowed' : 'pointer',
                    boxShadow: '5px 5px 0px #000',
                    marginBottom: '15px'
                  }}
                >
                  {spinning ? '🎰 SPINNING...' : '🎰 SPIN'}
                </button>

                {credits < bet && (
                  <div style={{ marginTop: '10px' }}>
                    <p style={{ color: '#FFA0A0', fontWeight: 'bold', marginBottom: '10px' }}>
                      Not enough credits!
                    </p>
                    <button
                      onClick={resetCredits}
                      className="loginBtn"
                      style={{
                        background: '#50B6D1',
                        border: '2px solid #000',
                        padding: '10px 20px',
                        boxShadow: '3px 3px 0px #000'
                      }}
                    >
                      Reset Credits
                    </button>
                  </div>
                )}
              </div>

              {/* Paytable */}
              <div className="separate" style={{ textAlign: 'left' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#03274B' }}>
                  💰 PAYTABLE
                </h2>
                <div className="post" style={{ maxHeight: 'none' }}>
                  <div style={{ fontSize: '1rem', lineHeight: '1.8' }}>
                    <p><b>7️⃣ 7️⃣ 7️⃣</b> → Bet × 50 (JACKPOT!)</p>
                    <p><b>💎 💎 💎</b> → Bet × 25</p>
                    <p><b>🔔 🔔 🔔</b> → Bet × 10</p>
                    <p><b>🍇 🍇 🍇</b> → Bet × 10</p>
                    <p><b>🍊 🍊 🍊</b> → Bet × 10</p>
                    <p><b>🍋 🍋 🍋</b> → Bet × 10</p>
                    <p><b>🍒 🍒 🍒</b> → Bet × 10</p>
                    <p><b>Any 2 matching</b> → Bet × 2</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer style={{ textAlign: 'center', padding: '20px', marginTop: '40px' }}>
        <p style={{ color: '#565f89', fontSize: '0.9rem' }}>
          🎰 Slot Machine - Play Responsibly!
        </p>
      </footer>

      <style>{`
        @keyframes spinReel {
          0% { transform: translateY(0); }
          100% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
}

export default SlotMachine;
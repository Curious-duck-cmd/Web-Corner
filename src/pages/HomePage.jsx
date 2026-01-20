import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function HomePage() {
  const [isLoginOpen, setLoginOpen] = useState(false);

  return (
    <div className="portfolio-wrapper">
      <header>
        <div className="windowTop">
          <p>
            <img src="/image/Map_Pin_Grub.png" style={{ width: '20px', verticalAlign: 'middle', marginRight: '8px' }} alt="icon" /> 
            Darshan's_Web.exe
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
        <div className="container">
          {/* SIDEBAR */}
          <div className="sidecontent">
            <div className="windowTop">
              <p>About me</p>
              <div className="windowCircle">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
              </div>
            </div>
            <div className="windowContent">
              <h1>Darshan, student trying everything ...</h1>
              <img src="/image/Untitled.png" style={{ width: '275px', margin: '15px 0' }} alt="Darshan" />
              <p><b>&gt;&gt; Class: </b>Student, Gamer </p>
              <p><b>&gt;&gt; Level: </b>99</p>
              <p><b>&gt;&gt; Special Abilities: </b>gaming, drawing, writing </p>
              <br />
              <img src="/image/cat.gif" id="blinkies" alt="cat" />
              <p>I am someone who loves to learn and try new things. Come follow me on my side quests!</p>
              <div className="separate">
                <h1>Other places to find me</h1>
                <ul>
                  <li>
                    <a target="_blank" rel="noreferrer" href="https://www.instagram.com/da.rs.han">
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a target="_blank" rel="noreferrer" href="http://www.youtube.com/@xosmic5787">
                      YouTube Channel
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* MAIN CONTENT AREA */}
          <div className="content">
            <div className="windowTop">
              <p>Overview</p>
              <div className="windowCircle">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
              </div>
            </div>
            <div className="windowContent">
              <div className="post">
                <h1>What's going on here??</h1>
                <p>Heyo! Welcome to my website! I decided to create a personal corner in the web for myself to make something fun without the constraints of social media algorithms.</p>
                <p><b><i>In other words... It's my little space of creativity on the big interweb!</i></b></p>
              </div>
              <div className="post">
                <h1>What I'm working on:</h1>
                <p>Making this website!</p>
                <div className="progressBar">
                  <div className="progress" style={{ width: '40%' }}>
                    <p>40%</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="windowTop" style={{ marginTop: '20px' }}>
              <p>Fun things</p>
              <div className="windowCircle">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
              </div>
            </div>
            <div className="windowContent">
              <h1>Darshan's Book Shelf</h1>
              <div className="bookshelf">
                {/* Book 1 */}
                <div className="book-item">
                  <a target="_blank" rel="noreferrer" href="https://www.goodreads.com/book/show/36278177-record-of-a-spaceborn-few">
                    <div className="book-card">
                      <img src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1626027310i/36278177.jpg" alt="Spaceborn Few" />
                    </div>
                  </a>
                  <p className="book-title">Spaceborn Few</p>
                </div>

                {/* Book 2 */}
                <div className="book-item">
                  <a target="_blank" rel="noreferrer" href="https://www.goodreads.com/book/show/40189879-the-traitor-baru-cormorant">
                    <div className="book-card">
                      <img src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1526945167i/40189879.jpg" alt="Traitor Baru" />
                    </div>
                  </a>
                  <p className="book-title">Traitor Baru</p>
                </div>

                {/* Book 3 */}
                <div className="book-item">
                  <a target="_blank" rel="noreferrer" href="https://www.goodreads.com/book/show/32277642-the-king-in-yellow">
                    <div className="book-card">
                      <img src="https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1742853462i/32277642.jpg" alt="King in Yellow" />
                    </div>
                  </a>
                  <p className="book-title">King in Yellow</p>
                </div>
              </div>
              
              <div className="separate">
                <h1>Darshan's Go-To Music</h1>
                <div className="separate">
                <iframe
      data-testid="embed-iframe"
      style={{ borderRadius: '12px' }}
      src="https://open.spotify.com/embed/artist/3yY2gUcIsjMr8hjo51PoJ8?utm_source=generator&theme=0"
      width="100%"
      height="352"
      frameBorder="0"
      allowFullScreen
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <p style={{ fontSize: '1.5rem' }}>
          <i>"At the crossroads, don't turn left"</i>
        </p>
        
        <button 
          onClick={() => setLoginOpen(true)} 
          className="project-link" 
          style={{ 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer', 
            padding: '5px 10px',
            textDecoration: 'none',
            fontStyle: 'normal'
          }}
        >
          ADMIN LOGIN 🔑
        </button>
      </footer>
{/* LOGIN POPUP */}
      {isLoginOpen && (
  <div className="overlay">
    <div className="popupContainer" style={{ width: '450px' }}>
      
      {/* HEADER - Matches your Sidebar/Content headers */}
      <div className="windowTop" style={{ background: '#f96a6a' }}>
        <p style={{ color: 'white' }}>
          <span style={{ marginRight: '8px' }}></span> 
          System_Alert.exe
        </p>
        <div className="windowCircle">
          <div className="circle" style={{ background: '#fff' }}></div>
          <div className="circle" style={{ background: '#fff' }}></div>
          <div className="circle" style={{ background: '#fff' }}></div>
        </div>
      </div>

      {/* BODY - Matches your .windowContent and .post style */}
      <div className="windowContent popupBox">
        <div className="warning-blink" style={{ fontSize: '4rem', marginBottom: '10px' }}>⚠️</div>
        
        <h1 style={{ fontSize: '1.8rem', color: '#000' }}>RESTRICTED ACCESS</h1>

        <div className="admin-status-box" style={{ 
          background: '#03274B', 
          border: '2px solid #000', 
          padding: '15px', 
          margin: '20px 0',
          boxShadow: '4px 4px 0px #000'
        }}>
          <p style={{ color: '#50B6D1', margin: 0, fontWeight: 'bold' }}>
            [ ! ADMIN PRIVILEGES REQUIRED ! ]
          </p>
        </div>

        <p style={{ fontSize: '1.1rem', marginBottom: '30px' }}>
          This sector is encrypted. Please provide credentials or return to the terminal.
        </p>
        
        <div className="popupButtons" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <Link 
            to="/AdminLogin" 
            onClick={() => setLoginOpen(false)} 
            className="nav-a-style" /* Uses your existing nav styling logic */
            style={{ 
              background: '#50B6D1', 
              color: '#000', 
              padding: '15px', 
              border: '2px solid #000',
              boxShadow: '6px 6px 0px #000',
              textDecoration: 'none',
              fontWeight: 'bold',
              textAlign: 'center'
            }}
          >
            PROCEED TO LOGIN
          </Link>
          <button 
            onClick={() => setLoginOpen(false)} 
            className="loginBtn cancel"
            style={{ 
              width: '100%', 
              padding: '12px',
              fontSize: '1rem',
              backgroundColor: '#FFA0A0'
            }}
          >
            BACK TO SAFETY
          </button>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
}

export default HomePage;
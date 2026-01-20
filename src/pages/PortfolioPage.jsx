import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import "../App.css";

const PortfolioPage = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const skills = [
    { category: 'Engineering', items: 'C, C++, Logic Design' },
    { category: 'Web Development', items: 'HTML, CSS, Javascript, React' },
    { category: 'Tools', items: 'Git, VS Code, Figma' }
  ];

  return (
    <div className="portfolio-wrapper">
      <header>
        <div className="windowTop">
          <p>
            <img 
              src="/image/Map_Pin_Grub.png" 
              style={{ width: '18px', verticalAlign: 'middle', marginRight: '5px' }} 
              alt="" 
            /> 
            Darshan_Gyawali_v2.exe
          </p>
          <div className="windowCircle">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
        </div>
        
        <div className="windowContent">
          <nav>
            <Link to="/">
              <img src="/image/home.png" className="nav-icon" alt="" /> 
              <span>Home</span>
            </Link>
            <Link to="/projects">
              <img src="/image/made.png" className="nav-icon" alt="" /> 
              <span>Projects</span>
            </Link>
            <Link to="/portfolio">
              <img src="/image/me.png" className="nav-icon" alt="" /> 
              <span>Portfolio</span>
            </Link>
            <Link to="/chat">
              <img src="/image/babble.png" className="nav-icon" alt="" /> 
              <span>Chat</span>
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <div className="container">
          {/* Profile Card Sidebar */}
          <aside className="sidecontent">
            <div className="windowTop" style={{ background: '#FFA0A0' }}>
              <p>Profile_Card.sys</p>
              <div className="windowCircle">
                <div className="circle" style={{ background: '#89A8C7' }}></div>
                <div className="circle" style={{ background: '#89A8C7' }}></div>
                <div className="circle" style={{ background: '#89A8C7' }}></div>
              </div>
            </div>
            <div className="windowContent">
              <img 
                src="/image/self.jpg" 
                style={{ 
                  width: '100%', 
                  borderBottom: '2px solid #000', 
                  background: 'white',
                  transition: 'transform 0.3s ease'
                }} 
                alt="Self"
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              />
              <div className="separate">
                <p><b>NAME:</b> Darshan Gyawali</p>
                <p><b>ROLE:</b> Computer Engineering Student</p>
                <p><b>LOC:</b> Imadol, Lalitpur, Nepal</p>
                <p><b>STACK:</b> HTML, CSS, JS, React</p>
                <p style={{ marginTop: '15px', fontSize: '0.9rem', opacity: 0.7 }}>
                  <b>STATUS:</b> <span style={{ color: '#50B6D1' }}>● Available</span>
                </p>
              </div>

              {/* Quick Links Section */}
              <div className="separate" style={{ marginTop: '30px' }}>
                <h2 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Quick Links</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <a 
                    href="https://github.com/Curious-duck-cmd" 
                    target="_blank" 
                    rel="noreferrer"
                    style={{
                      padding: '8px 12px',
                      background: '#fff',
                      border: '2px solid #000',
                      textDecoration: 'none',
                      color: '#000',
                      fontSize: '0.9rem',
                      textAlign: 'center',
                      boxShadow: '3px 3px 0px #000',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '5px 5px 0px #50B6D1';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '3px 3px 0px #000';
                    }}
                  >
                    📁 GitHub
                  </a>
                  <a 
                    href="mailto:darshangyawali44@gmail.com"
                    style={{
                      padding: '8px 12px',
                      background: '#fff',
                      border: '2px solid #000',
                      textDecoration: 'none',
                      color: '#000',
                      fontSize: '0.9rem',
                      textAlign: 'center',
                      boxShadow: '3px 3px 0px #000',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '5px 5px 0px #50B6D1';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '3px 3px 0px #000';
                    }}
                  >
                    ✉️ Email
                  </a>
                  <a 
                    href="/assets/About Me.pdf" 
                    download
                    style={{
                      padding: '8px 12px',
                      background: '#50B6D1',
                      border: '2px solid #000',
                      textDecoration: 'none',
                      color: '#000',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      boxShadow: '3px 3px 0px #000',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '5px 5px 0px #FFA0A0';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '3px 3px 0px #000';
                    }}
                  >
                    📄 Download CV
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <section className="content">
            {/* About Section */}
            <div className="windowTop" style={{ background: '#03274B' }}>
              <p style={{ color: '#fff' }}>About_Developer.txt</p>
              <div className="windowCircle">
                <div className="circle" style={{ background: '#fff' }}></div>
                <div className="circle" style={{ background: '#fff' }}></div>
                <div className="circle" style={{ background: '#fff' }}></div>
              </div>
            </div>
            <div className="windowContent">
              <h2 style={{ fontSize: '1.8rem', marginBottom: '15px', color: '#03274B' }}>
                EXECUTIVE SUMMARY
              </h2>
              <p style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
                Computer engineering student currently exploring different areas of technology 
                through coursework and academic learning. Passionate about web development, 
                programming, and creating interactive experiences.
              </p>

              {/* Academic Background */}
              <div className="separate">
                <h2 style={{ fontSize: '1.6rem', marginBottom: '15px', color: '#03274B' }}>
                  ACADEMIC BACKGROUND
                </h2>
                <div className="post" style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div>
                      <p style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '5px' }}>
                        Bachelor of Computer Engineering
                      </p>
                      <p style={{ fontSize: '1.1rem', color: '#666' }}>
                        Kathford International College
                      </p>
                    </div>
                    <span style={{ 
                      background: '#50B6D1', 
                      padding: '5px 10px', 
                      border: '2px solid #000',
                      fontSize: '0.9rem',
                      fontWeight: 'bold'
                    }}>
                      2021 - Present
                    </span>
                  </div>
                </div>
                
                <div className="post">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div>
                      <p style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '5px' }}>
                        +2 Science
                      </p>
                      <p style={{ fontSize: '1.1rem', color: '#666' }}>
                        Milestone International College
                      </p>
                    </div>
                    <span style={{ 
                      background: '#FFA0A0', 
                      padding: '5px 10px', 
                      border: '2px solid #000',
                      fontSize: '0.9rem',
                      fontWeight: 'bold'
                    }}>
                      2020 - 2021
                    </span>
                  </div>
                </div>
              </div>

              {/* Technical Skills */}
              <div className="separate">
                <h2 style={{ fontSize: '1.6rem', marginBottom: '15px', color: '#03274B' }}>
                  TECHNICAL SKILLS
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
                  {skills.map((skill, index) => (
                    <div 
                      key={index}
                      className="post"
                      style={{
                        background: hoveredSkill === index ? '#fff' : '#cfd3da',
                        transition: 'all 0.3s ease',
                        transform: hoveredSkill === index ? 'translateX(5px)' : 'translateX(0)',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={() => setHoveredSkill(index)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <p style={{ fontSize: '1.2rem', marginBottom: '5px' }}>
                        <b style={{ color: '#03274B' }}>{skill.category}:</b>
                      </p>
                      <p style={{ fontSize: '1.1rem', color: '#333' }}>{skill.items}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interests Section */}
              <div className="separate">
                <h2 style={{ fontSize: '1.6rem', marginBottom: '15px', color: '#03274B' }}>
                  INTERESTS & HOBBIES
                </h2>
                <div className="post">
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                    gap: '10px'
                  }}>
                    {['🎮 Gaming', '✍️ Writing', '🎨 Drawing', '📚 Reading', '💻 Coding', '🎵 Music'].map((hobby, idx) => (
                      <div 
                        key={idx}
                        style={{
                          padding: '10px',
                          background: '#fff',
                          border: '1px solid #000',
                          textAlign: 'center',
                          fontSize: '0.9rem',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'scale(1.05)';
                          e.target.style.background = '#50B6D1';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'scale(1)';
                          e.target.style.background = '#fff';
                        }}
                      >
                        {hobby}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ 
        textAlign: 'center', 
        padding: '40px 20px', 
        borderTop: '2px solid #50B6D1', 
        marginTop: '40px',
        background: 'rgba(26, 27, 38, 0.5)'
      }}>
        <p style={{ fontSize: '1.2rem', marginBottom: '20px', color: '#e1e2e7' }}>
          <b>Let's Connect!</b>
        </p>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '20px', 
          flexWrap: 'wrap',
          marginBottom: '20px'
        }}>
          <a href="https://github.com/Curious-duck-cmd" 
             target="_blank" 
             rel="noreferrer" 
             className="project-link"
             style={{ color: '#50B6D1' }}>
             VIEW_GITHUB_REPOS →
          </a>

          <a href="mailto:darshangyawali44@gmail.com" 
             className="project-link"
             style={{ color: '#50B6D1' }}>
             SEND_EMAIL →
          </a>

          <a href="/assets/About Me.pdf" 
             download 
             className="project-link"
             style={{ color: '#FFA0A0' }}>
             DOWNLOAD_CV.PDF ↓
          </a>
        </div>
        <p style={{ fontSize: '0.9rem', color: '#565f89', marginTop: '15px' }}>
          📞 Contact: 9869244510 | 📍 Location: Imadol, Lalitpur, Nepal
        </p>
        <p style={{ fontSize: '0.8rem', color: '#565f89', marginTop: '10px', opacity: 0.6 }}>
          © 2026 Darshan Gyawali | Built with React & Retro Vibes
        </p>
      </footer>
    </div>
  );
};

export default PortfolioPage;
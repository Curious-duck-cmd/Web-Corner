import React from 'react';
import { Link } from 'react-router-dom';
import './App.css'; 

function ProjectsPage() {
  return (
    <div className="home-root">
      {/* 1. TOP NAVIGATION BAR */}
      <header>
        <div className="windowTop">
          <p>
            <img 
              src="/image/Map_Pin_Grub.png" 
              style={{ width: '18px', verticalAlign: 'middle', marginRight: '5px' }} 
              alt="icon" 
            /> 
            Project_Manager.exe
          </p>
          <div className="windowCircle">
            <div className="circle"></div><div className="circle"></div><div className="circle"></div>
          </div>
        </div>
        <div className="windowContent header-main">
          <nav style={{ display: 'flex', gap: '20px', padding: '5px 10px' }}>
            <Link to="/" className="nav-item" style={{ textDecoration: 'none', color: '#000' }}>
              <img src="/image/home.png" alt="" style={{ width: '20px', verticalAlign: 'middle', marginRight: '5px' }} /> 
              <span>Home</span>
            </Link>
            <Link to="/chat" className="nav-item" style={{ textDecoration: 'none', color: '#000' }}>
              <img src="/image/babble.png" alt="" style={{ width: '20px', verticalAlign: 'middle', marginRight: '5px' }} /> 
              <span>Chat</span>
            </Link>
            <Link to="/projects" className="nav-item" style={{ textDecoration: 'none', color: '#000' }}>
              <img src="/image/made.png" alt="" style={{ width: '20px', verticalAlign: 'middle', marginRight: '5px' }} /> 
              <span>Projects</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* 2. CENTERED CONTENT WINDOW */}
      <main>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', padding: '40px 20px' }}>
          <section className="content" style={{ width: '100%', maxWidth: '950px' }}> {/* INCREASED WIDTH HERE */}
            
            {/* Inner Window Blue Header */}
            <div className="windowTop" style={{ background: '#03274B' }}>
              <p style={{ color: '#fff' }}>Source_Code_Archive.lnk</p>
              <div className="windowCircle">
                <div className="circle" style={{ background: '#fff' }}></div>
                <div className="circle" style={{ background: '#fff' }}></div>
                <div className="circle" style={{ background: '#fff' }}></div>
              </div>
            </div>

            {/* Inner Window Main Body */}
            <div className="windowContent" style={{ background: '#e1e2e7', padding: '30px', border: '2px solid #000', boxShadow: '12px 12px 0px #000' }}>
              <h2 style={{ marginTop: 0, fontSize: '1.8rem' }}>SELECTED WORKS</h2>
              <p style={{ fontSize: '1.1rem', marginBottom: '25px' }}>
                A collection of applications focusing on real-time data and cloud integration.
              </p>

              <div className="separate" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
                
                {/* Project 01 */}
                <div className="post" style={{ background: '#fff', padding: '20px', border: '1px solid #000' }}>
                  <h3>01. Personal OS Portfolio</h3>
                  <p><b>Tech:</b> HTML5, CSS3, React</p>
                  <p>A high-performance portfolio site designed with a 90s operating system aesthetic.</p>
                  <a href="#" className="project-link">LAUNCH_PROJECT →</a>
                </div>

                {/* Project 02 */}
                <div className="post" style={{ background: '#fff', padding: '20px', border: '1px solid #000' }}>
                  <h3>02. Retro Chat Hub</h3>
                  <p><b>Tech:</b> Supabase Auth, PostgreSQL, Realtime API</p>
                  <p>A functional real-time communication platform with secure user sessions.</p>
                  <Link to="/chat" className="project-link">OPEN_CHAT_APP →</Link>
                </div>

                {/* Project 03 */}
                <div className="post" style={{ background: '#fff', padding: '20px', border: '1px solid #000' }}>
                  <h3>03. Dynamic Media Gallery</h3>
                  <p><b>Tech:</b> Supabase Storage, RLS Policies</p>
                  <p>A cloud-connected gallery handling secure image uploads and storage.</p>
                  <a href="#" className="project-link">VIEW_GALLERY_COLLECTION →</a>
                </div>
                
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer style={{ textAlign: 'center', marginTop: '20px', paddingBottom: '30px' }}>
        <p style={{ color: '#fff', fontSize: '0.8rem', opacity: 0.6 }}>
          <b>System Status:</b> Operational [Build 2026.01]
        </p>
      </footer>
    </div>
  );
}

export default ProjectsPage;
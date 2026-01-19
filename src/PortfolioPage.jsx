import React from 'react';

const PortfolioPage = ({ onBack }) => {
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
  
</header>
      <main>
        <div className="container">
          <aside className="sidecontent">
            <div className="windowTop" style={{ background: '#FFA0A0' }}>
              <p>Profile_Card.sys</p>
            </div>
            <div className="windowContent">
              <img src="/image/self.jpg" style={{ width: '100%', borderBottom: '2px solid #000', background: 'white' }} alt="Self" />
              <div className="separate">
                <p><b>NAME:</b> Darshan Gyawali</p>
                <p><b>ROLE:</b> Computer Engineering Student</p>
                <p><b>LOC:</b> Imadol, Lalitpur, Nepal</p>
                <p><b>STACK:</b> HTML, CSS, JS, React</p>
              </div>
            </div>
          </aside>

          <section className="content">
            <div className="windowTop" style={{ background: '#03274B' }}>
              <p style={{ color: '#fff' }}>About_Developer.txt</p>
            </div>
            <div className="windowContent">
              <h2>EXECUTIVE SUMMARY</h2>
              <p>Computer engineering student currently exploring different areas of technology through coursework and academic learning.</p>

              <div className="separate">
                <h2>ACADEMIC BACKGROUND</h2>
                <div className="post">
                  <p><b>Bachelor of Computer Engineering</b></p>
                  <p>Kathford Int'l College (2021 - Present)</p>
                </div>
                <div className="post">
                  <p><b>+2 Science</b></p>
                  <p>Milestone Int'l College (2020 - 2021)</p>
                </div>
              </div>

              <div className="separate">
                <h2>TECHNICAL SKILLS</h2>
                <div className="post">
                  <p><b>Engineering:</b> C, C++, Logic Design</p>
                  <p><b>Web:</b> HTML, CSS, Javascript</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer style={{ textAlign: 'center', padding: '20px', borderTop: '1px solid #ccc', marginTop: '20px' }}>
    <p><b>Explore my source code or get in touch:</b></p>
    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
        
        <a href="https://github.com/Curious-duck-cmd" 
           target="_blank" 
           rel="noreferrer" 
           className="project-link">
           VIEW_GITHUB_REPOS →
        </a>

        <a href="mailto:darshangyawali44@gmail.com" 
           className="project-link">
           SEND_EMAIL →
        </a>

        <a href="/assets/About Me.pdf" 
           download 
           className="project-link">
           DOWNLOAD_CV.PDF ↓
        </a>
        
    </div>
    <p style={{ fontSize: '11px', marginTop: '15px', color: '#666' }}>
        Contact: 9869244510 | Location: Imadol, Lalitpur
    </p>
</footer>
    
    </div>
  );
};

export default PortfolioPage;
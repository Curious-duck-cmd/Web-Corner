import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function ProjectsPage() {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'Personal OS Portfolio',
      tech: 'HTML5, CSS3, React',
      description: 'A high-performance portfolio site designed with a 90s operating system aesthetic featuring retro window components and pixel-perfect styling.',
      link: '/',
      tags: ['web', 'design'],
      status: 'Live',
      color: '#50B6D1'
    },
    {
      id: 2,
      title: 'Retro Chat Hub',
      tech: 'Supabase Auth, PostgreSQL, Realtime API',
      description: 'A functional real-time communication platform with secure user sessions, message history, and live updates powered by Supabase.',
      link: '/chat',
      tags: ['web', 'backend'],
      status: 'Live',
      color: '#FFA0A0'
    },
    {
      id: 3,
      title: 'Dynamic Media Gallery',
      tech: 'Supabase Storage, RLS Policies',
      description: 'A cloud-connected gallery handling secure image uploads and storage with row-level security and optimized media delivery.',
      link: '#',
      tags: ['web', 'backend'],
      status: 'In Progress',
      color: '#89A8C7'
    },
    {
      id: 4,
      title: 'Task Manager CLI',
      tech: 'C++, File I/O',
      description: 'Command-line task management tool with persistent storage, priority queuing, and efficient data structures.',
      link: '#',
      tags: ['systems'],
      status: 'Completed',
      color: '#50B6D1'
    },
    {
      id: 5,
      title: 'Weather Dashboard',
      tech: 'React, API Integration',
      description: 'Real-time weather application with location-based forecasts, interactive maps, and detailed climate data visualization.',
      link: '#',
      tags: ['web', 'api'],
      status: 'In Progress',
      color: '#FFA0A0'
    },
    {
      id: 6,
      title: 'Logic Circuit Simulator',
      tech: 'Digital Logic, Circuit Design',
      description: 'Educational tool for designing and testing digital logic circuits with real-time simulation and waveform visualization.',
      link: '#',
      tags: ['systems', 'education'],
      status: 'Completed',
      color: '#89A8C7'
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.tags.includes(activeFilter));

  return (
    <div className="portfolio-wrapper">
      {/* Header Navigation */}
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

      {/* Main Content */}
      <main>
        <div className="container" style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          padding: '40px 20px' 
        }}>
          <section className="content" style={{ width: '100%', maxWidth: '1100px' }}>
            
            {/* Window Header */}
            <div className="windowTop" style={{ background: '#03274B' }}>
              <p style={{ color: '#fff' }}>Source_Code_Archive.lnk</p>
              <div className="windowCircle">
                <div className="circle" style={{ background: '#fff' }}></div>
                <div className="circle" style={{ background: '#fff' }}></div>
                <div className="circle" style={{ background: '#fff' }}></div>
              </div>
            </div>

            {/* Window Content */}
            <div className="windowContent" style={{ 
              background: '#e1e2e7', 
              padding: '40px', 
              border: '2px solid #000', 
              boxShadow: '12px 12px 0px #000' 
            }}>
              <h2 style={{ marginTop: 0, fontSize: '2rem', color: '#03274B' }}>
                SELECTED WORKS
              </h2>
              <p style={{ fontSize: '1.2rem', marginBottom: '30px', color: '#333' }}>
                A collection of applications focusing on real-time data, cloud integration, and interactive experiences.
              </p>

              {/* Filter Buttons */}
              <div style={{ 
                display: 'flex', 
                gap: '10px', 
                marginBottom: '30px',
                flexWrap: 'wrap'
              }}>
                {['all', 'web', 'backend', 'systems', 'api', 'design', 'education'].map(filter => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    style={{
                      padding: '8px 16px',
                      background: activeFilter === filter ? '#50B6D1' : '#fff',
                      border: '2px solid #000',
                      boxShadow: activeFilter === filter ? '3px 3px 0px #000' : '2px 2px 0px #000',
                      cursor: 'pointer',
                      fontFamily: 'monospace',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      transition: 'all 0.2s ease',
                      color: '#000'
                    }}
                    onMouseEnter={(e) => {
                      if (activeFilter !== filter) {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '4px 4px 0px #000';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeFilter !== filter) {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '2px 2px 0px #000';
                      }
                    }}
                  >
                    {filter === 'all' ? '📁 All' : `#${filter}`}
                  </button>
                ))}
              </div>

              {/* Project Count */}
              <p style={{ 
                fontSize: '0.9rem', 
                marginBottom: '20px', 
                opacity: 0.6,
                fontFamily: 'monospace'
              }}>
                Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
              </p>

              {/* Projects Grid */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
                gap: '25px' 
              }}>
                {filteredProjects.map((project) => (
                  <div 
                    key={project.id}
                    className="post"
                    style={{ 
                      background: hoveredProject === project.id ? '#fff' : '#cfd3da',
                      padding: '25px',
                      border: '2px solid #000',
                      boxShadow: hoveredProject === project.id ? '8px 8px 0px ' + project.color : '4px 4px 0px #000',
                      transition: 'all 0.3s ease',
                      transform: hoveredProject === project.id ? 'translateY(-5px)' : 'translateY(0)',
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    {/* Status Badge */}
                    <div style={{
                      position: 'absolute',
                      top: '15px',
                      right: '15px',
                      padding: '4px 8px',
                      background: project.status === 'Live' ? '#50B6D1' : 
                                 project.status === 'In Progress' ? '#FFA0A0' : '#89A8C7',
                      border: '1px solid #000',
                      fontSize: '0.7rem',
                      fontWeight: 'bold',
                      textTransform: 'uppercase'
                    }}>
                      {project.status}
                    </div>

                    {/* Project Number */}
                    <h3 style={{ 
                      fontSize: '2rem', 
                      color: project.color,
                      marginBottom: '10px',
                      fontFamily: 'monospace'
                    }}>
                      {String(project.id).padStart(2, '0')}
                    </h3>

                    {/* Project Title */}
                    <h4 style={{ 
                      fontSize: '1.4rem', 
                      marginBottom: '10px',
                      color: '#000'
                    }}>
                      {project.title}
                    </h4>

                    {/* Tech Stack */}
                    <p style={{ 
                      fontSize: '0.9rem', 
                      marginBottom: '12px',
                      color: '#666'
                    }}>
                      <b>Tech:</b> {project.tech}
                    </p>

                    {/* Description */}
                    <p style={{ 
                      fontSize: '1rem', 
                      lineHeight: '1.5',
                      marginBottom: '15px',
                      color: '#333'
                    }}>
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div style={{ 
                      display: 'flex', 
                      gap: '8px', 
                      marginBottom: '15px',
                      flexWrap: 'wrap'
                    }}>
                      {project.tags.map(tag => (
                        <span 
                          key={tag}
                          style={{
                            padding: '3px 8px',
                            background: '#e1e2e7',
                            border: '1px solid #000',
                            fontSize: '0.75rem',
                            fontFamily: 'monospace'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Link */}
                    {project.link === '#' ? (
                      <span 
                        className="project-link"
                        style={{ 
                          color: '#999',
                          cursor: 'not-allowed',
                          opacity: 0.5
                        }}
                      >
                        COMING_SOON →
                      </span>
                    ) : (
                      <Link 
                        to={project.link} 
                        className="project-link"
                        style={{ fontSize: '1rem' }}
                      >
                        LAUNCH_PROJECT →
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {/* Empty State */}
              {filteredProjects.length === 0 && (
                <div style={{
                  textAlign: 'center',
                  padding: '60px 20px',
                  background: '#cfd3da',
                  border: '2px solid #000',
                  borderRadius: '5px'
                }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>
                    No projects found
                  </h3>
                  <p style={{ fontSize: '1rem', opacity: 0.7 }}>
                    Try selecting a different filter
                  </p>
                </div>
              )}

              {/* Stats Section */}
              <div className="separate" style={{ 
                marginTop: '40px',
                padding: '25px',
                background: '#03274B',
                border: '2px solid #000',
                borderRadius: '5px',
                boxShadow: '6px 6px 0px #000'
              }}>
                <h3 style={{ 
                  color: '#fff', 
                  marginBottom: '20px',
                  fontSize: '1.4rem'
                }}>
                  📊 PROJECT STATISTICS
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: '15px'
                }}>
                  <div style={{ textAlign: 'center', color: '#fff' }}>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#50B6D1' }}>
                      {projects.length}
                    </p>
                    <p style={{ fontSize: '0.9rem' }}>Total Projects</p>
                  </div>
                  <div style={{ textAlign: 'center', color: '#fff' }}>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#50B6D1' }}>
                      {projects.filter(p => p.status === 'Live').length}
                    </p>
                    <p style={{ fontSize: '0.9rem' }}>Live</p>
                  </div>
                  <div style={{ textAlign: 'center', color: '#fff' }}>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#FFA0A0' }}>
                      {projects.filter(p => p.status === 'In Progress').length}
                    </p>
                    <p style={{ fontSize: '0.9rem' }}>In Progress</p>
                  </div>
                  <div style={{ textAlign: 'center', color: '#fff' }}>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#89A8C7' }}>
                      {projects.filter(p => p.status === 'Completed').length}
                    </p>
                    <p style={{ fontSize: '0.9rem' }}>Completed</p>
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
        marginTop: '20px', 
        paddingBottom: '30px' 
      }}>
        <p style={{ 
          color: '#565f89', 
          fontSize: '0.9rem', 
          marginBottom: '10px' 
        }}>
          Want to collaborate on a project?
        </p>
        <a 
          href="mailto:darshangyawali44@gmail.com"
          className="project-link"
          style={{ fontSize: '1.1rem' }}
        >
          GET_IN_TOUCH →
        </a>
        <p style={{ 
          color: '#565f89', 
          fontSize: '0.8rem', 
          marginTop: '20px',
          opacity: 0.6 
        }}>
          <b>System Status:</b> Operational [Build 2026.01] | All systems running smoothly
        </p>
      </footer>
    </div>
  );
}

export default ProjectsPage;
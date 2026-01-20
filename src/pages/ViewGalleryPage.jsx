import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import '../App.css';

function ViewGalleryPage() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Database error:', error.message);
    } else {
      setImages(data || []);
    }
    setIsLoading(false);
  };

  return (
    <div className="portfolio-wrapper">
      <header>
        <div className="windowTop">
          <p>
            <img src="/image/Map_Pin_Grub.png" style={{ width: '18px', verticalAlign: 'middle', marginRight: '5px' }} alt="" />
            The Visual Vault.exe
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
            <Link to="/chat"><img src="/image/babble.png" className="nav-icon" alt="" /> <span>Chat</span></Link>
          </nav>
        </div>
      </header>

      <main>
        <div className="container" style={{ justifyContent: 'center' }}>
          <section className="content" style={{ width: '100%', maxWidth: '1000px' }}>
            <div className="windowTop" style={{ background: '#03274B' }}>
              <p style={{ color: '#fff' }}>Stored_Images.bin</p>
              <div className="windowCircle">
                <div className="circle" style={{ background: '#fff' }}></div>
                <div className="circle" style={{ background: '#fff' }}></div>
                <div className="circle" style={{ background: '#fff' }}></div>
              </div>
            </div>
            <div className="windowContent">
              {isLoading ? (
                <p style={{ textAlign: 'center', padding: '40px' }}>Accessing storage units...</p>
              ) : images.length === 0 ? (
                <p style={{ textAlign: 'center', padding: '40px', opacity: 0.6 }}>
                  No posts found. Add some in the dashboard!
                </p>
              ) : (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '25px'
                }}>
                  {images.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        border: '2px solid #000',
                        background: '#fff',
                        boxShadow: '5px 5px 0px #000',
                        transition: 'all 0.3s ease',
                        overflow: 'hidden'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-8px) rotate(-1deg)';
                        e.currentTarget.style.boxShadow = '8px 8px 0px #50B6D1';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0) rotate(0deg)';
                        e.currentTarget.style.boxShadow = '5px 5px 0px #000';
                      }}
                    >
                      <img
                        src={item.image_url}
                        alt="Gallery"
                        style={{
                          width: '100%',
                          height: '250px',
                          objectFit: 'cover',
                          display: 'block',
                          borderBottom: '2px solid #000'
                        }}
                        onError={(e) => {
                          e.target.src = 'https://placehold.co/400?text=Image+Not+Found';
                        }}
                      />
                      <div style={{ padding: '15px' }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '8px'
                        }}>
                          <span style={{
                            fontWeight: 'bold',
                            color: '#50B6D1',
                            fontSize: '1rem'
                          }}>
                            @{item.username || 'anonymous'}
                          </span>
                          <small style={{
                            opacity: 0.6,
                            fontSize: '0.75rem'
                          }}>
                            {new Date(item.created_at).toLocaleDateString()}
                          </small>
                        </div>
                        <p style={{
                          margin: '0',
                          fontSize: '0.95rem',
                          color: '#333',
                          lineHeight: '1.4'
                        }}>
                          {item.caption || ''}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      <footer style={{ textAlign: 'center', padding: '20px', marginTop: '40px' }}>
        <Link to="/gallery" className="project-link" style={{ fontSize: '1.1rem' }}>
          UPLOAD_NEW_IMAGE →
        </Link>
      </footer>
    </div>
  );
}

export default ViewGalleryPage;
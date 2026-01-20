import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import '../App.css';

function DashboardPage() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Blog states
  const [blogTitle, setBlogTitle] = useState('');
  const [blogMood, setBlogMood] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);

  // Gallery states
  const [username, setUsername] = useState('');
  const [caption, setCaption] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    setIsLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      // Not logged in, redirect to login
      navigate('/login');
    } else {
      setUser(user);
      setUsername(user.email.split('@')[0]);
    }
    setIsLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  // BLOG FUNCTIONS
  const publishBlog = async () => {
    if (!blogTitle || !blogContent) {
      alert('Fill in the title and content!');
      return;
    }

    setIsPublishing(true);
    const { error } = await supabase.from('blog_posts').insert([
      { title: blogTitle, mood: blogMood, content: blogContent }
    ]);

    if (error) {
      alert('Error: ' + error.message);
    } else {
      alert('Blog post published successfully!');
      setBlogTitle('');
      setBlogMood('');
      setBlogContent('');
    }
    setIsPublishing(false);
  };

  // GALLERY FUNCTIONS
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first!');
      return;
    }

    setIsUploading(true);

    try {
      // 1. Upload file to storage
      const fileName = `${Date.now()}-${file.name}`;
      const { data: storageData, error: storageErr } = await supabase.storage
        .from('chat-pics')
        .upload(fileName, file);

      if (storageErr) throw storageErr;

      // 2. Get public URL
      const { data: urlData } = supabase.storage
        .from('chat-pics')
        .getPublicUrl(fileName);

      // 3. Insert into database
      const { error: insertErr } = await supabase
        .from('gallery')
        .insert([
          {
            username: username || 'Admin',
            image_url: urlData.publicUrl,
            caption: caption || ''
          }
        ]);

      if (insertErr) throw insertErr;

      alert('Image uploaded successfully!');
      setCaption('');
      setFile(null);
      setPreview(null);
    } catch (err) {
      console.error('Upload Error:', err);
      alert('Upload Failed: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading) {
    return (
      <div style={{
        backgroundColor: '#1a1b26',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        fontFamily: 'monospace'
      }}>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="portfolio-wrapper">
      <header>
        <div className="windowTop">
          <p>
            <img src="/image/Map_Pin_Grub.png" style={{ width: '20px', verticalAlign: 'middle', marginRight: '8px' }} alt="icon" /> 
            Admin_Dashboard.exe
          </p>
          <div className="windowCircle">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
        </div>
        <div className="windowContent header-main">
          <nav>
            <Link to="/">
              <img src="/image/home.png" className="nav-icon" alt="" /> 
              <span>Home</span>
            </Link>
        
            <Link to="/chat">
              <img src="/image/babble.png" className="nav-icon" alt="" /> 
              <span>Chat</span>
            </Link>
            <button 
              onClick={handleLogout}
              style={{
                background: '#FFA0A0',
                border: '2px solid #000',
                padding: '0.8rem',
                fontFamily: 'monospace',
                fontSize: '1rem',
                cursor: 'pointer',
                fontWeight: 'bold',
                boxShadow: '4px 4px 0px #000',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '6px 6px 0px #000';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '4px 4px 0px #000';
              }}
            >
              🚪 LOGOUT
            </button>
          </nav>
        </div>
      </header>

      <main>
        <div className="container">
          {/* BLOG WRITING SECTION */}
          <aside className="sidecontent">
            <div className="windowTop" style={{ background: '#50B6D1' }}>
              <p>New_Blog_Entry.log</p>
              <div className="windowCircle">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
              </div>
            </div>
            <div className="windowContent">
              <div style={{ marginBottom: '15px', padding: '10px', background: '#fff', border: '2px solid #000' }}>
                <p style={{ fontSize: '0.8rem', margin: 0 }}>
                  <b>👤 Logged in as:</b> <span style={{ color: '#50B6D1' }}>{user?.email}</span>
                </p>
              </div>

              <div className="separate">
                <p><b>TITLE:</b></p>
                <input 
                  type="text" 
                  value={blogTitle}
                  onChange={(e) => setBlogTitle(e.target.value)}
                  placeholder="Entry Title..." 
                  style={{ 
                    width: '100%', 
                    padding: '10px', 
                    border: '2px solid #000',
                    fontFamily: 'monospace',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div className="separate">
                <p><b>MOOD:</b></p>
                <input 
                  type="text" 
                  value={blogMood}
                  onChange={(e) => setBlogMood(e.target.value)}
                  placeholder="e.g. Coding / Tired" 
                  style={{ 
                    width: '100%', 
                    padding: '10px', 
                    border: '2px solid #000',
                    fontFamily: 'monospace',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div className="separate">
                <p><b>CONTENT:</b></p>
                <textarea 
                  value={blogContent}
                  onChange={(e) => setBlogContent(e.target.value)}
                  placeholder="What's happening?"
                  style={{ 
                    width: '100%', 
                    height: '200px', 
                    resize: 'vertical',
                    padding: '10px',
                    border: '2px solid #000',
                    fontFamily: 'monospace',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <button 
                onClick={publishBlog}
                disabled={isPublishing}
                className="loginBtn"
                style={{ 
                  width: '100%', 
                  marginTop: '10px', 
                  background: '#03274B', 
                  color: 'white',
                  opacity: isPublishing ? 0.5 : 1,
                  fontSize: '1.1rem',
                  padding: '12px'
                }}
              >
                {isPublishing ? '📤 PUBLISHING...' : '📝 PUBLISH BLOG POST'}
              </button>
            </div>
          </aside>

          {/* IMAGE UPLOAD SECTION */}
          <section className="content">
            <div className="windowTop" style={{ background: '#03274B' }}>
              <p style={{ color: '#fff' }}>Upload_Image.exe</p>
              <div className="windowCircle">
                <div className="circle" style={{ background: '#fff' }}></div>
                <div className="circle" style={{ background: '#fff' }}></div>
                <div className="circle" style={{ background: '#fff' }}></div>
              </div>
            </div>
            <div className="windowContent">
              <h2 style={{ marginTop: 0 }}>📸 Gallery Image Upload</h2>
              
              <div className="separate">
                <p><b>NAME (optional):</b></p>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Display name"
                  style={{ 
                    width: '100%', 
                    padding: '10px', 
                    border: '2px solid #000', 
                    fontFamily: 'monospace',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div className="separate">
                <p><b>CAPTION:</b></p>
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Write a caption..."
                  style={{ 
                    width: '100%', 
                    height: '100px', 
                    resize: 'vertical', 
                    padding: '10px', 
                    border: '2px solid #000', 
                    fontFamily: 'monospace',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div className="separate">
                <p><b>SELECT IMAGE:</b></p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  id="fileInput"
                />
                <button
                  onClick={() => document.getElementById('fileInput').click()}
                  className="loginBtn"
                  style={{ 
                    width: '100%',
                    padding: '12px',
                    fontSize: '1.1rem'
                  }}
                >
                  📁 CHOOSE IMAGE FILE
                </button>

                {preview && (
                  <div style={{ 
                    marginTop: '15px', 
                    border: '2px solid #000', 
                    background: '#fff', 
                    padding: '10px' 
                  }}>
                    <p style={{ 
                      fontSize: '0.9rem', 
                      marginBottom: '10px',
                      fontWeight: 'bold',
                      color: '#50B6D1'
                    }}>
                      ✓ PREVIEW_LOADED.JPG
                    </p>
                    <img 
                      src={preview} 
                      style={{ 
                        width: '100%', 
                        display: 'block', 
                        border: '2px solid #000',
                        maxHeight: '400px',
                        objectFit: 'contain'
                      }} 
                      alt="Preview" 
                    />
                  </div>
                )}
              </div>

              <button
                onClick={handleUpload}
                disabled={isUploading || !file}
                className="loginBtn"
                style={{
                  width: '100%',
                  background: '#50B6D1',
                  color: '#000',
                  marginTop: '20px',
                  border: '2px solid #000',
                  opacity: (isUploading || !file) ? 0.5 : 1,
                  fontSize: '1.2rem',
                  padding: '15px',
                  fontWeight: 'bold'
                }}
              >
                {isUploading ? '⏳ UPLOADING...' : '🚀 POST TO GALLERY'}
              </button>

              {!file && (
                <p style={{ 
                  textAlign: 'center', 
                  marginTop: '15px', 
                  opacity: 0.6,
                  fontSize: '0.9rem'
                }}>
                  No file selected. Choose an image to upload.
                </p>
              )}
            </div>
          </section>
        </div>
      </main>

      <footer style={{ textAlign: 'center', padding: '40px', marginTop: '20px' }}>
        <p style={{ color: '#565f89', fontSize: '0.9rem' }}>
          🔒 Admin Dashboard - Authorized Access Only
        </p>
        <p style={{ color: '#565f89', fontSize: '0.8rem', marginTop: '10px' }}>
          All posts are public and visible on the homepage
        </p>
      </footer>
    </div>
  );
}

export default DashboardPage;
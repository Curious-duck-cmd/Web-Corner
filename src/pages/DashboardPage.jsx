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
    checkAdminAuth();
  }, []);

  const checkAdminAuth = async () => {
    setIsLoading(true);
    
    // 1. Check if a session exists
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      navigate('/login');
      return;
    }

    // 2. Verify admin role from the 'profiles' table we created in SQL
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    // 3. Strict Gatekeeping: If no profile or role is not admin, boot them
    if (profileError || profile?.role !== 'admin') {
      console.warn("Unauthorized access attempt blocked.");
      await supabase.auth.signOut(); // Force clear session
      navigate('/login');
    } else {
      // User is verified Admin
      setUser(user);
      setUsername(user.email.split('@')[0]);
      setIsLoading(false);
    }
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
    // This insert will only succeed if your RLS policies allow 'admin' role
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
      const fileName = `${Date.now()}-${file.name}`;
      
      // 1. Upload to storage
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
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        fontFamily: 'monospace'
      }}>
        <div className="spinner" style={{ marginBottom: '20px', border: '4px solid #f3f3f3', borderTop: '4px solid #50B6D1', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite' }}></div>
        <p>VERIFYING ADMIN CREDENTIALS...</p>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
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
                boxShadow: '4px 4px 0px #000'
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
                  <b>👤 ADMIN:</b> <span style={{ color: '#50B6D1' }}>{user?.email}</span>
                </p>
              </div>

              <div className="separate">
                <p><b>TITLE:</b></p>
                <input 
                  type="text" 
                  value={blogTitle}
                  onChange={(e) => setBlogTitle(e.target.value)}
                  placeholder="Entry Title..." 
                  className="auth-input"
                  style={{ width: '100%', marginBottom: '10px' }}
                />
              </div>

              <div className="separate">
                <p><b>MOOD:</b></p>
                <input 
                  type="text" 
                  value={blogMood}
                  onChange={(e) => setBlogMood(e.target.value)}
                  placeholder="e.g. Coding / Tired" 
                  className="auth-input"
                  style={{ width: '100%', marginBottom: '10px' }}
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
                    height: '150px', 
                    border: '2px solid #000',
                    fontFamily: 'monospace',
                    padding: '10px'
                  }}
                />
              </div>

              <button 
                onClick={publishBlog}
                disabled={isPublishing}
                className="loginBtn primary"
                style={{ width: '100%', marginTop: '10px' }}
              >
                {isPublishing ? 'PUBLISHING...' : '[ PUBLISH LOG ]'}
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
              <h2 style={{ marginTop: 0 }}>📸 Gallery Control Panel</h2>
              
              <div className="separate">
                <p><b>CAPTION:</b></p>
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Write a caption..."
                  className="auth-input"
                  style={{ width: '100%', height: '80px' }}
                />
              </div>

              <div className="separate" style={{ marginTop: '15px' }}>
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
                  style={{ width: '100%' }}
                >
                  📁 SELECT IMAGE
                </button>

                {preview && (
                  <div style={{ marginTop: '15px', border: '2px solid #000', padding: '10px', background: '#fff' }}>
                    <img src={preview} style={{ width: '100%', maxHeight: '300px', objectFit: 'contain' }} alt="Preview" />
                  </div>
                )}
              </div>

              <button
                onClick={handleUpload}
                disabled={isUploading || !file}
                className="loginBtn primary"
                style={{ width: '100%', marginTop: '20px', background: '#50B6D1' }}
              >
                {isUploading ? 'UPLOADING...' : '[ POST TO PUBLIC GALLERY ]'}
              </button>
            </div>
          </section>
        </div>
      </main>

      <footer style={{ textAlign: 'center', padding: '40px' }}>
        <p style={{ color: '#565f89', fontSize: '0.8rem' }}>
          🔒 SYSTEM STATUS: SECURE | ADMIN SESSION ACTIVE
        </p>
      </footer>
    </div>
  );
}

export default DashboardPage;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import '../App.css';

function GalleryPage() {
  const [images, setImages] = useState([]);
  const [username, setUsername] = useState('');
  const [caption, setCaption] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Fetch Error:', error.message);
    } else {
      setImages(data || []);
    }
  };

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
            username: username || 'Guest',
            image_url: urlData.publicUrl,
            caption: caption || ''
          }
        ]);

      if (insertErr) throw insertErr;

      alert('Post Successful!');
      setUsername('');
      setCaption('');
      setFile(null);
      setPreview(null);
      fetchGallery();
    } catch (err) {
      console.error('Upload Error:', err);
      alert('Upload Failed: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="portfolio-wrapper">
      <header>
        <div className="windowTop">
          <p>
            <img src="/image/Map_Pin_Grub.png" style={{ width: '18px', verticalAlign: 'middle', marginRight: '5px' }} alt="" />
            Image_Archive.exe
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
            <Link to="/view-gallery"><img src="/image/frame.png" className="nav-icon" alt="" /> <span>View Gallery</span></Link>
            <Link to="/chat"><img src="/image/babble.png" className="nav-icon" alt="" /> <span>Chat</span></Link>
          </nav>
        </div>
      </header>

      <main>
        <div className="container">
          <aside className="sidecontent">
            <div className="windowTop" style={{ background: '#FFA0A0' }}>
              <p>Upload_Console</p>
              <div className="windowCircle">
                <div className="circle" style={{ background: '#89A8C7' }}></div>
                <div className="circle" style={{ background: '#89A8C7' }}></div>
                <div className="circle" style={{ background: '#89A8C7' }}></div>
              </div>
            </div>
            <div className="windowContent">
              <div className="separate">
                <p><b>NAME:</b></p>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Guest"
                  style={{ width: '100%', marginBottom: '10px', padding: '10px', border: '2px solid #000', fontFamily: 'monospace' }}
                />
              </div>

              <div className="separate">
                <p><b>CAPTION:</b></p>
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Write a caption..."
                  style={{ width: '100%', height: '80px', resize: 'none', padding: '10px', border: '2px solid #000', fontFamily: 'monospace' }}
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
                  [ CHOOSE IMAGE ]
                </button>

                {preview && (
                  <div style={{ display: 'block', marginTop: '10px', border: '2px solid #000', background: '#fff', padding: '5px' }}>
                    <p style={{ fontSize: '10px', marginBottom: '5px' }}>PREVIEW_LOADED.JPG</p>
                    <img src={preview} style={{ width: '100%', display: 'block', border: '1px solid #000' }} alt="Preview" />
                  </div>
                )}
              </div>

              <button
                onClick={handleUpload}
                disabled={isUploading}
                className="loginBtn"
                style={{
                  width: '100%',
                  background: '#03274B',
                  color: 'white',
                  marginTop: '15px',
                  border: '2px solid #000',
                  opacity: isUploading ? 0.5 : 1
                }}
              >
                {isUploading ? 'UPLOADING...' : 'POST TO ARCHIVE'}
              </button>
            </div>
          </aside>

          <section className="content">
            <div className="windowTop" style={{ background: '#03274B' }}>
              <p style={{ color: '#fff' }}>Recent_Uploads.txt</p>
              <div className="windowCircle">
                <div className="circle" style={{ background: '#fff' }}></div>
                <div className="circle" style={{ background: '#fff' }}></div>
                <div className="circle" style={{ background: '#fff' }}></div>
              </div>
            </div>
            <div className="windowContent">
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '20px'
              }}>
                {images.length === 0 ? (
                  <p>No posts yet. Be the first!</p>
                ) : (
                  images.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        border: '2px solid #000',
                        background: '#fff',
                        boxShadow: '4px 4px 0px #000',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = '6px 6px 0px #000';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '4px 4px 0px #000';
                      }}
                    >
                      <img
                        src={item.image_url}
                        alt="Gallery"
                        style={{ width: '100%', display: 'block', borderBottom: '2px solid #000' }}
                        onError={(e) => {
                          e.target.src = 'https://placehold.co/400?text=Error+Loading+Image';
                        }}
                      />
                      <div style={{ padding: '10px' }}>
                        <span style={{ fontWeight: 'bold', color: '#50B6D1' }}>@{item.username}</span>
                        <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem' }}>{item.caption || ''}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default GalleryPage;
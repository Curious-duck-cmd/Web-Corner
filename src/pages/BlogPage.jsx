import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import '../App.css';

function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [mood, setMood] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading posts:', error);
    } else {
      setPosts(data || []);
    }
    setIsLoading(false);
  };

  const publishPost = async () => {
    if (!title || !content) {
      alert('Fill in the title and content!');
      return;
    }

    setIsPublishing(true);
    const { error } = await supabase.from('blog_posts').insert([
      { title, mood, content }
    ]);

    if (error) {
      alert(error.message);
    } else {
      setTitle('');
      setMood('');
      setContent('');
      loadPosts();
    }
    setIsPublishing(false);
  };

  return (
    <div className="portfolio-wrapper">
      <header>
        <div className="windowTop">
          <p>
            <img src="/image/Map_Pin_Grub.png" style={{ width: '18px', verticalAlign: 'middle', marginRight: '5px' }} alt="" /> 
            Life_Journal.exe
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
        <div className="container">
          <aside className="sidecontent">
            <div className="windowTop" style={{ background: '#FFA0A0' }}>
              <p>New_Entry.log</p>
              <div className="windowCircle">
                <div className="circle" style={{ background: '#89A8C7' }}></div>
                <div className="circle" style={{ background: '#89A8C7' }}></div>
                <div className="circle" style={{ background: '#89A8C7' }}></div>
              </div>
            </div>
            <div className="windowContent">
              <div className="separate">
                <p><b>TITLE:</b></p>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
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
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="What's happening?"
                  style={{ 
                    width: '100%', 
                    height: '150px', 
                    resize: 'none',
                    padding: '10px',
                    border: '2px solid #000',
                    fontFamily: 'monospace',
                    fontSize: '1rem'
                  }}
                />
              </div>
              <button 
                onClick={publishPost}
                disabled={isPublishing}
                className="loginBtn"
                style={{ 
                  width: '100%', 
                  marginTop: '10px', 
                  background: '#03274B', 
                  color: 'white',
                  opacity: isPublishing ? 0.5 : 1
                }}
              >
                {isPublishing ? 'PUBLISHING...' : 'PUBLISH LOG'}
              </button>
            </div>
          </aside>

          <section className="content">
            <div className="windowTop" style={{ background: '#03274B' }}>
              <p style={{ color: '#fff' }}>Journal_History.db</p>
              <div className="windowCircle">
                <div className="circle" style={{ background: '#fff' }}></div>
                <div className="circle" style={{ background: '#fff' }}></div>
                <div className="circle" style={{ background: '#fff' }}></div>
              </div>
            </div>
            <div className="windowContent">
              {isLoading ? (
                <p style={{ textAlign: 'center', padding: '20px' }}>Loading logs...</p>
              ) : posts.length === 0 ? (
                <p style={{ textAlign: 'center', padding: '40px', opacity: 0.6 }}>
                  No entries yet. Write your first log!
                </p>
              ) : (
                posts.map((post) => {
                  const date = new Date(post.created_at).toLocaleDateString();
                  return (
                    <div key={post.id} className="post" style={{ marginBottom: '20px' }}>
                      <div style={{ borderBottom: '2px solid #000', marginBottom: '10px', paddingBottom: '5px' }}>
                        <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>
                          {date} | Mood: {post.mood || 'Normal'}
                        </span>
                        <h2 style={{ margin: '5px 0' }}>&gt; {post.title}</h2>
                      </div>
                      <p style={{ whiteSpace: 'pre-wrap' }}>{post.content}</p>
                    </div>
                  );
                })
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default BlogPage;
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import '../ChatPage.css';

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("Guest");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  
  const chatDisplayRef = useRef(null);

  // 1. CHECK USER ON LOAD
  useEffect(() => {
    const checkUser = async () => {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        setUserName(user.email.split('@')[0]);
        loadMessages();
      }
      setIsLoading(false);
    };

    checkUser();

    // 2. REALTIME SUBSCRIPTION
    const channel = supabase
      .channel('public:messages')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'messages' }, 
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Auto-scroll when messages change
  useEffect(() => {
    if (chatDisplayRef.current) {
      chatDisplayRef.current.scrollTop = chatDisplayRef.current.scrollHeight;
    }
  }, [messages]);

  // 3. LOAD MESSAGE HISTORY
  const loadMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error("Database Error:", error.message);
    } else {
      setMessages(data);
    }
  };

  // 4. SEND MESSAGE
  const postMessage = async () => {
    if (inputText.trim() === "" || !user || isSending) return;

    setIsSending(true);
    const { error } = await supabase
      .from('messages')
      .insert([{ 
        username: userName, 
        content: inputText 
      }]);
    
    if (!error) {
      setInputText("");
    } else {
      alert("Error sending: " + error.message);
    }
    setIsSending(false);
  };

  // 5. LOGOUT LOGIC
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload(); 
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="chat-page-root">
      <main className="master-container">
        <div className="windowTop">
          <p>The_Corner_Chat</p>
          <div className="windowCircle">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
        </div>

        <div className="windowContent main-app-body">
          <div className="app-layout">
            
            {/* SIDE PANEL */}
            <aside className="side-panel">
              <div className="side-info">
                <h2>Active Channel</h2>
                <p>
                  <b>Status:</b> 
                  <span style={{ 
                    color: user ? '#50B6D1' : '#FFA0A0',
                    marginLeft: '5px'
                  }}>
                    {user ? '● Online' : '○ Offline'}
                  </span>
                </p>
                <p><b>Users:</b> {user ? 'Connected' : 'Not Connected'}</p>
                <p style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '10px' }}>
                  <b>Rules:</b> Be respectful, no spam
                </p>
              </div>

              <hr className="divider" />

              <div id="auth-section">
                {!user ? (
                  <div id="guest-view">
                    <p style={{ fontSize: '0.8rem', marginBottom: '10px' }}>
                      🔒 Access Restricted
                    </p>
                    <Link 
                      to="/login" 
                      className="loginBtn" 
                      style={{ 
                        display: 'block', 
                        textAlign: 'center', 
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        padding: '10px'
                      }}
                    >
                      GO TO LOGIN
                    </Link>
                  </div>
                ) : (
                  <div id="user-info">
                    <p style={{ fontSize: '0.7rem', opacity: 0.6 }}>AUTHORIZED AS:</p>
                    <p style={{ 
                      fontWeight: 'bold', 
                      color: '#50B6D1',
                      fontSize: '1.1rem',
                      margin: '5px 0 15px 0'
                    }}>
                      {userName}
                    </p>
                    <button 
                      onClick={handleLogout} 
                      className="loginBtn" 
                      style={{ 
                        fontSize: '0.8rem', 
                        width: '100%',
                        padding: '8px'
                      }}
                    >
                      [ LOGOUT ]
                    </button>
                  </div>
                )}
              </div>

              <Link to="/" className="gif-link" style={{ marginTop: 'auto' }}>
                <img src="/image/hornet-hollow-knight.gif" id="blinkies" alt="Retro GIF" />
              </Link>
            </aside>

            {/* CHAT AREA */}
            <section className="chat-area">
              {user ? (
                <>
                  {/* Message Display */}
                  <div className="chat-messages" ref={chatDisplayRef}>
                    {isLoading ? (
                      <div style={{ 
                        textAlign: 'center', 
                        padding: '20px',
                        opacity: 0.5 
                      }}>
                        <p>Loading messages...</p>
                      </div>
                    ) : messages.length === 0 ? (
                      <div style={{ 
                        textAlign: 'center', 
                        padding: '40px',
                        opacity: 0.5 
                      }}>
                        <p>No messages yet. Start the conversation! 💬</p>
                      </div>
                    ) : (
                      messages.map((msg) => (
                        <div key={msg.id} className="msg-bubble">
                          <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            alignItems: 'baseline',
                            marginBottom: '4px'
                          }}>
                            <b style={{ 
                              color: msg.username === userName ? '#50B6D1' : '#03274B',
                              fontSize: '0.95rem'
                            }}>
                              {msg.username}
                            </b>
                            <small style={{ 
                              opacity: 0.5,
                              fontSize: '0.75rem'
                            }}>
                              {formatTime(msg.created_at)}
                            </small>
                          </div>
                          <p style={{ 
                            margin: 0,
                            fontSize: '0.95rem',
                            wordWrap: 'break-word'
                          }}>
                            {msg.content}
                          </p>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Input Footer */}
                  <div className="chat-footer">
                    <input 
                      type="text" 
                      className="input-msg" 
                      placeholder="Type a message..." 
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && postMessage()}
                      disabled={isSending}
                    />
                    <button 
                      onClick={postMessage} 
                      className="loginBtn"
                      disabled={isSending || inputText.trim() === ""}
                      style={{
                        opacity: (isSending || inputText.trim() === "") ? 0.5 : 1,
                        cursor: (isSending || inputText.trim() === "") ? 'not-allowed' : 'pointer'
                      }}
                    >
                      {isSending ? 'SENDING...' : 'SEND'}
                    </button>
                  </div>
                </>
              ) : (
                // Locked View
                <div className="locked-channel">
                  <div className="locked-content">
                    <h1 style={{ fontSize: '3rem', margin: '0 0 20px 0' }}>🔒</h1>
                    <p style={{ fontSize: '1.2rem', marginBottom: '10px' }}>
                      PRIVATE_CHANNEL_LOCKED
                    </p>
                    <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>
                      Please login to decrypt and view messages.
                    </p>
                    <Link 
                      to="/login"
                      style={{
                        display: 'inline-block',
                        marginTop: '20px',
                        padding: '10px 20px',
                        background: '#50B6D1',
                        border: '2px solid #000',
                        color: '#000',
                        textDecoration: 'none',
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
                      AUTHENTICATE NOW
                    </Link>
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ChatPage;
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from './supabaseClient';
import './ChatPage.css';

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("Guest");
  
  // Ref to help auto-scroll the chat
  const chatDisplayRef = useRef(null);

  // 1. CHECK USER ON LOAD
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        setUserName(user.email.split('@')[0]);
        loadMessages();
      }
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
    if (inputText.trim() === "" || !user) return;

    const { error } = await supabase
      .from('messages')
      .insert([{ 
        username: userName, 
        content: inputText 
      }]);
    
    if (!error) {
      setInputText(""); // Clear input on success
    } else {
      alert("Error sending: " + error.message);
    }
  };

  // 5. LOGOUT LOGIC
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload(); 
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
                <p><b>Status:</b> Online</p>
                <p><b>Rules:</b> No spamming.</p>
              </div>

              <hr className="divider" />

              <div id="auth-section">
                {!user ? (
                  // Change your guest view button to this:
<div id="guest-view">
  <p style={{ fontSize: '0.8rem', marginBottom: '10px' }}>Access Restricted.</p>
  <Link 
    to="/login" 
    className="loginBtn" 
    style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}
  >
    GO TO LOGIN
  </Link>
</div>
                ) : (
                  <div id="user-info">
                    <p style={{ fontSize: '0.7rem', opacity: 0.6 }}>AUTHORIZED AS:</p>
                    <p style={{ fontWeight: 'bold', color: '#50B6D1' }}>{userName}</p>
                    <button onClick={handleLogout} className="loginBtn" style={{ fontSize: '10px', marginTop: '10px', width: '100%' }}>
                      [ LOGOUT ]
                    </button>
                  </div>
                )}
              </div>

              <Link to="/" className="gif-link">
                <img src="/image/hornet-hollow-knight.gif" id="blinkies" alt="Retro GIF" />
              </Link>
            </aside>

            {/* CHAT AREA */}
            <section className="chat-area">
              {user ? (
                <>
                  <div className="chat-messages" ref={chatDisplayRef}>
                    {messages.map((msg) => (
                      <div key={msg.id} className="msg-bubble">
                        <small style={{ opacity: 0.5 }}>
                          [{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}]
                        </small> 
                        <b> {msg.username}:</b> {msg.content}
                      </div>
                    ))}
                  </div>

                  <div className="chat-footer">
                    <input 
                      type="text" 
                      className="input-msg" 
                      placeholder="Type a message..." 
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && postMessage()}
                    />
                    <button onClick={postMessage} className="loginBtn">SEND</button>
                  </div>
                </>
              ) : (
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#1a1b26' }}>
                  <div style={{ textAlign: 'center', color: 'white', opacity: 0.5 }}>
                    <h1 style={{ fontSize: '3rem' }}>🔒</h1>
                    <p>PRIVATE_CHANNEL_LOCKED</p>
                    <p style={{ fontSize: '0.8rem', marginTop: '10px' }}>Please login to decrypt and view messages.</p>
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
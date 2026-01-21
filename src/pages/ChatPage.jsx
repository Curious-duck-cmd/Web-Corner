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
  const [showReactionPicker, setShowReactionPicker] = useState(null);
  
  const chatDisplayRef = useRef(null);

  const reactions = ['👍', '❤️', '😂', '😮', '😢', '🎉', '🔥', '👏'];

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

    const channel = supabase
      .channel('public:messages')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'messages' }, 
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .on('postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'messages' },
        (payload) => {
          setMessages((prev) => 
            prev.map(msg => msg.id === payload.new.id ? payload.new : msg)
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    if (chatDisplayRef.current) {
      chatDisplayRef.current.scrollTop = chatDisplayRef.current.scrollHeight;
    }
  }, [messages]);

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

  const postMessage = async () => {
    if (inputText.trim() === "" || !user || isSending) return;

    setIsSending(true);
    const { error } = await supabase
      .from('messages')
      .insert([{ 
        username: userName, 
        content: inputText,
        reactions: {}
      }]);
    
    if (!error) {
      setInputText("");
    } else {
      alert("Error sending: " + error.message);
    }
    setIsSending(false);
  };

  const addReaction = async (messageId, emoji) => {
    const message = messages.find(m => m.id === messageId);
    if (!message) return;

    const reactions = message.reactions || {};
    const userReaction = reactions[userName];

    let newReactions;
    if (userReaction === emoji) {
      // Remove reaction if clicking the same emoji
      const { [userName]: removed, ...rest } = reactions;
      newReactions = rest;
    } else {
      // Add or change reaction
      newReactions = { ...reactions, [userName]: emoji };
    }

    const { error } = await supabase
      .from('messages')
      .update({ reactions: newReactions })
      .eq('id', messageId);

    if (error) {
      console.error("Error updating reaction:", error);
    }

    setShowReactionPicker(null);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload(); 
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getReactionCounts = (reactions) => {
    if (!reactions) return {};
    const counts = {};
    Object.values(reactions).forEach(emoji => {
      counts[emoji] = (counts[emoji] || 0) + 1;
    });
    return counts;
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
                      messages.map((msg) => {
                        const reactionCounts = getReactionCounts(msg.reactions);
                        const userReaction = msg.reactions?.[userName];
                        
                        return (
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
                              wordWrap: 'break-word',
                              marginBottom: '8px'
                            }}>
                              {msg.content}
                            </p>
                            
                            {/* Reaction Display & Picker */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                              {/* Show existing reactions */}
                              {Object.entries(reactionCounts).map(([emoji, count]) => (
                                <button
                                  key={emoji}
                                  onClick={() => addReaction(msg.id, emoji)}
                                  style={{
                                    background: userReaction === emoji ? '#50B6D1' : '#fff',
                                    border: '1px solid #000',
                                    borderRadius: '12px',
                                    padding: '3px 8px',
                                    fontSize: '0.85rem',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    transition: 'all 0.2s ease'
                                  }}
                                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                                >
                                  {emoji} {count}
                                </button>
                              ))}
                              
                              {/* Add reaction button */}
                              <button
                                onClick={() => setShowReactionPicker(showReactionPicker === msg.id ? null : msg.id)}
                                style={{
                                  background: '#e1e2e7',
                                  border: '1px solid #000',
                                  borderRadius: '12px',
                                  padding: '3px 8px',
                                  fontSize: '0.85rem',
                                  cursor: 'pointer',
                                  transition: 'all 0.2s ease'
                                }}
                                onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                              >
                                ➕
                              </button>
                              
                              {/* Reaction Picker */}
                              {showReactionPicker === msg.id && (
                                <div style={{
                                  display: 'flex',
                                  gap: '4px',
                                  padding: '6px',
                                  background: '#fff',
                                  border: '2px solid #000',
                                  borderRadius: '8px',
                                  boxShadow: '4px 4px 0px #000',
                                  animation: 'popIn 0.2s ease-out'
                                }}>
                                  {reactions.map(emoji => (
                                    <button
                                      key={emoji}
                                      onClick={() => addReaction(msg.id, emoji)}
                                      style={{
                                        background: 'transparent',
                                        border: 'none',
                                        fontSize: '1.2rem',
                                        cursor: 'pointer',
                                        padding: '4px',
                                        transition: 'transform 0.2s ease'
                                      }}
                                      onMouseEnter={(e) => e.target.style.transform = 'scale(1.3)'}
                                      onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                                    >
                                      {emoji}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })
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

      <style>{`
        @keyframes popIn {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default ChatPage;
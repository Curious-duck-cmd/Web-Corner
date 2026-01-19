import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from './supabaseClient';
import './LoginPage.css'; // Import the new specific CSS

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else navigate('/chat');
  };

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else alert("Signup successful!");
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-window">
        {/* WINDOW HEADER */}
        <div className="windowTop" style={{ background: '#03274B', border: '2px solid #000', borderBottom: 'none' }}>
          <p style={{ color: '#fff', padding: '5px 15px' }}>Login_Session.sh</p>
        </div>

        {/* WINDOW BODY */}
        <div className="auth-content">
          <h1 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '1.5rem' }}>AUTHENTICATION</h1>
          
          <label><b>EMAIL:</b></label>
          <input 
            type="email" 
            className="auth-input" 
            placeholder="user@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <label><b>PASSWORD:</b></label>
          <input 
            type="password" 
            className="auth-input" 
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button onClick={handleSignIn} className="loginBtn" style={{ flex: 1, background: '#50B6D1' }}>
              [ LOGIN ]
            </button>
            <button onClick={handleSignUp} className="loginBtn" style={{ flex: 1 }}>
              [ SIGN UP ]
            </button>
          </div>

          <p style={{ fontSize: '0.7rem', marginTop: '20px', opacity: 0.6, textAlign: 'center' }}>
            Access restricted to authorized users only.
          </p>
          
          <div style={{ textAlign: 'center', marginTop: '15px' }}>
            <Link to="/chat" style={{ color: '#000', fontSize: '0.8rem' }}>← Return </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
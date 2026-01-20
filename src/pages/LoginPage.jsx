import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import '../LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate = useNavigate();

  const handleSignIn = async () => {
    if (!email || !password) {
      setMessage({ text: 'Please fill in all fields', type: 'error' });
      return;
    }

    setIsLoading(true);
    setMessage({ text: '', type: '' });

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    setIsLoading(false);

    if (error) {
      setMessage({ text: error.message, type: 'error' });
    } else {
      setMessage({ text: 'Login successful! Redirecting...', type: 'success' });
      setTimeout(() => navigate('/chat'), 1000);
    }
  };

  const handleSignUp = async () => {
    if (!email || !password) {
      setMessage({ text: 'Please fill in all fields', type: 'error' });
      return;
    }

    if (password.length < 6) {
      setMessage({ text: 'Password must be at least 6 characters', type: 'error' });
      return;
    }

    setIsLoading(true);
    setMessage({ text: '', type: '' });

    const { error } = await supabase.auth.signUp({ email, password });
    
    setIsLoading(false);

    if (error) {
      setMessage({ text: error.message, type: 'error' });
    } else {
      setMessage({ text: 'Signup successful! Please check your email for verification.', type: 'success' });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSignIn();
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-window">
        {/* WINDOW HEADER */}
        <div className="windowTop" style={{ background: '#03274B', border: '2px solid #000', borderBottom: 'none' }}>
          <p style={{ color: '#fff', padding: '5px 15px' }}>Login_Session.sh</p>
          <div className="windowCircle">
            <div className="circle" style={{ background: '#fff' }}></div>
            <div className="circle" style={{ background: '#fff' }}></div>
            <div className="circle" style={{ background: '#fff' }}></div>
          </div>
        </div>

        {/* WINDOW BODY */}
        <div className="auth-content">
          <h1>AUTHENTICATION</h1>
          
          {/* Message Display */}
          {message.text && (
            <div className={`auth-message ${message.type}`}>
              {message.text}
            </div>
          )}
          
          <label><b>EMAIL:</b></label>
          <input 
            type="email" 
            className="auth-input" 
            placeholder="user@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
          
          <label><b>PASSWORD:</b></label>
          <input 
            type="password" 
            className="auth-input" 
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />

          <div className="auth-buttons">
            <button 
              onClick={handleSignIn} 
              className={`loginBtn primary ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'LOADING' : '[ LOGIN ]'}
            </button>
            <button 
              onClick={handleSignUp} 
              className={`loginBtn ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'LOADING' : '[ SIGN UP ]'}
            </button>
          </div>

          <p className="auth-footer">
            Access restricted to authorized users only.
          </p>
          
          <div className="return-link">
            <Link to="/chat">← Return to Chat</Link>
          </div>

          {/* Info Section */}
          <div style={{
            marginTop: '25px',
            padding: '15px',
            background: 'rgba(80, 182, 209, 0.1)',
            border: '2px dashed #000',
            borderRadius: '5px',
            fontSize: '0.85rem'
          }}>
            <p style={{ marginBottom: '8px', fontWeight: 'bold' }}>
              📝 Quick Tips:
            </p>
            <ul style={{ 
              marginLeft: '20px', 
              lineHeight: '1.6',
              fontSize: '0.8rem'
            }}>
              <li>Password must be at least 6 characters</li>
              <li>Check your email after signing up</li>
              <li>Use a valid email address</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
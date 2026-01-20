import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import '../LoginPage.css';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate = useNavigate();

  // Redirect to dashboard if session already exists
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/dashboard');
      }
    };
    checkUser();
  }, [navigate]);

  const handleSignIn = async () => {
  if (!email || !password) {
    setMessage({ text: 'Please fill in all fields', type: 'error' });
    return;
  }

  setIsLoading(true);
  setMessage({ text: '', type: '' });

  // 1. Authenticate with Supabase
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  
  if (error) {
    setIsLoading(false);
    setMessage({ text: error.message, type: 'error' });
    return;
  }

  // 2. Check if the logged-in user is the specific admin
  const ADMIN_EMAIL = 'admin@gmail.com'; // Change this to your actual email

  if (data.user?.email !== ADMIN_EMAIL) {
    // If it's the wrong user, sign them out and show error
    await supabase.auth.signOut();
    setIsLoading(false);
    setMessage({ text: 'Access Denied: You are not authorized.', type: 'error' });
  } else {
    // If it's the right user, proceed
    setIsLoading(false);
    setMessage({ text: 'Login successful! Redirecting...', type: 'success' });
    setTimeout(() => navigate('/dashboard'), 1000);
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
          <p style={{ color: '#fff', padding: '5px 15px' }}>Admin_Login.sh</p>
          <div className="windowCircle">
            <div className="circle" style={{ background: '#fff' }}></div>
            <div className="circle" style={{ background: '#fff' }}></div>
            <div className="circle" style={{ background: '#fff' }}></div>
          </div>
        </div>

        {/* WINDOW BODY */}
        <div className="auth-content">
          <h1>ADMIN AUTHENTICATION</h1>
          
          <p style={{ 
            textAlign: 'center', 
            fontSize: '0.9rem', 
            marginBottom: '20px',
            padding: '10px',
            background: 'rgba(80, 182, 209, 0.1)',
            border: '2px solid #50B6D1',
            borderRadius: '5px'
          }}>
            🔐 Secure access for Admin only
          </p>

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
            placeholder="....@example.com"
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
              style={{ width: '100%' }} // Expanded for a cleaner single-button look
              disabled={isLoading}
            >
              {isLoading ? 'LOADING' : '[ ACCESS DASHBOARD ]'}
            </button>
          </div>

          <p className="auth-footer">
            Access restricted to authorized administrators. 
            <br />
            Unauthorized attempts are logged.
          </p>
          
          <div className="return-link">
            <Link to="/">← Return to Home</Link>
          </div>

          {/* Info Section */}
          <div style={{
            marginTop: '25px',
            padding: '15px',
            background: 'rgba(255, 160, 160, 0.1)',
            border: '2px dashed #000',
            borderRadius: '5px',
            fontSize: '0.85rem'
          }}>
            <p style={{ marginBottom: '8px', fontWeight: 'bold' }}>
              📝 System Status:
            </p>
            <ul style={{ 
              marginLeft: '20px', 
              lineHeight: '1.6',
              fontSize: '0.8rem'
            }}>
              <li>Auth Status: Restricted</li>
              <li>Sign-ups: Disabled</li>
              <li>Session: Encrypted</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
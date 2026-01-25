import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Performance optimization: Lazy loading for larger bundles
import { lazy, Suspense } from 'react';

// Lazy load components
const LazyApp = lazy(() => import('./App.jsx'));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense fallback={
      <div style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#03274B',
        color: '#fff',
        fontSize: '1.2rem',
        fontFamily: 'monospace'
      }}>
        Loading Portfolio...
      </div>
    }>
      <LazyApp />
    </Suspense>
  </React.StrictMode>
);
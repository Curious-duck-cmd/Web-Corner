import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Page Imports
import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import ProjectsPage from './pages/ProjectsPage';
import DashboardPage from './pages/DashboardPage';
import ViewGalleryPage from './pages/ViewGalleryPage';
import BlogPage from './pages/BlogPage';
import GamesPage from './pages/GamesPage';
import AdminLogin from './pages/AdminLogin';
import Tetris from './pages/Tetris';
import Snake from './pages/Snake';
import Pong from './pages/Pong';
import PacMan from './pages/PacMan';

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/view-gallery" element={<ViewGalleryPage />} />
        <Route path="/blog" element={<BlogPage />} />
         <Route path="/Tetris" element={<Tetris />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/Adminlogin" element={<AdminLogin />} />
        <Route path="/snake" element={<Snake />} />
        <Route path="/pong" element={<Pong />} />
        <Route path="/pacman" element={<PacMan />} />
      </Routes>
    </Router>
  );
}

export default App;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import PortfolioPage from './PortfolioPage';
import ChatPage from './ChatPage';
import LoginPage from './LoginPage';
import ProjectsPage from './ProjectsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/projects" element={<ProjectsPage />} /> 
      </Routes>
    </Router>
  );
}
export default App;

import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import './App.css';

// Import components
import Home from './components/Home';
import About from './components/About';
import Profile from './components/Profile';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import NotFound from './components/NotFound';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (username) => {
    setIsAuthenticated(true);
    setUser({ username, role: 'user' });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-brand">
            <Link to="/" className="brand-link">React Router Advanced</Link>
          </div>
          
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/profile" className="nav-link">Profile</Link>
            <Link to="/blog" className="nav-link">Blog</Link>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            
            {isAuthenticated ? (
              <>
                <span className="user-welcome">Welcome, {user?.username}!</span>
                <button onClick={handleLogout} className="auth-btn logout">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="auth-btn login">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      <div className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:postId" element={<BlogPost />} />
          <Route path="/login" element={
            <Login onLogin={handleLogin} isAuthenticated={isAuthenticated} />
          } />
          
          {/* Protected Routes */}
          <Route path="/profile/*" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Profile user={user} />
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard user={user} />
            </ProtectedRoute>
          } />
          
          {/* Redirect and 404 */}
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <p>Advanced React Router Demo</p>
          <div className="footer-links">
            <Link to="/">Home</Link> | 
            <Link to="/about">About</Link> | 
            <Link to="/blog">Blog</Link>
          </div>
          <p className="footer-hint">
            Try navigating between routes, check out nested routes in Profile, and test protected routes!
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
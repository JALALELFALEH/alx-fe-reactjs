import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home">
        <div className="hero">
            <h1>Advanced React Router Demo</h1>
            <p className="subtitle">
            Exploring nested routes, protected routes, and dynamic routing
            </p>
        </div>

        <div className="features">
            <h2>Features Implemented</h2>
            
            <div className="feature-grid">
            <div className="feature-card">
                <div className="feature-icon">🚀</div>
                <h3>Nested Routes</h3>
                <p>Profile component contains nested routes for details and settings</p>
                <Link to="/profile" className="feature-link">Try Profile →</Link>
            </div>
            
            <div className="feature-card">
                <div className="feature-icon">🔒</div>
                <h3>Protected Routes</h3>
                <p>Dashboard and Profile require authentication</p>
                <Link to="/login" className="feature-link">Login to Access →</Link>
            </div>
            
            <div className="feature-card">
                <div className="feature-icon">🔄</div>
                <h3>Dynamic Routing</h3>
                <p>Blog posts with dynamic URLs based on post ID</p>
                <Link to="/blog" className="feature-link">View Blog →</Link>
            </div>
            
            <div className="feature-card">
                <div className="feature-icon">🧭</div>
                <h3>Navigation</h3>
                <p>Smooth navigation with programmatic routing</p>
                <Link to="/about" className="feature-link">Learn More →</Link>
            </div>
            </div>
        </div>

        <div className="instructions">
            <h3>Testing Instructions</h3>
            <div className="instruction-list">
            <div className="instruction">
                <h4>Test Protected Routes</h4>
                <p>Try accessing /dashboard or /profile without logging in</p>
            </div>
            <div className="instruction">
                <h4>Test Nested Routes</h4>
                <p>Go to Profile and try navigating between Details and Settings</p>
            </div>
            <div className="instruction">
                <h4>Test Dynamic Routes</h4>
                <p>Visit Blog page and click on different posts</p>
            </div>
            </div>
        </div>
        </div>
    );
};

export default Home;
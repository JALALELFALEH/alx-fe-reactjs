import { Link, useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="not-found">
        <div className="error-content">
            <h1 className="error-code">404</h1>
            <h2 className="error-title">Page Not Found</h2>
            <p className="error-message">
            Oops! The page you're looking for doesn't exist or has been moved.
            </p>
            
            <div className="error-actions">
            <button onClick={() => navigate(-1)} className="action-btn back">
                ← Go Back
            </button>
            <Link to="/" className="action-btn home">
                🏠 Home
            </Link>
            </div>

            <div className="suggestions">
            <h3>Try one of these pages instead:</h3>
            <div className="suggestion-links">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/blog">Blog</Link>
                <Link to="/login">Login</Link>
            </div>
            </div>

            <div className="debug-info">
            <h4>Debug Information:</h4>
            <p>This 404 page demonstrates React Router's catch-all route using <code>path="*"</code></p>
            <p>It catches any undefined routes and displays this custom error page.</p>
            </div>
        </div>
        </div>
    );
};

export default NotFound;
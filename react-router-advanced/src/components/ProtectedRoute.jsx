import { Navigate, useLocation } from 'react-router-dom';
import './ProtectedRoute.css';

const ProtectedRoute = ({ children, isAuthenticated }) => {
    const location = useLocation();

    // Check authentication status (passed as prop)
    if (!isAuthenticated) {
        // Redirect to login page, preserving the location they tried to access
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // If authenticated, render the protected component
    return (
        <>
        {children}
        <div className="protected-route-info">
            <h3>🔒 Protected Route Active</h3>
            <p>This content is protected and requires authentication.</p>
            <div className="auth-status">
            <span className="status-indicator authenticated"></span>
            <span>Authenticated: ✓</span>
            </div>
            <p className="route-info">
            You're viewing this because you're logged in. Try logging out and refreshing this page.
            </p>
        </div>
        </>
    );
};

export default ProtectedRoute;
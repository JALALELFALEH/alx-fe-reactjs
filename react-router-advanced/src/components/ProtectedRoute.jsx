import { Navigate, useLocation } from 'react-router-dom';
import './ProtectedRoute.css';

const ProtectedRoute = ({ children, isAuthenticated }) => {
    const location = useLocation();

    // If user is not authenticated, redirect to login page
    if (!isAuthenticated) {
        // Save the current location they tried to access
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // If authenticated, render the children (protected component)
    return children;
};

export default ProtectedRoute;
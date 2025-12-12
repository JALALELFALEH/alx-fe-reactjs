import { Navigate, useLocation } from 'react-router-dom';
import './ProtectedRoute.css';

const ProtectedRoute = ({ children, isAuthenticated }) => {
    const location = useLocation();

    if (!isAuthenticated) {
        // Redirect to login page, but save the location they tried to visit
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
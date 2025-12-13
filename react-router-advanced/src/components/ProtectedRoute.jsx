import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import './ProtectedRoute.css';

const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return (
        <>
        {children}
        <div className="protected-route-info">
            <h3>🔒 Protected Route (using useAuth hook)</h3>
            <p>Authentication status checked via custom useAuth hook.</p>
        </div>
        </>
    );
};

export default ProtectedRoute;
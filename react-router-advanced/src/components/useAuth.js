import { useState, useCallback } from 'react';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        // Check localStorage on initial load
        return localStorage.getItem('isAuthenticated') === 'true';
    });

    const login = useCallback(() => {
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');
    }, []);

    const logout = useCallback(() => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated');
    }, []);

    return {
        isAuthenticated,
        login,
        logout
    };
};

export default useAuth;
import { useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import './Login.css';

const Login = ({ onLogin, isAuthenticated }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    // If already authenticated, redirect to where they wanted to go or home
    if (isAuthenticated) {
        const from = location.state?.from?.pathname || '/';
        return <Navigate to={from} replace />;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // Simple authentication simulation
        if (username && password) {
        if (password === 'password') { // Simple check for demo
            onLogin(username);
            const from = location.state?.from?.pathname || '/';
            navigate(from, { replace: true });
        } else {
            setError('Invalid password. Try "password"');
        }
        } else {
        setError('Please enter both username and password');
        }
    };

    // Demo users for quick login
    const demoUsers = [
        { username: 'alice', password: 'password' },
        { username: 'bob', password: 'password' },
        { username: 'charlie', password: 'password' },
    ];

    const handleDemoLogin = (demoUser) => {
        setUsername(demoUser.username);
        setPassword(demoUser.password);
        // Auto-submit after a delay
        setTimeout(() => {
        const fakeEvent = { preventDefault: () => {} };
        handleSubmit(fakeEvent);
        }, 300);
    };

    return (
        <div className="login-container">
        <div className="login-card">
            <h2>Login to Access Protected Routes</h2>
            <p className="login-subtitle">
            This demonstrates protected routing. Some routes require authentication.
            </p>

            <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter any username"
                required
                />
            </div>

            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Use 'password' for demo"
                required
                />
                <small className="password-hint">Demo password: "password"</small>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="login-btn">
                Login
            </button>
            </form>

            <div className="demo-section">
            <h3>Quick Demo Logins</h3>
            <p>Click any user to auto-login:</p>
            <div className="demo-users">
                {demoUsers.map((user) => (
                <button
                    key={user.username}
                    onClick={() => handleDemoLogin(user)}
                    className="demo-user-btn"
                >
                    {user.username}
                </button>
                ))}
            </div>
            </div>

            <div className="login-info">
            <h4>What happens after login?</h4>
            <ul>
                <li>Access to protected routes (Profile, Dashboard)</li>
                <li>Navigation to the page you tried to access (if any)</li>
                <li>Session persists until you click logout</li>
            </ul>
            </div>
        </div>
        </div>
    );
};

export default Login;
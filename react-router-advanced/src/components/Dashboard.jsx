import { Link, useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = ({ user }) => {
    const navigate = useNavigate();

    const quickActions = [
        { label: 'Edit Profile', path: '/profile/details', icon: '👤' },
        { label: 'Settings', path: '/profile/settings', icon: '⚙️' },
        { label: 'View Posts', path: '/profile/posts', icon: '📝' },
        { label: 'Browse Blog', path: '/blog', icon: '📚' },
    ];

    return (
        <div className="dashboard">
        <div className="dashboard-header">
            <h1>Dashboard</h1>
            <p className="welcome-message">
            Welcome back, <strong>{user?.username}</strong>! This is a protected route.
            </p>
        </div>

        <div className="dashboard-content">
            <div className="stats-cards">
            <div className="stat-card">
                <div className="stat-icon">📊</div>
                <h3>Profile Views</h3>
                <p className="stat-value">1,247</p>
            </div>
            <div className="stat-card">
                <div className="stat-icon">📝</div>
                <h3>Posts Published</h3>
                <p className="stat-value">15</p>
            </div>
            <div className="stat-card">
                <div className="stat-icon">⭐</div>
                <h3>Average Rating</h3>
                <p className="stat-value">4.8</p>
            </div>
            <div className="stat-card">
                <div className="stat-icon">👥</div>
                <h3>Followers</h3>
                <p className="stat-value">342</p>
            </div>
            </div>

            <div className="dashboard-sections">
            <div className="section">
                <h2>Quick Actions</h2>
                <div className="action-buttons">
                {quickActions.map((action) => (
                    <button
                    key={action.label}
                    onClick={() => navigate(action.path)}
                    className="action-btn"
                    >
                    <span className="action-icon">{action.icon}</span>
                    {action.label}
                    </button>
                ))}
                </div>
            </div>

            <div className="section">
                <h2>Recent Activity</h2>
                <div className="activity-list">
                <div className="activity-item">
                    <span className="activity-icon">✅</span>
                    <span>Logged in to dashboard</span>
                    <span className="activity-time">Just now</span>
                </div>
                <div className="activity-item">
                    <span className="activity-icon">📝</span>
                    <span>Published new blog post</span>
                    <span className="activity-time">2 hours ago</span>
                </div>
                <div className="activity-item">
                    <span className="activity-icon">⚙️</span>
                    <span>Updated profile settings</span>
                    <span className="activity-time">Yesterday</span>
                </div>
                </div>
            </div>
            </div>

            <div className="protected-route-info">
            <h3>Protected Route Information</h3>
            <div className="info-grid">
                <div className="info-card">
                <h4>Authentication Status:</h4>
                <p className="status authenticated">Authenticated ✓</p>
                <p>You can access this route because you're logged in.</p>
                </div>
                <div className="info-card">
                <h4>Try This:</h4>
                <p>Click logout in the navbar, then try to refresh this page.</p>
                <p>You'll be redirected to login!</p>
                </div>
                <div className="info-card">
                <h4>Route Protection:</h4>
                <p>Implemented using a <code>ProtectedRoute</code> wrapper component.</p>
                <p>Checks authentication before rendering children.</p>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};

export default Dashboard;
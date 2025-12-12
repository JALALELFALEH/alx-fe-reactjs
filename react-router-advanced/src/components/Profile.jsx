import { Routes, Route, Link, Navigate, useLocation, Outlet } from 'react-router-dom';
import { useState } from 'react';
import './Profile.css';

const Profile = ({ user }) => {
    const location = useLocation();
    
    // Extract the current nested route
    const currentPath = location.pathname.split('/').pop() || 'details';

    return (
        <div className="profile">
        <div className="profile-header">
            <h1>Profile</h1>
            <div className="user-info">
            <div className="avatar">{user?.username?.charAt(0).toUpperCase()}</div>
            <div className="user-details">
                <h2>{user?.username}</h2>
                <p className="role">Role: {user?.role}</p>
            </div>
            </div>
        </div>

        <div className="profile-layout">
            <nav className="profile-sidebar">
            <ul className="nav-links">
                <li>
                <Link 
                    to="details" 
                    className={`nav-link ${currentPath === 'details' ? 'active' : ''}`}
                >
                    📋 Details
                </Link>
                </li>
                <li>
                <Link 
                    to="settings" 
                    className={`nav-link ${currentPath === 'settings' ? 'active' : ''}`}
                >
                    ⚙️ Settings
                </Link>
                </li>
                <li>
                <Link 
                    to="posts" 
                    className={`nav-link ${currentPath === 'posts' ? 'active' : ''}`}
                >
                    📝 Posts
                </Link>
                </li>
            </ul>

            <div className="sidebar-info">
                <h4>Nested Routes Demo</h4>
                <p>This shows nested routing within a parent route.</p>
                <p>Each tab is a separate route component.</p>
                <p>Current path: <code>/profile/{currentPath}</code></p>
            </div>
            </nav>

            <div className="profile-content">
            {/* Outlet renders the nested route components */}
            <Outlet />
            </div>
        </div>
        </div>
    );
};

// Nested components defined inside Profile.jsx for simplicity
export const ProfileDetails = ({ user }) => {
    return (
        <div className="profile-section">
        <h2>Profile Details</h2>
        <div className="details-card">
            <div className="detail-item">
            <span className="detail-label">Username:</span>
            <span className="detail-value">{user?.username}</span>
            </div>
            <div className="detail-item">
            <span className="detail-label">Role:</span>
            <span className="detail-value">{user?.role}</span>
            </div>
            <div className="detail-item">
            <span className="detail-label">Member Since:</span>
            <span className="detail-value">January 2024</span>
            </div>
            <div className="detail-item">
            <span className="detail-label">Email:</span>
            <span className="detail-value">{user?.username}@example.com</span>
            </div>
        </div>
        
        <div className="section-info">
            <h3>About Nested Routes</h3>
            <p>This content is served from <code>/profile/details</code> route.</p>
            <p>Notice the URL changes but only this section updates.</p>
            <p>The parent Profile layout remains while nested content changes.</p>
        </div>
        </div>
    );
};

export const ProfileSettings = ({ user }) => {
    const [notifications, setNotifications] = useState(true);
    const [theme, setTheme] = useState('light');

    return (
        <div className="profile-section">
        <h2>Profile Settings</h2>
        
        <div className="settings-card">
            <div className="setting-item">
            <label className="setting-label">
                <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                />
                <span>Enable notifications</span>
            </label>
            </div>
            
            <div className="setting-item">
            <label className="setting-label">Theme:</label>
            <select 
                value={theme} 
                onChange={(e) => setTheme(e.target.value)}
                className="theme-select"
            >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
            </select>
            </div>
            
            <div className="setting-item">
            <label className="setting-label">Email Frequency:</label>
            <div className="radio-group">
                <label>
                <input type="radio" name="frequency" defaultChecked /> Daily
                </label>
                <label>
                <input type="radio" name="frequency" /> Weekly
                </label>
                <label>
                <input type="radio" name="frequency" /> Monthly
                </label>
            </div>
            </div>
            
            <button className="save-btn">Save Settings</button>
        </div>
        </div>
    );
};

export const ProfilePosts = ({ user }) => {
    const posts = [
        { id: 1, title: 'Getting Started with React Router', date: '2024-01-15' },
        { id: 2, title: 'Advanced Routing Patterns', date: '2024-01-20' },
        { id: 3, title: 'Authentication in React Apps', date: '2024-01-25' },
    ];

    return (
        <div className="profile-section">
        <h2>My Posts</h2>
        
        <div className="posts-list">
            {posts.map((post) => (
            <div key={post.id} className="post-item">
                <h3>{post.title}</h3>
                <p className="post-date">Posted on: {post.date}</p>
                <div className="post-actions">
                <Link to={`/blog/${post.id}`} className="view-post-btn">
                    View Post
                </Link>
                <button className="edit-btn">Edit</button>
                <button className="delete-btn">Delete</button>
                </div>
            </div>
            ))}
        </div>
        
        <div className="route-info">
            <h3>Dynamic Route Example</h3>
            <p>Click "View Post" to see dynamic routing in action.</p>
            <p>The post ID becomes part of the URL: <code>/blog/:postId</code></p>
            <p>This demonstrates how nested routes can link to dynamic routes.</p>
        </div>
        </div>
    );
};

// Export nested routes configuration
export const ProfileRoutes = () => (
    <Routes>
        <Route path="details" element={<ProfileDetails />} />
        <Route path="settings" element={<ProfileSettings />} />
        <Route path="posts" element={<ProfilePosts />} />
        <Route path="" element={<Navigate to="details" replace />} />
    </Routes>
);

export default Profile;
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import './Profile.css';

// Import nested components
import ProfileDetails from './ProfileDetails';
import ProfileSettings from './ProfileSettings';
import ProfilePosts from './ProfilePosts';

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
            </div>
            </nav>

            <div className="profile-content">
            <Routes>
                <Route path="details" element={<ProfileDetails user={user} />} />
                <Route path="settings" element={<ProfileSettings user={user} />} />
                <Route path="posts" element={<ProfilePosts user={user} />} />
                <Route path="" element={<Navigate to="details" replace />} />
            </Routes>
            </div>
        </div>
        </div>
    );
};

export default Profile;
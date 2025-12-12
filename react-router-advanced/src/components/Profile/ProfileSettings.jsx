import { useState } from 'react';

const ProfileSettings = ({ user }) => {
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

export default ProfileSettings;
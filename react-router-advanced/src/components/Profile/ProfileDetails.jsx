const ProfileDetails = ({ user }) => {
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
        </div>
        </div>
    );
};

export default ProfileDetails;
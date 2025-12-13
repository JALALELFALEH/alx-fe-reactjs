import { Link } from 'react-router-dom';

const ProfilePosts = ({ user }) => {
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
                <Link to={`/blog/${post.id}`} className="view-post-btn"> {/* Fixed: using post.id */}
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
            <p>The post ID becomes part of the URL: <code>/blog/:id</code></p> {/* Fixed: using :id */}
        </div>
        </div>
    );
};

export default ProfilePosts;
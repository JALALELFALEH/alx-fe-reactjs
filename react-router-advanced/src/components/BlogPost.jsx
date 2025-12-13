import { useParams, Link, useNavigate } from 'react-router-dom';
import './BlogPost.css';

const BlogPost = () => {
    const { id } = useParams(); // Changed from postId to id
    const navigate = useNavigate();

    // Mock blog post data - in real app, you'd fetch this based on id
    const blogPosts = {
        1: {
        title: 'Mastering React Router',
        author: 'Alice Johnson',
        date: 'January 15, 2024',
        content: `
            React Router is the standard routing library for React applications. 
            It enables navigation between views of different components, allows 
            changing the browser URL, and keeps the UI in sync with the URL.
            
            With version 6, React Router introduced several improvements including 
            nested routes, relative links, and better data fetching patterns.
            
            Key concepts include:
            • Routes and Route matching
            • Navigation with Link and Navigate components
            • Route parameters for dynamic routing
            • Nested routes for complex layouts
            • Protected routes for authentication
        `,
        tags: ['React', 'Routing', 'Web Development'],
        },
        2: {
        title: 'Nested Routes Explained',
        author: 'Bob Smith',
        date: 'January 20, 2024',
        content: `
            Nested routes allow you to create complex user interfaces with multiple 
            levels of routing. This pattern is perfect for dashboards, settings pages, 
            and any application with hierarchical navigation.
            
            In React Router v6, nested routes are declared inside parent routes using 
            the <Outlet /> component as a placeholder for child routes.
            
            Benefits of nested routes:
            • Better code organization
            • Shared layouts between related pages
            • Preserved state when switching between child routes
            • Cleaner URLs that reflect the page hierarchy
        `,
        tags: ['React Router', 'Nested', 'Layout'],
        },
        3: {
        title: 'Authentication & Protected Routes',
        author: 'Charlie Brown',
        date: 'January 25, 2024',
        content: `
            Protected routes are essential for applications that require user 
            authentication. React Router makes it easy to create routes that 
            only authenticated users can access.
            
            The typical pattern involves creating a ProtectedRoute component that 
            checks authentication status and either renders the requested component 
            or redirects to the login page.
            
            Key considerations:
            • Store authentication state (context, Redux, or local state)
            • Redirect unauthenticated users with Navigate component
            • Preserve the attempted URL for post-login redirection
            • Handle authentication errors gracefully
        `,
        tags: ['Authentication', 'Security', 'Protected'],
        },
    };

    const post = blogPosts[id];

    if (!post) {
        return (
        <div className="blog-post not-found">
            <h2>Post Not Found</h2>
            <p>No blog post found with ID: {id}</p>
            <Link to="/blog" className="back-btn">Back to Blog</Link>
        </div>
        );
    }

    return (
        <div className="blog-post">
        <div className="post-header">
            <button onClick={() => navigate(-1)} className="back-nav-btn">
            ← Back
            </button>
            <h1>{post.title}</h1>
            <div className="post-meta">
            <span className="post-author">By {post.author}</span>
            <span className="post-date">{post.date}</span>
            <span className="post-id">Post ID: {id}</span>
            </div>
        </div>

        <div className="post-content">
            <div className="content-card">
            {post.content.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
            ))}
            </div>
        </div>

        <div className="post-footer">
            <div className="tags">
            <strong>Tags:</strong>
            {post.tags.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
            ))}
            </div>
            
            <div className="navigation">
            <div className="nav-info">
                <p>Current URL: <code>/blog/{id}</code></p>
                <p>Dynamic parameter: <code>id = {id}</code></p>
            </div>
            
            <div className="nav-buttons">
                {id > 1 && (
                <Link to={`/blog/${parseInt(id) - 1}`} className="nav-btn prev">
                    ← Previous Post
                </Link>
                )}
                
                <Link to="/blog" className="nav-btn all">
                All Posts
                </Link>
                
                {id < 3 && (
                <Link to={`/blog/${parseInt(id) + 1}`} className="nav-btn next">
                    Next Post →
                </Link>
                )}
            </div>
            </div>
        </div>

        <div className="dynamic-routing-demo">
            <h3>Dynamic Routing in Action</h3>
            <div className="demo-content">
            <div className="demo-item">
                <h4>Current Route Parameters:</h4>
                <pre>{JSON.stringify({ id }, null, 2)}</pre>
            </div>
            <div className="demo-item">
                <h4>Try These URLs:</h4>
                <ul>
                <li><Link to="/blog/1">/blog/1</Link> - This post</li>
                <li><Link to="/blog/2">/blog/2</Link> - Next post</li>
                <li><Link to="/blog/999">/blog/999</Link> - Non-existent post</li>
                </ul>
            </div>
            <div className="demo-item">
                <h4>How it Works:</h4>
                <p>The <code>useParams()</code> hook extracts <code>id</code> from the URL.</p>
                <p>The component uses this ID to display the appropriate content.</p>
            </div>
            </div>
        </div>
        </div>
    );
};

export default BlogPost;
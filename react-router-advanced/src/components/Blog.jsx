import { Link } from 'react-router-dom';
import './Blog.css';

const Blog = () => {
    const blogPosts = [
        {
        id: 1,
        title: 'Mastering React Router',
        excerpt: 'Learn how to implement advanced routing patterns in your React applications.',
        author: 'Alice Johnson',
        date: '2024-01-15',
        readTime: '5 min',
        },
        {
        id: 2,
        title: 'Nested Routes Explained',
        excerpt: 'A deep dive into creating organized route hierarchies with React Router.',
        author: 'Bob Smith',
        date: '2024-01-20',
        readTime: '8 min',
        },
        {
        id: 3,
        title: 'Authentication & Protected Routes',
        excerpt: 'Secure your application with proper authentication and route protection.',
        author: 'Charlie Brown',
        date: '2024-01-25',
        readTime: '6 min',
        },
        {
        id: 4,
        title: 'Dynamic Routing Patterns',
        excerpt: 'Handle variable URLs and dynamic content loading efficiently.',
        author: 'Diana Prince',
        date: '2024-01-30',
        readTime: '7 min',
        },
        {
        id: 5,
        title: 'Route Transitions & Animations',
        excerpt: 'Create smooth transitions between routes for better UX.',
        author: 'Ethan Hunt',
        date: '2024-02-05',
        readTime: '4 min',
        },
    ];

    return (
        <div className="blog">
        <div className="blog-header">
            <h1>Blog</h1>
            <p className="blog-subtitle">Dynamic routing example with parameterized URLs</p>
        </div>

        <div className="blog-posts">
            {blogPosts.map((post) => (
            <article key={post.id} className="blog-post-card">
                <div className="post-meta">
                <span className="post-author">By {post.author}</span>
                <span className="post-date">{post.date}</span>
                <span className="read-time">{post.readTime} read</span>
                </div>
                
                <h2 className="post-title">{post.title}</h2>
                <p className="post-excerpt">{post.excerpt}</p>
                
                <div className="post-actions">
                <Link to={`/blog/${post.id}`} className="read-more-btn">
                    Read Full Post →
                </Link>
                <div className="post-id-badge">ID: {post.id}</div>
                </div>
            </article>
            ))}
        </div>

        <div className="dynamic-routing-info">
            <h3>Dynamic Routing Demonstration</h3>
            <div className="info-grid">
            <div className="info-card">
                <h4>How it works:</h4>
                <p>Each blog post has a unique ID in the URL</p>
                <code>/blog/:postId</code>
            </div>
            <div className="info-card">
                <h4>Try it:</h4>
                <p>Click any post to see the dynamic URL</p>
                <p>Try manually entering <code>/blog/3</code> in the URL bar</p>
            </div>
            <div className="info-card">
                <h4>Behind the scenes:</h4>
                <p>The <code>useParams</code> hook extracts the postId</p>
                <p>Component fetches/renders data based on the parameter</p>
            </div>
            </div>
        </div>
        </div>
    );
};

export default Blog;
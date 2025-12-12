import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import './PostsComponent.css';

// Function to fetch posts from API
const fetchPosts = async () => {
    console.log('Fetching posts from API...');
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    
    if (!response.ok) {
        throw new Error('Failed to fetch posts');
    }
    
    return response.json();
    };

    const PostsComponent = () => {
    const [showPosts, setShowPosts] = useState(true);
    const [visitCount, setVisitCount] = useState(0);

    // Using React Query's useQuery hook
    const {
        data: posts,
        isLoading,
        isError,
        error,
        refetch,
        isFetching,
        isStale,
    } = useQuery({
        queryKey: ['posts'], // Unique key for caching
        queryFn: fetchPosts, // Function to fetch data
        // Options:
        staleTime: 10000, // Data is fresh for 10 seconds
        cacheTime: 30000, // Cache unused data for 30 seconds
        retry: 1, // Retry once on failure
    });

    // Track component visits to demonstrate caching
    useEffect(() => {
        setVisitCount(prev => prev + 1);
    }, []);

    // Loading state
    if (isLoading) {
        return (
        <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading posts from API...</p>
            <p className="hint">Check Network tab in DevTools - you should see an API call</p>
        </div>
        );
    }

    // Error state
    if (isError) {
        return (
        <div className="error-container">
            <h3>Error Loading Posts</h3>
            <p>{error.message}</p>
            <button onClick={() => refetch()} className="retry-btn">
            Retry
            </button>
        </div>
        );
    }

    return (
        <div className="posts-container">
        <div className="controls">
            <div className="stats">
            <div className="stat-item">
                <span className="stat-label">Component Visits:</span>
                <span className="stat-value">{visitCount}</span>
            </div>
            <div className="stat-item">
                <span className="stat-label">Cache Status:</span>
                <span className={`stat-value ${isStale ? 'stale' : 'fresh'}`}>
                {isStale ? 'Stale' : 'Fresh'}
                </span>
            </div>
            <div className="stat-item">
                <span className="stat-label">Total Posts:</span>
                <span className="stat-value">{posts?.length || 0}</span>
            </div>
            </div>

            <div className="buttons">
            {/* Button to manually refetch data */}
            <button
                onClick={() => refetch()}
                disabled={isFetching}
                className={`refresh-btn ${isFetching ? 'fetching' : ''}`}
            >
                {isFetching ? (
                <>
                    <span className="spinner-small"></span>
                    Refreshing...
                </>
                ) : (
                'Refresh Posts'
                )}
            </button>

            {/* Button to toggle posts visibility (demonstrates caching) */}
            <button
                onClick={() => setShowPosts(!showPosts)}
                className="toggle-btn"
            >
                {showPosts ? 'Hide Posts' : 'Show Posts'}
            </button>
            </div>
        </div>

        <div className="cache-demo">
            <h3>Cache Demonstration:</h3>
            <ol>
            <li>First load: Data fetched from API (check Network tab)</li>
            <li>Toggle hide/show: Data loads instantly from cache</li>
            <li>Wait 10+ seconds: Data becomes "stale"</li>
            <li>Click "Refresh Posts": Fetches fresh data from API</li>
            </ol>
        </div>

        {showPosts && (
            <div className="posts-list">
            <h2>Posts (showing first 5 of {posts.length})</h2>
            {posts.slice(0, 5).map((post) => (
                <div key={post.id} className="post-card">
                <div className="post-header">
                    <h3>{post.title}</h3>
                    <span className="post-id">ID: {post.id}</span>
                </div>
                <p className="post-body">{post.body}</p>
                <div className="post-footer">
                    <span className="user-id">User ID: {post.userId}</span>
                </div>
                </div>
            ))}
            </div>
        )}

        <div className="instructions">
            <h3>Testing Instructions:</h3>
            <div className="instruction-grid">
            <div className="instruction">
                <h4>Test Caching</h4>
                <p>Click "Hide Posts", then "Show Posts". Check Network tab - no API call!</p>
            </div>
            <div className="instruction">
                <h4>Test Refetch</h4>
                <p>Click "Refresh Posts" to force API call. Watch Network tab.</p>
            </div>
            <div className="instruction">
                <h4>Test Stale Data</h4>
                <p>Wait 10+ seconds, data becomes "stale". Background refetch may occur.</p>
            </div>
            <div className="instruction">
                <h4>Inspect Cache</h4>
                <p>Use React DevTools &gt; Query DevTools to see cached data.</p>
            </div>
            </div>
        </div>
        </div>
    );
};

export default PostsComponent;
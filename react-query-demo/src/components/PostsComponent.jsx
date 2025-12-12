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
    const [page, setPage] = useState(1);
    const [pageSize] = useState(5); // Show 5 posts per page
    const [lastUpdated, setLastUpdated] = useState(null);

    // Using React Query's useQuery hook with advanced features
    const {
        data: posts,
        isLoading,
        isError,
        error,
        refetch,
        isFetching,
        isStale,
        dataUpdatedAt, // Timestamp when data was last updated
        isPreviousData, // Check if showing previous data while fetching new
    } = useQuery({
        queryKey: ['posts', page], // Include page in query key for pagination
        queryFn: fetchPosts, // Function to fetch data
        
        // Advanced React Query features:
        refetchOnWindowFocus: true, // Refetch data when window regains focus
        keepPreviousData: true, // Keep previous data while fetching new
        staleTime: 10000, // Data is fresh for 10 seconds
        cacheTime: 30000, // Cache unused data for 30 seconds
        retry: 1, // Retry once on failure
        
        // Other options we could use:
        // refetchOnMount: true, // Refetch when component mounts
        // refetchOnReconnect: true, // Refetch when internet reconnects
    });

    // Track component visits to demonstrate caching
    useEffect(() => {
        setVisitCount(prev => prev + 1);
    }, []);

    // Update last updated timestamp when data changes
    useEffect(() => {
        if (dataUpdatedAt) {
        setLastUpdated(new Date(dataUpdatedAt).toLocaleTimeString());
        }
    }, [dataUpdatedAt]);

    // Calculate pagination
    const totalPosts = posts?.length || 0;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentPosts = posts?.slice(startIndex, endIndex) || [];
    const totalPages = Math.ceil(totalPosts / pageSize);

    // Loading state
    if (isLoading && !isPreviousData) {
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
                <span className="stat-label">Last Updated:</span>
                <span className="stat-value time">
                {lastUpdated || 'Never'}
                </span>
            </div>
            <div className="stat-item">
                <span className="stat-label">Page:</span>
                <span className="stat-value">{page} of {totalPages}</span>
            </div>
            </div>

            <div className="feature-demo">
            <div className="feature">
                <span className="feature-label">refetchOnWindowFocus:</span>
                <span className="feature-status active">Active</span>
                <span className="feature-hint">(Try switching tabs and returning)</span>
            </div>
            <div className="feature">
                <span className="feature-label">keepPreviousData:</span>
                <span className="feature-status active">Active</span>
                <span className="feature-hint">(Smooth pagination)</span>
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

            {/* Pagination buttons */}
            <div className="pagination">
                <button
                onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                disabled={page === 1 || isFetching}
                className="page-btn"
                >
                Previous
                </button>
                <span className="page-info">Page {page} of {totalPages}</span>
                <button
                onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                disabled={page === totalPages || isFetching}
                className="page-btn"
                >
                Next
                </button>
            </div>
            </div>
        </div>

        <div className="cache-demo">
            <h3>React Query Features Demonstration:</h3>
            <div className="feature-grid">
            <div className="feature-card">
                <h4>refetchOnWindowFocus</h4>
                <p>When you switch browser tabs and come back, React Query will automatically refetch data if it's stale.</p>
                <div className="test-instruction">
                <strong>Test:</strong> Switch to another tab, wait 10+ seconds, return to this tab
                </div>
            </div>
            <div className="feature-card">
                <h4>keepPreviousData</h4>
                <p>When changing pages, the previous page data stays visible while new data loads.</p>
                <div className="test-instruction">
                <strong>Test:</strong> Click "Next Page" button - see smooth transition
                </div>
            </div>
            <div className="feature-card">
                <h4>Automatic Caching</h4>
                <p>Data is cached automatically. Toggle posts to see instant loading from cache.</p>
                <div className="test-instruction">
                <strong>Test:</strong> Click "Hide Posts", then "Show Posts"
                </div>
            </div>
            <div className="feature-card">
                <h4>Manual Refetch</h4>
                <p>You can manually trigger data refresh anytime.</p>
                <div className="test-instruction">
                <strong>Test:</strong> Click "Refresh Posts" button
                </div>
            </div>
            </div>
        </div>

        <div className="status-indicators">
            <div className="status-item">
            <span className="status-label">Currently Showing:</span>
            <span className={`status-value ${isPreviousData ? 'previous-data' : 'current-data'}`}>
                {isPreviousData ? 'Previous Data (while fetching new)' : 'Current Data'}
            </span>
            </div>
            <div className="status-item">
            <span className="status-label">Window Focus Refetch:</span>
            <span className="status-value enabled">Enabled</span>
            <span className="status-hint">(Check Network tab when returning to tab)</span>
            </div>
        </div>

        {showPosts && (
            <div className="posts-list">
            <h2>Posts (Page {page}: Showing {currentPosts.length} of {totalPosts} total)</h2>
            
            {isFetching && isPreviousData && (
                <div className="fetching-overlay">
                <div className="spinner-small"></div>
                <span>Fetching next page...</span>
                </div>
            )}
            
            {currentPosts.map((post) => (
                <div key={post.id} className="post-card">
                <div className="post-header">
                    <h3>{post.title}</h3>
                    <span className="post-id">ID: {post.id}</span>
                </div>
                <p className="post-body">{post.body}</p>
                <div className="post-footer">
                    <span className="user-id">User ID: {post.userId}</span>
                    <span className="page-indicator">Page: {page}</span>
                </div>
                </div>
            ))}
            </div>
        )}

        <div className="instructions">
            <h3>Testing Instructions for React Query Features:</h3>
            <div className="instruction-grid">
            <div className="instruction">
                <h4>Test refetchOnWindowFocus</h4>
                <ol>
                <li>Wait until data becomes "Stale" (10+ seconds)</li>
                <li>Switch to another browser tab</li>
                <li>Wait a few seconds</li>
                <li>Return to this tab</li>
                <li>Check Network tab - should see API call</li>
                </ol>
            </div>
            <div className="instruction">
                <h4>Test keepPreviousData</h4>
                <ol>
                <li>Click "Next Page" button</li>
                <li>Notice previous data stays visible</li>
                <li>New data loads in background</li>
                <li>Smooth transition when data arrives</li>
                </ol>
            </div>
            <div className="instruction">
                <h4>Test Caching</h4>
                <ol>
                <li>Click "Hide Posts"</li>
                <li>Click "Show Posts"</li>
                <li>Data loads instantly from cache</li>
                <li>No API call in Network tab</li>
                </ol>
            </div>
            <div className="instruction">
                <h4>Test Manual Refetch</h4>
                <ol>
                <li>Click "Refresh Posts" button</li>
                <li>See loading spinner</li>
                <li>Check Network tab - API call happens</li>
                <li>See "Last Updated" time change</li>
                </ol>
            </div>
            </div>
        </div>
        </div>
    );
};

export default PostsComponent;
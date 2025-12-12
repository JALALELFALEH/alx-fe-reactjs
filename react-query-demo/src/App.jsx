import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import PostsComponent from './components/PostsComponent';
import './App.css';

// Create a QueryClient instance - this manages caching and more
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Global settings for all queries
      staleTime: 10000, // Data stays fresh for 10 seconds
      cacheTime: 60000, // Cache data for 1 minute
      retry: 1, // Retry failed requests once
    },
  },
});

function App() {
  return (
    // Wrap your app with QueryClientProvider to provide React Query functionality
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <header className="App-header">
          <h1>React Query Demo</h1>
          <p>Fetching and caching data with TanStack Query</p>
        </header>
        <main>
          <PostsComponent />
        </main>
        <footer>
          <p>Check browser DevTools Network tab to see caching in action!</p>
          <p>Toggle the Query DevTools panel (bottom-left) to inspect cache</p>
        </footer>
      </div>
      {/* React Query DevTools for debugging */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
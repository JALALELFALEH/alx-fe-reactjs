import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Add this inside QueryClientProvider, at the end
<QueryClientProvider client={queryClient}>
  {/* ... existing code ... */}
  <ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>
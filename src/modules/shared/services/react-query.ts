import {QueryClient} from '@tanstack/react-query'
import {ApiError} from './client'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error) => {
        if (error instanceof ApiError && error.status === 404) {
          return false
        }
        return failureCount < 3
      },
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchOnMount: true,
    },
  },
})

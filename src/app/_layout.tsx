import '../global.css'
import {Slot} from 'expo-router'
import {PortalHost} from '@rn-primitives/portal'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {useState} from 'react'

export default function Layout() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
            retry: 3,
            retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
            refetchOnWindowFocus: true,
            refetchOnReconnect: true,
            refetchOnMount: true,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <Slot />
        <PortalHost />
      </SafeAreaProvider>
    </QueryClientProvider>
  )
}

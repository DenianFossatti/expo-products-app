import '../global.css'
import {Slot} from 'expo-router'
import {PortalHost} from '@rn-primitives/portal'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {useState} from 'react'
import {ApiError} from '@/services/api/client'
import {ErrorBoundary} from '@/ErrorBoundary'
import {OneSignal} from 'react-native-onesignal'

OneSignal.initialize(process.env.EXPO_PUBLIC_ONESIGNAL_APP_ID)
OneSignal.Notifications.requestPermission(false)

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: 'index',
}

export default function Layout() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
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
  )

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <Slot />
          <PortalHost />
        </SafeAreaProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

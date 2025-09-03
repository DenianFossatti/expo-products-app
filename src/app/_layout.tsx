import '../global.css'
import {Slot} from 'expo-router'
import {PortalHost} from '@rn-primitives/portal'
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context'
import {QueryClientProvider} from '@tanstack/react-query'
import {ErrorBoundary} from '@/ErrorBoundary'
import {OneSignal} from 'react-native-onesignal'
import {env} from '@/env'
import {queryClient} from '@/modules/shared/services/react-query'

OneSignal.initialize(env.ONESIGNAL_APP_ID)
OneSignal.Notifications.requestPermission(false)

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: 'index',
}

export default function Layout() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <SafeAreaView className='flex-1 bg-gray-50'>
            <Slot />
            <PortalHost />
          </SafeAreaView>
        </SafeAreaProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

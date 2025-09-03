import {Component, ErrorInfo, ReactNode} from 'react'
import {View, Modal} from 'react-native'
import {Button, Text} from './ui'
import {AlertCircle} from 'lucide-react-native'

interface ErrorBoundaryState {
  error: Error | null
  errorId: string | null
}

interface ErrorBoundaryProps {
  children: ReactNode
}

export class ErrorBoundary extends Component<ErrorBoundaryProps> {
  state: ErrorBoundaryState = {error: null, errorId: null}

  static getDerivedStateFromError(error: Error) {
    // Updates state to show UI fallback
    return {error}
  }

  async componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary', error, errorInfo)
  }

  render() {
    const {children} = this.props
    const {error, errorId} = this.state

    if (!error) return children

    return (
      <Modal visible transparent animationType='fade' statusBarTranslucent>
        <View className='flex-1 items-center justify-center bg-black/80 px-5'>
          <View className='w-full max-w-sm items-center rounded-2xl bg-white p-6 shadow-2xl'>
            <View className='mb-4'>
              <AlertCircle size={46} className='text-5xl' />
            </View>

            <Text className='mb-3 text-center text-xl font-bold text-gray-900'>Oops! Something went wrong</Text>

            <Text className='mb-6 text-center text-base leading-6 text-gray-600'>
              An unexpected error occurred. Don&apos;t worry, our team has been notified.
            </Text>

            {__DEV__ && (
              <View className='mb-6 w-full rounded-lg bg-gray-100 p-3'>
                <Text className='mb-2 text-sm font-semibold text-gray-800'>Debug Info:</Text>
                <Text className='font-mono text-xs leading-4 text-gray-600'>{error?.message}</Text>
                {errorId && <Text className='font-mono text-xs leading-4 text-gray-600'>ID: {errorId}</Text>}
              </View>
            )}

            <View className='w-full'>
              <Button
                onPress={() => {
                  this.setState({error: null, errorId: null})
                }}
              >
                <Text className='text-base font-semibold text-white'>Try Again</Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}

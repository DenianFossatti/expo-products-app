import React from 'react'
import {View} from 'react-native'
import {AlertCircle, RefreshCw} from 'lucide-react-native'
import {cn} from '@/lib/utils'
import {Button} from './Button'
import {Card, CardContent} from './Card'
import {Text} from './Text'

interface ErrorMessageProps {
  message: string
  onRetry?: () => void
  className?: string
  title?: string
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onRetry,
  className,
  title = 'Something went wrong',
}) => {
  return (
    <View className={cn('flex-1 justify-center items-center p-4', className)}>
      <Card className='w-full max-w-sm'>
        <CardContent className='items-center space-y-4 p-6'>
          <View className='size-12 items-center justify-center rounded-full bg-destructive/10'>
            <AlertCircle size={24} className='text-destructive' />
          </View>

          <View className='items-center space-y-2'>
            <Text className='text-center text-lg font-semibold text-card-foreground'>{title}</Text>
            <Text className='text-center leading-relaxed text-muted-foreground'>{message}</Text>
          </View>

          {onRetry && (
            <Button onPress={onRetry} variant='outline' className='w-full flex-row items-center space-x-2'>
              <RefreshCw size={16} className='text-foreground' />
              <Text className='font-medium text-foreground'>Try Again</Text>
            </Button>
          )}
        </CardContent>
      </Card>
    </View>
  )
}

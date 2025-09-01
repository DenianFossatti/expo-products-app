import React from 'react'
import {View} from 'react-native'
import {Search, ArrowLeft} from 'lucide-react-native'
import {cn} from '@/lib/utils'
import {Button} from '../atoms/Button'
import {Card, CardContent} from '../atoms/Card'
import {Text} from '../atoms/Text'

interface NotFoundMessageProps {
  title: string
  message?: string
  onGoBack?: () => void
  onRetry?: () => void
  className?: string
}

export const NotFoundMessage: React.FC<NotFoundMessageProps> = ({title, message, onGoBack, onRetry, className}) => {
  return (
    <View className={cn('flex-1 justify-center items-center p-4', className)}>
      <Card className='w-full max-w-sm'>
        <CardContent className='items-center gap-4 p-6'>
          <View className='size-16 items-center justify-center rounded-full bg-muted'>
            <Search size={32} className='text-muted-foreground' />
          </View>

          <View className='items-center gap-2'>
            <Text className='text-center text-xl font-semibold text-card-foreground'>{title}</Text>
            <Text className='text-center leading-relaxed text-muted-foreground'>{message}</Text>
          </View>

          <View className='w-full gap-2'>
            {onGoBack && (
              <Button onPress={onGoBack} className='w-full flex-row items-center justify-center space-x-2'>
                <ArrowLeft size={16} color='white' />
                <Text className='font-medium text-primary-foreground'>Go Back</Text>
              </Button>
            )}

            {onRetry && (
              <Button onPress={onRetry} variant='outline' className='w-full'>
                <Text className='font-medium text-foreground'>Try Again</Text>
              </Button>
            )}
          </View>
        </CardContent>
      </Card>
    </View>
  )
}

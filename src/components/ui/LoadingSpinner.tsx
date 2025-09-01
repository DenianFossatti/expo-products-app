import React from 'react'
import {View, ActivityIndicator, Text} from 'react-native'
import {Loader2} from 'lucide-react-native'
import {cn} from '../../lib/utils'

interface LoadingSpinnerProps {
  size?: 'small' | 'large'
  className?: string
  text?: string
  variant?: 'spinner' | 'icon'
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'large',
  className,
  text,
  variant = 'spinner',
}) => {
  const iconSize = size === 'large' ? 32 : 20

  return (
    <View className={cn('flex-1 justify-center items-center p-8', className)}>
      <View className='items-center space-y-3'>
        {variant === 'spinner' ? (
          <ActivityIndicator size={size as any} className='text-primary' />
        ) : (
          <View className='animate-spin'>
            <Loader2 size={iconSize} className='text-primary' />
          </View>
        )}

        {text && <Text className='text-center font-medium text-muted-foreground'>{text}</Text>}
      </View>
    </View>
  )
}

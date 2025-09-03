import React from 'react'
import {View, ViewProps} from 'react-native'
import {cn} from '@/ui/utils/tw'

interface SkeletonProps extends ViewProps {
  className?: string
}

export const Skeleton: React.FC<SkeletonProps> = ({className, ...props}) => {
  return <View className={cn('animate-pulse rounded-md bg-muted', className)} {...props} />
}

// Skeleton variants for common use cases
export const ProductCardSkeleton: React.FC = () => {
  return (
    <View className='mb-4'>
      <View className='overflow-hidden rounded-xl border border-border/50 bg-card'>
        <Skeleton className='h-52 w-full' />
        <View className='space-y-3 p-4'>
          <Skeleton className='h-6 w-3/4' />
          <Skeleton className='h-4 w-1/2' />
          <View className='flex-row items-center justify-between'>
            <Skeleton className='h-8 w-20' />
            <Skeleton className='h-6 w-16' />
          </View>
        </View>
      </View>
    </View>
  )
}

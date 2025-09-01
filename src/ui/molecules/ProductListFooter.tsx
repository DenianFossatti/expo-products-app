import React from 'react'
import {View} from 'react-native'
import {LoadingSpinner, Button, Text} from '@/ui/atoms'

interface ProductListFooterProps {
  isLoading: boolean
  hasMore: boolean
  onLoadMore: () => void
  error?: string | null
  totalItems?: number
  currentItems?: number
}

export const ProductListFooter: React.FC<ProductListFooterProps> = ({
  isLoading,
  hasMore,
  onLoadMore,
  error,
  totalItems,
  currentItems,
}) => {
  if (isLoading) {
    return (
      <View className='items-center justify-center py-8'>
        <LoadingSpinner size='small' />
        <Text className='mt-2 text-sm text-gray-500'>Loading more products...</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View className='items-center justify-center py-8'>
        <Text className='mb-4 text-center text-sm text-red-600'>Failed to load more products</Text>
        <Button variant='outline' size='sm' onPress={onLoadMore}>
          <Text>Try Again</Text>
        </Button>
      </View>
    )
  }

  if (!hasMore) {
    return (
      <View className='items-center justify-center py-8'>
        <Text className='text-sm text-gray-500'>
          {totalItems && currentItems ? `Showing all ${totalItems} products` : 'No more products to load'}
        </Text>
        <View className='mt-2 h-px w-16 bg-gray-300' />
      </View>
    )
  }

  return (
    <View className='items-center justify-center py-8'>
      {totalItems && currentItems && (
        <Text className='mt-2 text-xs text-gray-400'>
          Showing {currentItems} of {totalItems} products
        </Text>
      )}
    </View>
  )
}

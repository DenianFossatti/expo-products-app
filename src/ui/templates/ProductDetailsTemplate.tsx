import React from 'react'
import {View} from 'react-native'
import {LoadingSpinner, ErrorMessage, Text} from '@/ui/atoms'
import {ProductDetailsHeader, ProductDetailsContent, NotFoundMessage} from '@/ui/organisms'
import {Product} from '@/modules/product/types/domain.types'

interface ProductDetailsTemplateProps {
  isLoading: boolean
  error?: Error | null
  product?: Product
  isNotFound?: boolean
  onRetry: () => void
  onBack?: () => void
}

export const ProductDetailsTemplate: React.FC<ProductDetailsTemplateProps> = ({
  isLoading,
  error,
  product,
  isNotFound,
  onRetry,
  onBack,
}) => {
  if (isLoading) {
    return (
      <View className='flex-1'>
        <LoadingSpinner />
        <Text className='mt-4 text-center text-gray-600'>Loading product details...</Text>
      </View>
    )
  }

  if (isNotFound) {
    return (
      <View className='flex-1'>
        <NotFoundMessage
          title='Product not found'
          message='The product you are looking for does not exist or has been removed.'
          onBack={onBack}
          onRetry={onRetry}
        />
      </View>
    )
  }

  if (error || !product) {
    return (
      <View className='flex-1'>
        <ErrorMessage message='Failed to load product details. Please try again.' onRetry={onRetry} />
      </View>
    )
  }

  return (
    <View className='flex-1'>
      <ProductDetailsHeader onBack={onBack} />
      <ProductDetailsContent product={product} />
    </View>
  )
}

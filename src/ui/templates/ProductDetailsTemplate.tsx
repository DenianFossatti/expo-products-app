import React from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
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
      <SafeAreaView className='flex-1 bg-gray-50'>
        <LoadingSpinner />
        <Text className='mt-4 text-center text-gray-600'>Loading product details...</Text>
      </SafeAreaView>
    )
  }

  if (isNotFound) {
    return (
      <SafeAreaView className='flex-1 bg-gray-50'>
        <NotFoundMessage
          title='Product not found'
          message='The product you are looking for does not exist or has been removed.'
          onBack={onBack}
          onRetry={onRetry}
        />
      </SafeAreaView>
    )
  }

  if (error || !product) {
    return (
      <SafeAreaView className='flex-1 bg-gray-50'>
        <ErrorMessage message='Failed to load product details. Please try again.' onRetry={onRetry} />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className='flex-1 bg-gray-50'>
      <ProductDetailsHeader onBack={onBack} />
      <ProductDetailsContent product={product} />
    </SafeAreaView>
  )
}

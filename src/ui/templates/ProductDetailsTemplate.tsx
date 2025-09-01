import React from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useLocalSearchParams} from 'expo-router'
import {useProduct} from '@/hooks/useProducts'
import {LoadingSpinner, ErrorMessage, Text} from '@/ui/atoms'
import {ProductDetailsHeader, ProductDetailsContent} from '@/ui/organisms'

export const ProductDetailsTemplate: React.FC = () => {
  const {id} = useLocalSearchParams<{id: string}>()

  const {data: product, isLoading, error, refetch} = useProduct(id)

  if (isLoading) {
    return (
      <SafeAreaView className='flex-1 bg-gray-50'>
        <LoadingSpinner />
        <Text className='mt-4 text-center text-gray-600'>Loading product details...</Text>
      </SafeAreaView>
    )
  }

  if (error || !product) {
    return (
      <SafeAreaView className='flex-1 bg-gray-50'>
        <ErrorMessage message='Failed to load product details. Please try again.' onRetry={() => refetch()} />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className='flex-1 bg-gray-50'>
      <ProductDetailsHeader />
      <ProductDetailsContent product={product} />
    </SafeAreaView>
  )
}

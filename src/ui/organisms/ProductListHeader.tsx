import React from 'react'
import {View} from 'react-native'
import {ProductFilter, ProductSort} from '@/ui/molecules'
import {Text} from '@/ui/atoms'

interface ProductListHeaderProps {
  title: string
  totalProducts: number
  currentProducts: number
  hasActiveFilters: boolean
}

export const ProductListHeader: React.FC<ProductListHeaderProps> = ({
  title,
  totalProducts,
  currentProducts,
  hasActiveFilters,
}) => {
  return (
    <View className='border-b border-gray-200 bg-white px-4 py-2'>
      <Text className='mb-4 text-2xl font-bold text-gray-900'>{title}</Text>

      <View className='mb-2 flex-row space-x-3'>
        <ProductFilter />
        <ProductSort />
      </View>

      <View className='mt-2 flex-row items-center justify-between'>
        <Text className='text-gray-600'>
          showing {currentProducts} product{currentProducts !== 1 ? 's' : ''}
          {hasActiveFilters && ' (filtered)'}
        </Text>

        {totalProducts > 0 && <Text className='text-sm text-gray-500'>Total: {totalProducts} products</Text>}
      </View>
    </View>
  )
}

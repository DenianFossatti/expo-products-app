import React from 'react'
import {View} from 'react-native'
import {ProductFilter, ProductSort} from '@/ui/molecules'
import {Text} from '@/ui/atoms'

export type ProductSortType = {
  field: 'price' | 'rating' | 'title'
  order: 'asc' | 'desc'
}

export type CategoryType = {
  slug: string
  name: string
}

interface ProductListHeaderProps {
  title: string
  totalProducts: number
  currentProducts: number
  hasActiveFilters: boolean
  // Filter props
  categories?: CategoryType[]
  categoriesLoading: boolean
  selectedCategory?: string
  activeFiltersCount: number
  hasFilters: boolean
  onCategorySelect: (categorySlug: string) => void
  onClearFilters: () => void
  // Sort props
  currentSort: ProductSortType
  onSortSelect: (sortOption: ProductSortType) => void
}

export const ProductListHeader: React.FC<ProductListHeaderProps> = ({
  title,
  totalProducts,
  currentProducts,
  hasActiveFilters,
  // Filter props
  categories,
  categoriesLoading,
  selectedCategory,
  activeFiltersCount,
  hasFilters,
  onCategorySelect,
  onClearFilters,
  // Sort props
  currentSort,
  onSortSelect,
}) => {
  return (
    <View className='border-b border-gray-200 bg-white px-4 py-2'>
      <Text className='mb-4 text-2xl font-bold text-gray-900'>{title}</Text>

      <View className='mb-2 flex-row gap-2'>
        <ProductFilter
          categories={categories}
          categoriesLoading={categoriesLoading}
          selectedCategory={selectedCategory}
          activeFiltersCount={activeFiltersCount}
          hasFilters={hasFilters}
          onCategorySelect={onCategorySelect}
          onClearFilters={onClearFilters}
        />
        <ProductSort currentSort={currentSort} onSortSelect={onSortSelect} />
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

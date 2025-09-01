import React from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import {LoadingSpinner, ErrorMessage, Text} from '@/ui/atoms'
import {ProductListHeader, ProductList} from '@/ui/organisms'
import {Product, Category, ProductSort as ProductSortType} from '@/types/domain.types'

interface HomeTemplateProps {
  // Loading states
  isLoading: boolean
  error?: Error | null

  // Data
  products: Product[]
  categories?: Category[]
  categoriesLoading: boolean
  totalProducts: number

  // Filter & Sort state
  selectedCategory?: string
  currentSort: ProductSortType
  hasActiveFilters: boolean
  activeFiltersCount: number
  hasFilters: boolean

  // List state
  isRefetching: boolean
  isFetchingNextPage: boolean
  hasNextPage: boolean

  // Handlers
  onRefresh: () => void
  onLoadMore: () => void
  onCategorySelect: (categorySlug: string) => void
  onSortSelect: (sortOption: ProductSortType) => void
  onClearFilters: () => void
  onRetry: () => void
}

export const HomeTemplate: React.FC<HomeTemplateProps> = ({
  // Loading states
  isLoading,
  error,

  // Data
  products,
  categories,
  categoriesLoading,
  totalProducts,

  // Filter & Sort state
  selectedCategory,
  currentSort,
  hasActiveFilters,
  activeFiltersCount,
  hasFilters,

  // List state
  isRefetching,
  isFetchingNextPage,
  hasNextPage,

  // Handlers
  onRefresh,
  onLoadMore,
  onCategorySelect,
  onSortSelect,
  onClearFilters,
  onRetry,
}) => {
  if (isLoading) {
    return (
      <SafeAreaView className='flex-1 bg-gray-50'>
        <LoadingSpinner />
        <Text className='mt-4 text-center text-gray-600'>Loading products...</Text>
      </SafeAreaView>
    )
  }

  if (error) {
    return (
      <SafeAreaView className='flex-1 bg-gray-50'>
        <ErrorMessage message='Failed to load products. Please try again.' onRetry={onRetry} />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className='flex-1 bg-gray-50'>
      <ProductListHeader
        title='Products'
        totalProducts={totalProducts}
        currentProducts={products.length}
        hasActiveFilters={hasActiveFilters}
        // Filter props
        categories={categories}
        categoriesLoading={categoriesLoading}
        selectedCategory={selectedCategory}
        activeFiltersCount={activeFiltersCount}
        hasFilters={hasFilters}
        onCategorySelect={onCategorySelect}
        onClearFilters={onClearFilters}
        // Sort props
        currentSort={currentSort}
        onSortSelect={onSortSelect}
      />

      <ProductList
        onClearFilters={onClearFilters}
        products={products}
        isRefetching={isRefetching}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        error={error}
        totalProducts={totalProducts}
        hasActiveFilters={hasActiveFilters}
        onRefresh={onRefresh}
        onLoadMore={onLoadMore}
      />
    </SafeAreaView>
  )
}

import React, {useMemo, useCallback, useEffect} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useInfiniteProducts} from '@/hooks/useProducts'
import {useFilterStore} from '@/stores/filter.store'
import {LoadingSpinner, ErrorMessage, Text} from '@/ui/atoms'
import {ProductListHeader, ProductList} from '@/ui/organisms'
import {GetProductsParams} from '@/services/products.service'
import {useGlobalSearchParams} from 'expo-router'

export const HomeTemplate: React.FC = () => {
  const {category} = useGlobalSearchParams<{
    category: string
  }>()
  const {filters, sort, hasActiveFilters, setFilters} = useFilterStore()

  useEffect(() => {
    if (!category) return

    setFilters({category: category})
  }, [category, setFilters])

  // Build query parameters based on filters and sort
  const queryParams = useMemo(() => {
    const params: GetProductsParams = {}

    if (filters.category) {
      params.category = filters.category
    }

    // Map sort field to API field names
    const sortFieldMap = {
      title: 'title',
      price: 'price',
      rating: 'rating',
    }

    params.sortBy = sortFieldMap[sort.field]
    params.order = sort.order

    return params
  }, [filters.category, sort])

  const {data, isLoading, error, refetch, isRefetching, fetchNextPage, hasNextPage, isFetchingNextPage} =
    useInfiniteProducts(queryParams)

  const allProducts = useMemo(() => {
    return data?.pages.flatMap(page => page.products) ?? []
  }, [data])

  const totalProducts = data?.pages[0]?.total ?? 0

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

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
        <ErrorMessage message='Failed to load products. Please try again.' onRetry={() => refetch()} />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className='flex-1 bg-gray-50'>
      <ProductListHeader
        title='Products'
        totalProducts={totalProducts}
        currentProducts={allProducts.length}
        hasActiveFilters={hasActiveFilters()}
      />

      <ProductList
        products={allProducts}
        isLoading={isLoading}
        isRefetching={isRefetching}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage ?? false}
        error={error}
        totalProducts={totalProducts}
        hasActiveFilters={hasActiveFilters()}
        onRefresh={refetch}
        onLoadMore={handleLoadMore}
      />
    </SafeAreaView>
  )
}

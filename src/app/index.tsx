import {useMemo, useCallback, useEffect} from 'react'
import {View, Text, FlatList, RefreshControl} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useInfiniteProducts} from '../hooks/useProducts'
import {useFilterStore} from '../stores/filter.store'
import {ProductCard} from '../components/ProductCard'
import {ProductFilter} from '../components/ProductFilter'
import {ProductSort} from '../components/ProductSort'
import {ProductListFooter} from '../components/ProductListFooter'
import {LoadingSpinner} from '../components/ui/LoadingSpinner'
import {ErrorMessage} from '../components/ui/ErrorMessage'
import {Product} from '../types/domain.types'
import {GetProductsParams} from '@/services/products.service'
import {useGlobalSearchParams} from 'expo-router'

export default function ProductsScreen() {
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

  const renderProduct = ({item}: {item: Product}) => <ProductCard product={item} />

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  const renderFooter = useCallback(() => {
    return (
      <ProductListFooter
        isLoading={isFetchingNextPage}
        hasMore={hasNextPage ?? false}
        onLoadMore={handleLoadMore}
        error={error?.message}
        totalItems={totalProducts}
        currentItems={allProducts.length}
      />
    )
  }, [isFetchingNextPage, hasNextPage, handleLoadMore, error, totalProducts, allProducts.length])

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
      <View className='border-b border-gray-200 bg-white px-4 py-2'>
        <Text className='mb-4 text-2xl font-bold text-gray-900'>Products</Text>

        <View className='mb-2 flex-row space-x-3'>
          <ProductFilter />
          <ProductSort />
        </View>

        <View className='mt-2 flex-row items-center justify-between'>
          <Text className='text-gray-600'>
            showing {allProducts.length} product{allProducts.length !== 1 ? 's' : ''}
            {hasActiveFilters() && ' (filtered)'}
          </Text>

          {totalProducts > 0 && <Text className='text-sm text-gray-500'>Total: {totalProducts} products</Text>}
        </View>
      </View>

      <FlatList
        data={allProducts}
        keyExtractor={item => item.id.toString()}
        renderItem={renderProduct}
        contentContainerStyle={{padding: 16}}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor='#10b981' colors={['#10b981']} />
        }
        showsVerticalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={allProducts.length > 0 ? renderFooter : null}
        ListEmptyComponent={
          <View className='flex-1 items-center justify-center py-12'>
            <Text className='text-center text-lg text-gray-500'>
              {hasActiveFilters() ? 'No products match your criteria' : 'No products available'}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  )
}

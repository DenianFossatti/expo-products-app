import React, {useCallback, useMemo} from 'react'
import {FlatList, RefreshControl, View} from 'react-native'
import {Product} from '@/modules/product/types/domain.types'
import {ProductCard, ProductListFooter} from '@/ui/molecules'
import {Button, Text} from '@/ui/atoms'

interface ProductListProps {
  products: Product[]
  isRefetching: boolean
  onClearFilters: () => void
  isFetchingNextPage: boolean
  hasNextPage: boolean
  error?: Error | null
  totalProducts: number
  hasActiveFilters: boolean
  onRefresh: () => void
  onProductPress: (product: Product) => void
  onLoadMore: () => void
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  isRefetching,
  onClearFilters,
  isFetchingNextPage,
  hasNextPage,
  error,
  totalProducts,
  hasActiveFilters,
  onRefresh,
  onProductPress,
  onLoadMore,
}) => {
  const renderProduct = useCallback(
    ({item}: {item: Product}) => <ProductCard product={item} onPress={onProductPress} />,
    [onProductPress]
  )

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      onLoadMore()
    }
  }, [hasNextPage, isFetchingNextPage, onLoadMore])

  const FooterComponent = useMemo(() => {
    if (products.length === 0) return null

    return (
      <ProductListFooter
        isLoading={isFetchingNextPage}
        hasMore={hasNextPage ?? false}
        onLoadMore={handleLoadMore}
        error={error?.message}
        totalItems={totalProducts}
        currentItems={products.length}
      />
    )
  }, [isFetchingNextPage, hasNextPage, handleLoadMore, error, totalProducts, products.length])

  const EmptyComponent = useMemo(() => {
    return (
      <View className='flex-1 items-center justify-center gap-4 py-12'>
        <Text className='text-center text-lg text-gray-500'>
          {hasActiveFilters ? 'No products match your criteria' : 'No products available'}
        </Text>
        <Button variant='default' size='sm' onPress={onClearFilters}>
          <Text>Clear Filters</Text>
        </Button>
      </View>
    )
  }, [hasActiveFilters, onClearFilters])

  const refreshControl = useMemo(() => {
    return <RefreshControl refreshing={isRefetching} onRefresh={onRefresh} />
  }, [isRefetching, onRefresh])

  const keyExtractor = useCallback((item: Product) => item.id.toString(), [])

  const contentContainerStyle = useMemo(() => {
    return {padding: 16}
  }, [])

  return (
    <FlatList
      data={products}
      keyExtractor={keyExtractor}
      renderItem={renderProduct}
      contentContainerStyle={contentContainerStyle}
      refreshControl={refreshControl}
      showsVerticalScrollIndicator={false}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.3}
      ListFooterComponent={FooterComponent}
      ListEmptyComponent={EmptyComponent}
    />
  )
}

import React, {useCallback} from 'react'
import {FlatList, RefreshControl, View} from 'react-native'
import {Product} from '@/types/domain.types'
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
  const renderProduct = ({item}: {item: Product}) => <ProductCard product={item} onPress={onProductPress} />

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      onLoadMore()
    }
  }, [hasNextPage, isFetchingNextPage, onLoadMore])

  const renderFooter = useCallback(() => {
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

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id.toString()}
      renderItem={renderProduct}
      contentContainerStyle={{padding: 16}}
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={onRefresh} tintColor='#10b981' colors={['#10b981']} />
      }
      showsVerticalScrollIndicator={false}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.3}
      ListFooterComponent={products.length > 0 ? renderFooter : null}
      ListEmptyComponent={
        <View className='flex-1 items-center justify-center gap-4 py-12'>
          <Text className='text-center text-lg text-gray-500'>
            {hasActiveFilters ? 'No products match your criteria' : 'No products available'}
          </Text>
          <Button variant='default' size='sm' onPress={onClearFilters}>
            <Text>Clear Filters</Text>
          </Button>
        </View>
      }
    />
  )
}

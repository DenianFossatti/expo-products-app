import React, {useMemo, useCallback, useEffect, useRef} from 'react'
import {useInfiniteProducts} from '@/hooks/useProducts'
import {useFilterStore} from '@/stores/filter.store'
import {useCategories} from '@/hooks/useCategories'
import {HomeTemplate} from '@/ui/templates'
import {ProductSort as ProductSortType} from '@/types/domain.types'
import {GetProductsParams} from '@/services/products.service'
import {useGlobalSearchParams} from 'expo-router'

export default function ProductsScreen() {
  const {category} = useGlobalSearchParams<{
    category: string
  }>()
  const {filters, sort, hasActiveFilters, setFilters, clearFilters, getActiveFiltersCount, setSort} = useFilterStore()
  const {data: categories, isLoading: categoriesLoading} = useCategories()
  const categoryParam = useRef(category)

  useEffect(() => {
    // Prevent setting the same category multiple times
    if (!category || category === categoryParam.current) return

    setFilters({category: category})
    categoryParam.current = category
  }, [category, setFilters])

  const queryParams = useMemo(() => {
    const params: GetProductsParams = {}

    if (filters.category) {
      params.category = filters.category
    }

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

  const handleCategorySelect = useCallback(
    (categorySlug: string) => {
      const newCategory = filters.category === categorySlug ? undefined : categorySlug
      setFilters({category: newCategory})
    },
    [filters.category, setFilters]
  )

  const handleSortSelect = useCallback(
    (sortOption: ProductSortType) => {
      setSort(sortOption)
    },
    [setSort]
  )

  const handleClearFilters = useCallback(() => {
    clearFilters()
  }, [clearFilters])

  const activeFiltersCount = getActiveFiltersCount()
  const hasFilters = hasActiveFilters()

  return (
    <HomeTemplate
      // Loading states
      isLoading={isLoading}
      error={error}
      // Data
      products={allProducts}
      categories={categories}
      categoriesLoading={categoriesLoading}
      totalProducts={totalProducts}
      // Filter & Sort state
      selectedCategory={filters.category}
      currentSort={sort}
      hasActiveFilters={hasActiveFilters()}
      activeFiltersCount={activeFiltersCount}
      hasFilters={hasFilters}
      // List state
      isRefetching={isRefetching}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage ?? false}
      // Handlers
      onRefresh={refetch}
      onLoadMore={handleLoadMore}
      onCategorySelect={handleCategorySelect}
      onSortSelect={handleSortSelect}
      onClearFilters={handleClearFilters}
      onRetry={() => refetch()}
    />
  )
}

import {useQuery, useInfiniteQuery} from '@tanstack/react-query'
import {productsService, GetProductsParams} from '../services/products.service'
import {ProductMapper} from '../mappers/product.mapper'
import {ProductsResponse, Product} from '../types/domain.types'

export const PRODUCTS_QUERY_KEY = 'products'

interface UseProductsOptions extends GetProductsParams {
  enabled?: boolean
}

export const useProducts = (options: UseProductsOptions = {}) => {
  const {enabled = true, ...params} = options

  return useQuery({
    queryKey: [PRODUCTS_QUERY_KEY, params],
    queryFn: async (): Promise<ProductsResponse> => {
      const response = await productsService.getProducts({
        limit: 30,
        ...params,
      })
      return ProductMapper.toProductsResponse(response)
    },
    enabled,
  })
}

export const useInfiniteProducts = (options: UseProductsOptions = {}) => {
  const {enabled = true, ...params} = options

  return useInfiniteQuery({
    queryKey: [PRODUCTS_QUERY_KEY, 'infinite', params],
    queryFn: async ({pageParam = 0}): Promise<ProductsResponse> => {
      const response = await productsService.getProducts({
        limit: 20,
        skip: pageParam,
        ...params,
      })
      return ProductMapper.toProductsResponse(response)
    },
    getNextPageParam: lastPage => {
      if (!lastPage.hasMore) return undefined
      return lastPage.skip + lastPage.limit
    },
    initialPageParam: 0,
    enabled,
  })
}

export const useProduct = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: [PRODUCTS_QUERY_KEY, id],
    queryFn: async (): Promise<Product> => {
      const response = await productsService.getProduct({id})
      return ProductMapper.toDomain(response)
    },
    enabled: enabled && !!id,
  })
}

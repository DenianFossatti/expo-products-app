import {useQuery} from '@tanstack/react-query'
import {productsService} from '../services/products.service'
import {CategoryMapper} from '../mappers/category.mapper'
import {Category} from '../types/domain.types'

export const CATEGORIES_QUERY_KEY = 'categories'

export const useCategories = (enabled: boolean = true) => {
  return useQuery({
    queryKey: [CATEGORIES_QUERY_KEY],
    queryFn: async (): Promise<Category[]> => {
      const response = await productsService.getCategories()
      return CategoryMapper.toDomainList(response)
    },
    enabled,
  })
}

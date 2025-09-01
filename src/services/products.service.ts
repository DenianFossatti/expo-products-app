import {apiClient} from './api/client'
import {ProductsResponseDTO, ProductDTO, CategoryDTO} from '../types/api.types'

export interface GetProductsParams {
  limit?: number
  skip?: number
  category?: string
  sortBy?: string
  order?: 'asc' | 'desc'
}

export interface GetProductParams {
  id: string
}

export class ProductsService {
  async getProducts(params: GetProductsParams = {}): Promise<ProductsResponseDTO> {
    const searchParams = new URLSearchParams()

    if (params.limit) searchParams.append('limit', params.limit.toString())
    if (params.skip) searchParams.append('skip', params.skip.toString())
    if (params.sortBy) searchParams.append('sortBy', params.sortBy)
    if (params.order) searchParams.append('order', params.order)

    let endpoint = '/products'

    // Handle different endpoints based on parameters
    if (params.category) {
      endpoint = `/products/category/${encodeURIComponent(params.category)}`
      if (searchParams.toString()) {
        endpoint += `?${searchParams.toString()}`
      }
    } else if (searchParams.toString()) {
      endpoint += `?${searchParams.toString()}`
    }

    return apiClient.get<ProductsResponseDTO>(endpoint)
  }

  async getProduct(params: GetProductParams): Promise<ProductDTO> {
    return apiClient.get<ProductDTO>(`/products/${params.id}`)
  }

  async getCategories(): Promise<CategoryDTO[]> {
    return apiClient.get<CategoryDTO[]>('/products/categories')
  }
}

export const productsService = new ProductsService()

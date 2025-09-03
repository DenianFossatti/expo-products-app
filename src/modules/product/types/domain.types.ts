export interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
  isInStock: boolean
  discountedPrice: number
  tags?: string[]
  sku?: string
  weight?: number
  dimensions?: {
    width: number
    height: number
    depth: number
  }
  warrantyInformation?: string
  shippingInformation?: string
  returnPolicy?: string
  minimumOrderQuantity?: number
  reviews?: {
    rating: number
    comment: string
    date: Date
    reviewerName: string
    reviewerEmail: string
  }[]
}

export interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
  hasMore: boolean
}

export interface Category {
  slug: string
  name: string
  url: string
}

export interface ProductFilters {
  category?: string
}

export interface ProductSort {
  field: 'price' | 'rating' | 'title'
  order: 'asc' | 'desc'
}

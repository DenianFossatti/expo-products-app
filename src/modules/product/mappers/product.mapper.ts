import {ProductDTO, ProductsResponseDTO} from '../types/api.types'
import {Product, ProductsResponse} from '../types/domain.types'

export class ProductMapper {
  static toDomain(dto: ProductDTO): Product {
    return {
      id: dto.id,
      title: dto.title,
      description: dto.description,
      price: dto.price,
      discountPercentage: dto.discountPercentage,
      rating: dto.rating,
      stock: dto.stock,
      brand: dto.brand,
      category: dto.category,
      thumbnail: dto.thumbnail,
      images: dto.images,
      isInStock: dto.stock > 0,
      discountedPrice: dto.price - dto.price * (dto.discountPercentage / 100),
      tags: dto.tags,
      sku: dto.sku,
      weight: dto.weight,
      dimensions: dto.dimensions,
      warrantyInformation: dto.warrantyInformation,
      shippingInformation: dto.shippingInformation,
      returnPolicy: dto.returnPolicy,
      minimumOrderQuantity: dto.minimumOrderQuantity,
      reviews: dto.reviews?.map(review => ({
        ...review,
        date: new Date(review.date),
      })),
    }
  }

  static toDomainList(dtos: ProductDTO[]): Product[] {
    return dtos.map(dto => this.toDomain(dto))
  }

  static toProductsResponse(dto: ProductsResponseDTO): ProductsResponse {
    return {
      products: this.toDomainList(dto.products),
      total: dto.total,
      skip: dto.skip,
      limit: dto.limit,
      hasMore: dto.skip + dto.limit < dto.total,
    }
  }

  static toDTO(product: Product): ProductDTO {
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      category: product.category,
      price: product.price,
      discountPercentage: product.discountPercentage,
      rating: product.rating,
      stock: product.stock,
      tags: product.tags || [],
      brand: product.brand,
      sku: product.sku || '',
      weight: product.weight || 0,
      dimensions: product.dimensions || {width: 0, height: 0, depth: 0},
      warrantyInformation: product.warrantyInformation || '',
      shippingInformation: product.shippingInformation || '',
      availabilityStatus: product.isInStock ? 'In Stock' : 'Out of Stock',
      reviews:
        product.reviews?.map(review => ({
          ...review,
          date: review.date,
        })) || [],
      returnPolicy: product.returnPolicy || '',
      minimumOrderQuantity: product.minimumOrderQuantity || 1,
      meta: {
        createdAt: new Date(),
        updatedAt: new Date(),
        barcode: '',
        qrCode: '',
      },
      thumbnail: product.thumbnail,
      images: product.images,
    }
  }
}

import {CategoryDTO} from '../types/api.types'
import {Category} from '../types/domain.types'

export class CategoryMapper {
  static toDomain(dto: CategoryDTO): Category {
    return {
      slug: dto.slug,
      name: dto.name,
      url: dto.url,
    }
  }

  static toDomainList(dtos: CategoryDTO[]): Category[] {
    return dtos.map(dto => this.toDomain(dto))
  }

  static toDTO(category: Category): CategoryDTO {
    return {
      slug: category.slug,
      name: category.name,
      url: category.url,
    }
  }

  /**
   * Transform string array to Category objects
   * DummyJSON returns categories as simple strings
   */
  static fromStringArray(categories: string[]): Category[] {
    return categories.map(categoryName => ({
      slug: categoryName.toLowerCase().replace(/\s+/g, '-'),
      name: categoryName,
      url: `/category/${categoryName.toLowerCase().replace(/\s+/g, '-')}`,
    }))
  }
}

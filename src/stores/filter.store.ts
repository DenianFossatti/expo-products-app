import {create} from 'zustand'
import {ProductFilters, ProductSort} from '../types/domain.types'

interface FilterState {
  filters: ProductFilters
  sort: ProductSort

  setFilters: (filters: Partial<ProductFilters>) => void
  clearFilters: () => void
  setSort: (sort: ProductSort) => void
  resetAll: () => void

  hasActiveFilters: () => boolean
  getActiveFiltersCount: () => number
}

const initialFilters: ProductFilters = {
  category: undefined,
}

const initialSort: ProductSort = {
  field: 'title',
  order: 'asc',
}

export const useFilterStore = create<FilterState>()((set, get) => ({
  filters: initialFilters,
  sort: initialSort,

  setFilters: newFilters =>
    set(state => ({
      filters: {...state.filters, ...newFilters},
    })),

  clearFilters: () =>
    set({
      filters: initialFilters,
    }),

  setSort: sort => set({sort}),

  resetAll: () =>
    set({
      filters: initialFilters,
      sort: initialSort,
    }),

  hasActiveFilters: () => {
    const {filters} = get()
    return !!filters.category
  },

  getActiveFiltersCount: () => {
    const {filters} = get()
    let count = 0

    if (filters.category) count++

    return count
  },
}))

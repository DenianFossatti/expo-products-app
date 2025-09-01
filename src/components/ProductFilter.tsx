import React, {useState} from 'react'
import {View, Text, Modal, ScrollView} from 'react-native'
import {Filter, X} from 'lucide-react-native'
import {useFilterStore} from '../stores/filter.store'
import {useCategories} from '../hooks/useCategories'
import {cn} from '../lib/utils'
import {Button} from './ui/Button'
import {Badge} from './ui/Badge'

export const ProductFilter: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const {filters, setFilters, clearFilters, hasActiveFilters, getActiveFiltersCount} = useFilterStore()
  const {data: categories, isLoading: categoriesLoading} = useCategories()

  const activeFiltersCount = getActiveFiltersCount()
  const hasFilters = hasActiveFilters()

  const handleCategorySelect = (categorySlug: string) => {
    const newCategory = filters.category === categorySlug ? undefined : categorySlug
    setFilters({category: newCategory})
  }

  const handleClearFilters = () => {
    clearFilters()
    setIsModalVisible(false)
  }

  return (
    <>
      <Button
        variant={hasFilters ? 'default' : 'outline'}
        onPress={() => setIsModalVisible(true)}
        className='flex-row items-center space-x-2'
      >
        <Filter size={16} className={hasFilters ? 'text-primary-foreground' : 'text-foreground'} />
        <Text className={cn('font-medium', hasFilters ? 'text-primary-foreground' : 'text-foreground')}>Filter</Text>
        {activeFiltersCount > 0 && (
          <Badge variant='secondary' className='ml-1'>
            <Text>{activeFiltersCount}</Text>
          </Badge>
        )}
      </Button>

      <Modal
        visible={isModalVisible}
        animationType='slide'
        presentationStyle='pageSheet'
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View className='flex-1 bg-background'>
          <View className='flex-row items-center justify-between border-b border-border bg-card p-4'>
            <Button variant='ghost' onPress={() => setIsModalVisible(false)}>
              <X size={20} className='text-foreground' />
            </Button>

            <Text className='text-lg font-semibold text-card-foreground'>Filters</Text>

            <Button variant='ghost' onPress={handleClearFilters}>
              <Text className='font-medium text-destructive'>Clear All</Text>
            </Button>
          </View>

          <ScrollView className='flex-1 p-4'>
            <View className='mb-6'>
              <Text className='mb-3 text-lg font-semibold text-foreground'>Categories</Text>

              {categoriesLoading ? (
                <Text className='text-muted-foreground'>Loading categories...</Text>
              ) : (
                <View className='flex-row flex-wrap gap-2'>
                  {categories?.map(category => (
                    <Button
                      key={category.slug}
                      variant={filters.category === category.slug ? 'default' : 'outline'}
                      size='sm'
                      onPress={() => handleCategorySelect(category.slug)}
                      className='rounded-full'
                    >
                      <Text
                        className={cn(
                          'capitalize text-sm',
                          filters.category === category.slug ? 'text-primary-foreground' : 'text-foreground'
                        )}
                      >
                        {category.name}
                      </Text>
                    </Button>
                  ))}
                </View>
              )}
            </View>
          </ScrollView>

          <View className='border-t border-border bg-card p-4'>
            <Button onPress={() => setIsModalVisible(false)} className='w-full'>
              <Text className='text-white'>Apply Filters</Text>
            </Button>
          </View>
        </View>
      </Modal>
    </>
  )
}

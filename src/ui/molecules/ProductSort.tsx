import React, {useState} from 'react'
import {View, TouchableOpacity, Modal} from 'react-native'
import {ArrowUpDown, X, Check} from 'lucide-react-native'
import {useFilterStore} from '@/stores/filter.store'
import {ProductSort as ProductSortType} from '@/types/domain.types'
import {cn} from '@/lib/utils'
import {Button, Text} from '@/ui/atoms'

const SORT_OPTIONS: {
  label: string
  value: ProductSortType
  description: string
}[] = [
  {
    label: 'Name A-Z',
    value: {field: 'title', order: 'asc'},
    description: 'Sort by name alphabetically',
  },
  {
    label: 'Name Z-A',
    value: {field: 'title', order: 'desc'},
    description: 'Sort by name reverse alphabetically',
  },
  {
    label: 'Price Low to High',
    value: {field: 'price', order: 'asc'},
    description: 'Sort by price ascending',
  },
  {
    label: 'Price High to Low',
    value: {field: 'price', order: 'desc'},
    description: 'Sort by price descending',
  },
  {
    label: 'Highest Rated',
    value: {field: 'rating', order: 'desc'},
    description: 'Sort by rating descending',
  },
  {
    label: 'Lowest Rated',
    value: {field: 'rating', order: 'asc'},
    description: 'Sort by rating ascending',
  },
]

export const ProductSort: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const {sort, setSort} = useFilterStore()

  const handleSortSelect = (sortOption: ProductSortType) => {
    setSort(sortOption)
    setIsModalVisible(false)
  }

  return (
    <>
      <Button variant='outline' onPress={() => setIsModalVisible(true)} className='flex-row items-center space-x-2'>
        <ArrowUpDown size={16} className='text-foreground' />
        <Text className='font-medium text-foreground'>Sort</Text>
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

            <Text className='text-lg font-semibold text-card-foreground'>Sort By</Text>

            <View style={{width: 40}} />
          </View>

          <View className='flex-1 p-4'>
            {SORT_OPTIONS.map((option, index) => {
              const isSelected = option.value.field === sort.field && option.value.order === sort.order

              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleSortSelect(option.value)}
                  className={cn(
                    'flex-row items-center justify-between py-4 px-4 rounded-lg mb-2 border',
                    isSelected ? 'bg-primary/10 border-primary' : 'bg-card border-border'
                  )}
                >
                  <View className='flex-1'>
                    <Text className={cn('font-medium', isSelected ? 'text-primary' : 'text-card-foreground')}>
                      {option.label}
                    </Text>
                    <Text className='mt-1 text-sm text-muted-foreground'>{option.description}</Text>
                  </View>

                  {isSelected && (
                    <View className='size-6 items-center justify-center rounded-full bg-primary'>
                      <Check size={14} className='text-primary-foreground' />
                    </View>
                  )}
                </TouchableOpacity>
              )
            })}
          </View>
        </View>
      </Modal>
    </>
  )
}

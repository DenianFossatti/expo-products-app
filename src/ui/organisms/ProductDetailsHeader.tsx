import React from 'react'
import {View, TouchableOpacity} from 'react-native'
import {router} from 'expo-router'
import {ArrowLeft} from 'lucide-react-native'
import {Text} from '@/ui/atoms'

interface ProductDetailsHeaderProps {
  title?: string
}

export const ProductDetailsHeader: React.FC<ProductDetailsHeaderProps> = ({title = 'Product Details'}) => {
  const handleGoBack = () => {
    router.back()
  }

  return (
    <View className='flex-row items-center justify-between border-b border-gray-200 bg-white px-4 py-3'>
      <TouchableOpacity onPress={handleGoBack} className='rounded-full p-2'>
        <ArrowLeft size={24} className='text-gray-700' />
      </TouchableOpacity>
      <Text className='flex-1 text-center text-lg font-semibold text-gray-900'>{title}</Text>
      <View className='w-10' />
    </View>
  )
}

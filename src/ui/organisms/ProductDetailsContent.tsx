import React from 'react'
import {View, ScrollView, Image, Dimensions} from 'react-native'
import {Star, Package, Truck, Shield} from 'lucide-react-native'
import {Product} from '@/modules/product/types/domain.types'
import {Card, CardContent, Badge, Text} from '@/ui/atoms'
import {formatPrice} from '@/modules/shared/utils/format'

const {width: screenWidth} = Dimensions.get('window')

interface ProductDetailsContentProps {
  product: Product
}

export const ProductDetailsContent: React.FC<ProductDetailsContentProps> = ({product}) => {
  return (
    <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
      <View className='bg-white'>
        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
          {product.images.map((image, index) => (
            <Image
              key={index}
              source={{uri: image}}
              style={{width: screenWidth, height: 300}}
              resizeMode='contain'
              className='bg-gray-100'
            />
          ))}
        </ScrollView>

        {product.discountPercentage > 0 && (
          <View className='absolute left-4 top-4'>
            <Badge variant='destructive' className='shadow-lg'>
              <Text className='font-semibold'>-{product.discountPercentage}%</Text>
            </Badge>
          </View>
        )}
      </View>

      <View className='gap-2 p-4'>
        <Card>
          <CardContent className='gap-4 p-4'>
            <View className='gap-2'>
              <Text className='text-2xl font-bold text-gray-900'>{product.title}</Text>
              <Text className='text-base capitalize text-gray-600'>
                {product.category} • {product.brand}
              </Text>
            </View>

            <View className='flex-row items-center justify-between'>
              <View className='gap-1'>
                {product.discountPercentage > 0 ? (
                  <View className='flex-row items-center gap-2'>
                    <Text className='text-3xl font-bold text-green-600'>{formatPrice(product.discountedPrice)}</Text>
                    <Text className='text-lg text-gray-500 line-through'>{formatPrice(product.price)}</Text>
                  </View>
                ) : (
                  <Text className='text-3xl font-bold text-green-600'>{formatPrice(product.price)}</Text>
                )}
              </View>

              <View className='flex-row items-center gap-2 rounded-full bg-yellow-50 px-3 py-2'>
                <Star size={16} className='text-yellow-500' color='#eab308' fill='#eab308' />
                <Text className='font-semibold text-gray-800'>{product.rating.toFixed(1)}</Text>
              </View>
            </View>

            <View className='flex-row items-center gap-2'>
              <Package size={16} className='text-gray-600' />
              <Badge variant={product.isInStock ? 'secondary' : 'destructive'}>
                <Text>{product.isInStock ? `${product.stock} in stock` : 'Out of stock'}</Text>
              </Badge>
            </View>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-4'>
            <Text className='mb-2 text-lg font-semibold text-gray-900'>Description</Text>
            <Text className='leading-6 text-gray-700'>{product.description}</Text>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='gap-3 p-4'>
            <Text className='text-lg font-semibold text-gray-900'>Product Details</Text>

            {product.dimensions && (
              <View className='flex-row justify-between border-b border-gray-100 pb-2'>
                <Text className='text-gray-600'>Dimensions</Text>
                <Text className='font-medium text-gray-900'>
                  {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} cm
                </Text>
              </View>
            )}

            {product.weight && (
              <View className='flex-row justify-between border-b border-gray-100 pb-2'>
                <Text className='text-gray-600'>Weight</Text>
                <Text className='font-medium text-gray-900'>{product.weight} kg</Text>
              </View>
            )}

            <View className='flex-row justify-between border-b border-gray-100 pb-2'>
              <Text className='text-gray-600'>SKU</Text>
              <Text className='font-medium text-gray-900'>{product.sku}</Text>
            </View>

            <View className='flex-row justify-between border-b border-gray-100 pb-2'>
              <Text className='text-gray-600'>Minimum Order</Text>
              <Text className='font-medium text-gray-900'>{product.minimumOrderQuantity} units</Text>
            </View>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='gap-3 p-4'>
            <Text className='text-lg font-semibold text-gray-900'>Shipping & Warranty</Text>

            <View className='flex-row items-start gap-2'>
              <Truck size={16} className='text-blue-600' />
              <View className='flex-1 gap-2'>
                <Text className='font-medium text-gray-900'>Shipping Information</Text>
                <Text className='text-gray-600'>{product.shippingInformation}</Text>
              </View>
            </View>

            <View className='flex-row items-start gap-2'>
              <Shield size={16} className='text-green-600' />
              <View className='flex-1 gap-2'>
                <Text className='font-medium text-gray-900'>Warranty</Text>
                <Text className='text-gray-600'>{product.warrantyInformation}</Text>
              </View>
            </View>

            <View className='flex-row items-start gap-2'>
              <Package size={16} className='text-orange-600' />
              <View className='flex-1 gap-2'>
                <Text className='font-medium text-gray-900'>Return Policy</Text>
                <Text className='text-gray-600'>{product.returnPolicy}</Text>
              </View>
            </View>
          </CardContent>
        </Card>

        {product.tags && product.tags.length > 0 && (
          <Card>
            <CardContent className='p-4'>
              <Text className='mb-3 text-lg font-semibold text-gray-900'>Tags</Text>
              <View className='flex-row flex-wrap gap-2'>
                {product.tags.map((tag, index) => (
                  <Badge key={index} variant='outline'>
                    <Text className='capitalize'>{tag}</Text>
                  </Badge>
                ))}
              </View>
            </CardContent>
          </Card>
        )}

        {product.reviews && product.reviews.length > 0 && (
          <Card>
            <CardContent className='p-4'>
              <Text className='mb-3 text-lg font-semibold text-gray-900'>Reviews ({product.reviews.length})</Text>
              <View className='gap-3'>
                {product.reviews.map((review, index) => (
                  <View key={index} className='border-b border-gray-100 pb-3 last:border-b-0'>
                    <View className='mb-2 flex-row items-center justify-between'>
                      <Text className='font-medium text-gray-900'>{review.reviewerName}</Text>
                      <View className='flex-row items-center gap-2'>
                        <Star size={12} className='text-yellow-500' color='#eab308' fill='#eab308' />
                        <Text className='text-sm text-gray-600'>{review.rating}</Text>
                      </View>
                    </View>
                    <Text className='text-gray-700'>{review.comment}</Text>
                    <Text className='mt-1 text-xs text-gray-500'>{new Date(review.date).toLocaleDateString()}</Text>
                  </View>
                ))}
              </View>
            </CardContent>
          </Card>
        )}
      </View>
    </ScrollView>
  )
}

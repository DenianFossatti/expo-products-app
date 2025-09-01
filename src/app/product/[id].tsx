import {View, ScrollView, Image, Dimensions, TouchableOpacity} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useLocalSearchParams, router} from 'expo-router'
import {ArrowLeft, Star, Package, Truck, Shield} from 'lucide-react-native'
import {useProduct} from '../../hooks/useProducts'
import {LoadingSpinner} from '../../components/ui/LoadingSpinner'
import {ErrorMessage} from '../../components/ui/ErrorMessage'
import {Card, CardContent} from '../../components/ui/Card'
import {Badge} from '../../components/ui/Badge'
import {Text} from '../../components/ui/Text'

const {width: screenWidth} = Dimensions.get('window')

export default function ProductDetailsScreen() {
  const {id} = useLocalSearchParams<{id: string}>()

  const {data: product, isLoading, error, refetch} = useProduct(id)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  const handleGoBack = () => {
    router.back()
  }

  if (isLoading) {
    return (
      <SafeAreaView className='flex-1 bg-gray-50'>
        <LoadingSpinner />
        <Text className='mt-4 text-center text-gray-600'>Loading product details...</Text>
      </SafeAreaView>
    )
  }

  if (error || !product) {
    return (
      <SafeAreaView className='flex-1 bg-gray-50'>
        <ErrorMessage message='Failed to load product details. Please try again.' onRetry={() => refetch()} />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className='flex-1 bg-gray-50'>
      {/* Header */}
      <View className='flex-row items-center justify-between border-b border-gray-200 bg-white px-4 py-3'>
        <TouchableOpacity onPress={handleGoBack} className='rounded-full p-2'>
          <ArrowLeft size={24} className='text-gray-700' />
        </TouchableOpacity>
        <Text className='flex-1 text-center text-lg font-semibold text-gray-900'>Product Details</Text>
        <View className='w-10' />
      </View>

      <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
        {/* Product Images */}
        <View className='bg-white'>
          <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
            {product.images.map((image, index) => (
              <Image
                key={index}
                source={{uri: image}}
                style={{width: screenWidth, height: 300}}
                resizeMode='cover'
                className='bg-gray-100'
              />
            ))}
          </ScrollView>

          {/* Discount Badge */}
          {product.discountPercentage > 0 && (
            <View className='absolute left-4 top-4'>
              <Badge variant='destructive' className='shadow-lg'>
                <Text className='font-semibold'>-{Math.round(product.discountPercentage)}%</Text>
              </Badge>
            </View>
          )}
        </View>

        <View className='gap-2 p-4'>
          {/* Product Info */}
          <Card>
            <CardContent className='gap-4 p-4'>
              <View className='gap-2'>
                <Text className='text-2xl font-bold text-gray-900'>{product.title}</Text>
                <Text className='text-base capitalize text-gray-600'>
                  {product.category} • {product.brand}
                </Text>
              </View>

              {/* Price and Rating */}
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

                <View className='flex-row items-center rounded-full bg-yellow-50 px-3 py-2'>
                  <Star size={16} className='mr-1 text-yellow-500' fill='#eab308' />
                  <Text className='font-semibold text-gray-800'>{product.rating.toFixed(1)}</Text>
                </View>
              </View>

              {/* Stock Status */}
              <View className='flex-row items-center gap-2'>
                <Package size={16} className='text-gray-600' />
                <Badge variant={product.isInStock ? 'secondary' : 'destructive'}>
                  <Text>{product.isInStock ? `${product.stock} in stock` : 'Out of stock'}</Text>
                </Badge>
              </View>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardContent className='p-4'>
              <Text className='mb-2 text-lg font-semibold text-gray-900'>Description</Text>
              <Text className='leading-6 text-gray-700'>{product.description}</Text>
            </CardContent>
          </Card>

          {/* Product Details */}
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

          {/* Shipping & Warranty */}
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

          {/* Tags */}
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

          {/* Reviews */}
          {product.reviews && product.reviews.length > 0 && (
            <Card>
              <CardContent className='p-4'>
                <Text className='mb-3 text-lg font-semibold text-gray-900'>Reviews ({product.reviews.length})</Text>
                <View className='gap-3'>
                  {product.reviews.map((review, index) => (
                    <View key={index} className='border-b border-gray-100 pb-3 last:border-b-0'>
                      <View className='mb-2 flex-row items-center justify-between'>
                        <Text className='font-medium text-gray-900'>{review.reviewerName}</Text>
                        <View className='flex-row items-center'>
                          <Star size={12} className='mr-1 text-yellow-500' fill='#eab308' />
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
    </SafeAreaView>
  )
}

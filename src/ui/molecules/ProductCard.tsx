import React from 'react'
import {View, Image, TouchableOpacity} from 'react-native'
import {router} from 'expo-router'
import {Star} from 'lucide-react-native'
import {Product} from '@/types/domain.types'
import {cn} from '@/lib/utils'
import {Card, CardContent, Badge, Text} from '@/ui/atoms'

interface ProductCardProps {
  product: Product
  onPress?: (product: Product) => void
  className?: string
}

export const ProductCard: React.FC<ProductCardProps> = ({product, onPress, className}) => {
  const handlePress = () => {
    if (onPress) {
      onPress(product)
    } else {
      router.push(`/product/${product.id}`)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  return (
    <TouchableOpacity onPress={handlePress} className={cn('mb-4', className)} activeOpacity={0.95}>
      <Card className='overflow-hidden border-border/50 bg-card shadow-lg'>
        <View className='relative'>
          <Image source={{uri: product.thumbnail}} className='h-52 w-full bg-muted' resizeMode='contain' />

          {product.discountPercentage > 0 && (
            <View className='absolute left-3 top-3'>
              <Badge variant='destructive' className='shadow-sm'>
                <Text>-{product.discountPercentage}%</Text>
              </Badge>
            </View>
          )}

          <View className='absolute right-3 top-3'>
            <Badge variant={product.isInStock ? 'secondary' : 'destructive'} className='shadow-sm'>
              <Text>{product.isInStock ? `${product.stock} in stock` : 'Out of stock'}</Text>
            </Badge>
          </View>
        </View>

        <CardContent className='space-y-3 p-4'>
          <Text className='text-lg font-semibold leading-tight text-card-foreground'>{product.title}</Text>

          <Text className='text-sm capitalize text-muted-foreground'>
            {product.category} • {product.brand}
          </Text>

          <View className='flex-row items-center justify-between'>
            <View className='flex-row items-center gap-2 space-x-2'>
              {product.discountPercentage > 0 ? (
                <>
                  <Text className='text-2xl font-bold text-primary'>{formatPrice(product.discountedPrice)}</Text>
                  <Text className='text-sm text-muted-foreground line-through'>{formatPrice(product.price)}</Text>
                </>
              ) : (
                <Text className='text-2xl font-bold text-primary'>{formatPrice(product.price)}</Text>
              )}
            </View>

            <View className='flex-row items-center gap-2 rounded-full bg-secondary/50 px-2 py-1'>
              <Star size={14} className='text-yellow-500' color='#eab308' fill='#eab308' />
              <Text className='text-sm font-medium text-secondary-foreground'>{product.rating.toFixed(1)}</Text>
            </View>
          </View>
        </CardContent>
      </Card>
    </TouchableOpacity>
  )
}

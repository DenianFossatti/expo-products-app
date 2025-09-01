import {useLocalSearchParams, router} from 'expo-router'
import {ProductDetailsTemplate} from '@/ui/templates'
import {useProduct} from '@/hooks/useProducts'
import {ApiError} from '@/services/api/client'
import {useMemo} from 'react'

export default function ProductDetailsScreen() {
  const {id} = useLocalSearchParams<{id: string}>()

  const {data: product, isLoading, error, refetch} = useProduct(id)

  const isNotFound = useMemo(() => error instanceof ApiError && error.status === 404, [error])

  const handleGoBack = () => {
    router.back()
  }

  return (
    <ProductDetailsTemplate
      isLoading={isLoading}
      error={error}
      product={product}
      isNotFound={isNotFound}
      onRetry={() => refetch()}
      onGoBack={handleGoBack}
    />
  )
}

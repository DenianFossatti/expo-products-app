import {useLocalSearchParams, router} from 'expo-router'
import {ProductDetailsTemplate} from '@/ui/templates'
import {useProduct} from '@/modules/product/hooks/useProducts'
import {ApiError} from '@/modules/shared/services/client'
import {useCallback, useMemo} from 'react'

export default function ProductDetailsScreen() {
  const {id} = useLocalSearchParams<{id: string}>()

  const {data: product, isLoading, error, refetch} = useProduct(id)

  const isNotFound = useMemo(() => error instanceof ApiError && error.status === 404, [error])

  const onBack = useCallback(() => {
    router.back()
  }, [])

  const onRetry = useCallback(() => {
    refetch()
  }, [refetch])

  return (
    <ProductDetailsTemplate
      isLoading={isLoading}
      error={error}
      product={product}
      isNotFound={isNotFound}
      onRetry={onRetry}
      onBack={onBack}
    />
  )
}

import { useServerFn } from '@tanstack/react-start'
import { useEffect, useState } from 'react'

import { useCheckoutPolling } from '#/hooks/useCheckoutPolling'
import { useCreateRoseFormDraft } from '#/hooks/useCreateRoseFormDraft'
import type { CheckoutResult, Flower } from '#/lib/flower-types'
import { useI18n } from '#/lib/i18n/i18n-context'
import { getFlower } from '#/server/flowers'

interface UseCheckoutSuccessFlowerResult {
  checkoutResult: CheckoutResult | null
  flower: Flower | null
  error: string | null
  isLoading: boolean
}

export function useCheckoutSuccessFlower(
  sessionId: string | undefined,
): UseCheckoutSuccessFlowerResult {
  const { t } = useI18n()
  const { clearDraft } = useCreateRoseFormDraft()
  const getFlowerFn = useServerFn(getFlower)
  const {
    result: checkoutResult,
    error: pollingError,
    isFinalizing,
  } = useCheckoutPolling(sessionId, t.createForm)
  const [flower, setFlower] = useState<Flower | null>(null)
  const [flowerError, setFlowerError] = useState<string | null>(null)
  const [isLoadingFlower, setIsLoadingFlower] = useState(false)

  useEffect(() => {
    if (!checkoutResult?.isReady) {
      return
    }

    let isCancelled = false
    setIsLoadingFlower(true)
    setFlowerError(null)

    getFlowerFn({ data: { id: checkoutResult.id } })
      .then((loadedFlower) => {
        if (isCancelled) {
          return
        }

        if (!loadedFlower) {
          setFlowerError(t.createForm.errors.verifyFailed)
          return
        }

        setFlower(loadedFlower)
        clearDraft()
      })
      .catch(() => {
        if (!isCancelled) {
          setFlowerError(t.createForm.errors.verifyFailed)
        }
      })
      .finally(() => {
        if (!isCancelled) {
          setIsLoadingFlower(false)
        }
      })

    return () => {
      isCancelled = true
    }
  }, [checkoutResult, clearDraft, getFlowerFn, t.createForm.errors.verifyFailed])

  return {
    checkoutResult,
    flower,
    error: pollingError ?? flowerError,
    isLoading: isFinalizing || isLoadingFlower,
  }
}

import { useServerFn } from '@tanstack/react-start'
import { useEffect, useState } from 'react'

import type { CheckoutResult } from '#/lib/flower-types'
import type { Dictionary } from '#/lib/i18n/dictionaries/en'
import getCheckoutResult from '#/server/GetCheckoutResult'

const pollAttempts = 5
const pollDelayMs = 1500

interface UseCheckoutPollingResult {
  result: CheckoutResult | null
  error: string | null
  isFinalizing: boolean
}

export function useCheckoutPolling(
  sessionId: string | undefined,
  t: Dictionary['createForm'],
): UseCheckoutPollingResult {
  const getCheckoutResultFn = useServerFn(getCheckoutResult)
  const [result, setResult] = useState<CheckoutResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isFinalizing, setIsFinalizing] = useState(Boolean(sessionId))

  useEffect(() => {
    if (!sessionId) {
      return
    }

    const activeSessionId = sessionId
    let isCancelled = false
    let attempt = 0

    async function pollCheckoutResult(): Promise<void> {
      while (attempt < pollAttempts && !isCancelled) {
        try {
          const checkoutResult = await getCheckoutResultFn({
            data: { sessionId: activeSessionId },
          })

          if (checkoutResult.isReady) {
            if (!isCancelled) {
              setResult(checkoutResult)
              setIsFinalizing(false)
            }
            return
          }
        } catch {
          if (!isCancelled) {
            setError(t.errors.verifyFailed)
            setIsFinalizing(false)
          }
          return
        }

        attempt += 1

        if (attempt < pollAttempts) {
          await new Promise((resolve) => {
            window.setTimeout(resolve, pollDelayMs)
          })
        }
      }

      if (!isCancelled) {
        setError(t.errors.stillPreparing)
        setIsFinalizing(false)
      }
    }

    pollCheckoutResult()

    return () => {
      isCancelled = true
    }
  }, [sessionId, getCheckoutResultFn, t])

  return { result, error, isFinalizing }
}

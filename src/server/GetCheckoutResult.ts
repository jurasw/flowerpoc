import { createServerFn } from '@tanstack/react-start'

import { createFlowerFromCheckoutMetadata } from '#/lib/create-flower-from-checkout'
import { getExpiresAt } from '#/lib/flower-lifecycle'
import type { CheckoutResult } from '#/lib/flower-types'
import { getFlowerByStripeSessionId } from '#/lib/flower-store'
import { getStripeClient } from '#/lib/stripe-client'

function buildCheckoutResult(flower: {
  id: string
  createdAt: string
}): CheckoutResult {
  const expiresAt = getExpiresAt(flower.createdAt)

  return {
    id: flower.id,
    createdAt: flower.createdAt,
    expiresAt: expiresAt.toISOString(),
    isReady: true,
  }
}

async function ensureFlowerFromSession(
  sessionId: string,
): Promise<CheckoutResult | null> {
  const existingFlower = getFlowerByStripeSessionId(sessionId)

  if (existingFlower) {
    return buildCheckoutResult(existingFlower)
  }

  const stripe = getStripeClient()
  const session = await stripe.checkout.sessions.retrieve(sessionId)

  if (session.payment_status !== 'paid') {
    return null
  }

  const flower = createFlowerFromCheckoutMetadata(session.id, session.metadata)

  if (!flower) {
    return null
  }

  return buildCheckoutResult(flower)
}

export default createServerFn({ method: 'GET' })
  .inputValidator((data: { sessionId: string }) => {
    const sessionId = data.sessionId.trim()

    if (!sessionId) {
      throw new Error('Session id is required.')
    }

    return { sessionId }
  })
  .handler(async ({ data }): Promise<CheckoutResult> => {
    const flower = await ensureFlowerFromSession(data.sessionId)

    if (flower) {
      return flower
    }

    return {
      id: '',
      createdAt: '',
      expiresAt: '',
      isReady: false,
    }
  })

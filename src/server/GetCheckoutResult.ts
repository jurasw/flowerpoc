import { createServerFn } from '@tanstack/react-start'

import { createFlowerFromCheckoutMetadata } from '#/lib/create-flower-from-checkout'
import type { CheckoutResult } from '#/lib/flower-types'
import { getFlowerByStripeSessionId } from '#/lib/flower-store'
import { getStripeClient } from '#/lib/stripe-client'

function buildCheckoutResult(flower: {
  id: string
  createdAt: string
  deliveryMethod: CheckoutResult['deliveryMethod']
  recipientEmail?: string
  recipientPhone?: string
}): CheckoutResult {
  return {
    id: flower.id,
    createdAt: flower.createdAt,
    isReady: true,
    deliveryMethod: flower.deliveryMethod,
    recipientEmail: flower.recipientEmail,
    recipientPhone: flower.recipientPhone,
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
      isReady: false,
    }
  })

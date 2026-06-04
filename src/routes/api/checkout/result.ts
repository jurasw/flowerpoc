import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'

import { createFlowerFromCheckoutMetadata } from '#/lib/create-flower-from-checkout'
import type { CheckoutResult } from '#/lib/flower-types'
import { getFlowerByStripeSessionId } from '#/lib/flower-store'
import { getStripeClient } from '#/lib/stripe-client'

function buildCheckoutResult(flower: {
  id: string
  createdAt: string
  deliveryMethod: CheckoutResult['deliveryMethod']
  senderEmail: string
  recipientEmail?: string
  recipientPhone?: string
}): CheckoutResult {
  return {
    id: flower.id,
    createdAt: flower.createdAt,
    isReady: true,
    deliveryMethod: flower.deliveryMethod,
    senderEmail: flower.senderEmail,
    recipientEmail: flower.recipientEmail,
    recipientPhone: flower.recipientPhone,
  }
}

async function ensureFlowerFromSession(
  sessionId: string,
): Promise<CheckoutResult | null> {
  const existingFlower = await getFlowerByStripeSessionId(sessionId)

  if (existingFlower) {
    return buildCheckoutResult(existingFlower)
  }

  const stripe = getStripeClient()
  const session = await stripe.checkout.sessions.retrieve(sessionId)

  if (session.payment_status !== 'paid') {
    return null
  }

  const flower = await createFlowerFromCheckoutMetadata(
    session.id,
    session.metadata,
  )

  if (!flower) {
    return null
  }

  return buildCheckoutResult(flower)
}

export const Route = createFileRoute('/api/checkout/result')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const sessionId = new URL(request.url).searchParams
          .get('sessionId')
          ?.trim()

        if (!sessionId) {
          return json({ error: 'Session id is required.' }, { status: 400 })
        }

        const flower = await ensureFlowerFromSession(sessionId)

        if (flower) {
          return json(flower)
        }

        return json({
          id: '',
          createdAt: '',
          isReady: false,
        } satisfies CheckoutResult)
      },
    },
  },
})

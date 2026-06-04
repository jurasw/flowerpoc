import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import type Stripe from 'stripe'

import { createFlowerFromCheckoutMetadata } from '#/lib/create-flower-from-checkout'
import { getStripeClient, getStripeWebhookSecret } from '#/lib/stripe-client'

export const Route = createFileRoute('/api/stripe/webhook')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const signature = request.headers.get('stripe-signature')

        if (!signature) {
          return json({ error: 'Missing stripe-signature header.' }, { status: 400 })
        }

        const rawBody = await request.text()
        const stripe = getStripeClient()
        let event: Stripe.Event

        try {
          event = stripe.webhooks.constructEvent(
            rawBody,
            signature,
            getStripeWebhookSecret(),
          )
        } catch {
          return json({ error: 'Invalid webhook signature.' }, { status: 400 })
        }

        if (event.type === 'checkout.session.completed') {
          const session = event.data.object

          if (session.object === 'checkout.session') {
            await createFlowerFromCheckoutMetadata(session.id, session.metadata)
          }
        }

        return json({ received: true })
      },
    },
  },
})

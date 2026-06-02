import { createServerFn } from '@tanstack/react-start'

import type { CreateFlowerInput } from '#/lib/flower-types'
import { productConfig } from '#/lib/product-config'
import { getAppUrl, getStripeClient } from '#/lib/stripe-client'
import { validateCreateFlowerInput } from '#/lib/validate-flower-input'

export interface CreateCheckoutSessionResult {
  url: string
}

export default createServerFn({ method: 'POST' })
  .inputValidator((data: CreateFlowerInput) => validateCreateFlowerInput(data))
  .handler(async ({ data }): Promise<CreateCheckoutSessionResult> => {
    const stripe = getStripeClient()
    const appUrl = getAppUrl()

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: productConfig.currency,
            unit_amount: productConfig.priceCents,
            product_data: {
              name: productConfig.productName,
              description: `A personalized digital rose with a private message. Fresh for ${productConfig.lifespanDays} days.`,
            },
          },
        },
      ],
      metadata: {
        senderName: data.senderName,
        recipientName: data.recipientName,
        quote: data.quote,
      },
      success_url: `${appUrl}/?session_id={CHECKOUT_SESSION_ID}#create`,
      cancel_url: `${appUrl}/?canceled=1#create`,
    })

    if (!session.url) {
      throw new Error('Could not start checkout. Please try again.')
    }

    return { url: session.url }
  })

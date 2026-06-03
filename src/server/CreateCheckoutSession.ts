import { createServerFn } from '@tanstack/react-start'

import type { CreateFlowerInput } from '#/lib/flower-types'
import { getDictionary } from '#/lib/i18n/dictionaries'
import { type Locale, resolveLocale } from '#/lib/i18n/locale'
import { productConfig } from '#/lib/product-config'
import { getAppUrl, getStripeClient } from '#/lib/stripe-client'
import { validateCreateFlowerInput } from '#/lib/validate-flower-input'

interface CreateCheckoutSessionInput extends CreateFlowerInput {
  locale?: string
}

export interface CreateCheckoutSessionResult {
  url: string
}

export default createServerFn({ method: 'POST' })
  .inputValidator(
    (
      data: CreateCheckoutSessionInput,
    ): CreateFlowerInput & { locale: Locale } => ({
      ...validateCreateFlowerInput(data),
      locale: resolveLocale(data.locale),
    }),
  )
  .handler(async ({ data }): Promise<CreateCheckoutSessionResult> => {
    const stripe = getStripeClient()
    const appUrl = getAppUrl()
    const t = getDictionary(data.locale)

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: productConfig.currency,
            unit_amount: productConfig.priceCents,
            product_data: {
              name: t.checkout.productName,
              description: t.checkout.productDescription(
                productConfig.lifespanDays,
              ),
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
      throw new Error(t.createForm.errors.checkoutFailed)
    }

    return { url: session.url }
  })

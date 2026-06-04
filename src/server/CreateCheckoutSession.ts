import { createServerFn } from '@tanstack/react-start'

import type { CreateFlowerInput } from '#/lib/flower-types'
import { getDictionary } from '#/lib/i18n/dictionaries'
import { type Locale, resolveLocale } from '#/lib/i18n/locale'
import {
  getAppUrl,
  getStripeClient,
  getStripePriceId,
} from '#/lib/stripe-client'
import { validateCreateFlowerInput } from '#/lib/validate-flower-input'
import { getVoiceMessageById } from '#/lib/voice-message-store'

interface CreateCheckoutSessionInput extends CreateFlowerInput {
  locale?: string
  voiceMessageId?: string
}

export interface CreateCheckoutSessionResult {
  url: string
}

export default createServerFn({ method: 'POST' })
  .inputValidator(
    (
      data: CreateCheckoutSessionInput,
    ): CreateFlowerInput & { locale: Locale; voiceMessageId?: string } => {
      const validated = validateCreateFlowerInput(data)
      const voiceMessageId = data.voiceMessageId?.trim()

      if (voiceMessageId) {
        const pendingVoiceMessage = getVoiceMessageById(voiceMessageId)

        if (!pendingVoiceMessage || pendingVoiceMessage.flowerId) {
          throw new Error('Voice message is invalid or already used.')
        }
      }

      return {
        ...validated,
        locale: resolveLocale(data.locale),
        voiceMessageId: voiceMessageId || undefined,
      }
    },
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
          price: getStripePriceId(),
        },
      ],
      metadata: {
        senderName: data.senderName,
        recipientName: data.recipientName,
        quote: data.quote,
        senderEmail: data.senderEmail,
        deliveryMethod: data.deliveryMethod,
        ...(data.recipientEmail
          ? { recipientEmail: data.recipientEmail }
          : {}),
        ...(data.recipientPhone
          ? { recipientPhone: data.recipientPhone }
          : {}),
        ...(data.voiceMessageId ? { voiceMessageId: data.voiceMessageId } : {}),
      },
      success_url: `${appUrl}/?session_id={CHECKOUT_SESSION_ID}#create`,
      cancel_url: `${appUrl}/?canceled=1#create`,
    })

    if (!session.url) {
      throw new Error(t.createForm.errors.checkoutFailed)
    }

    return { url: session.url }
  })

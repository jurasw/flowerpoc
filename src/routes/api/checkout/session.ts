import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'

import type { CreateFlowerInput } from '#/lib/flower-types'
import { getDictionary } from '#/lib/i18n/dictionaries'
import { resolveLocale } from '#/lib/i18n/locale'
import {
  getAppUrl,
  getStripeClient,
  getStripePriceId,
} from '#/lib/stripe-client'
import { validateCreateFlowerInput } from '#/lib/validate-flower-input'
import { getVoiceMessageById } from '#/lib/voice-message-store'

interface CreateCheckoutSessionBody extends CreateFlowerInput {
  locale?: string
  voiceMessageId?: string
}

export const Route = createFileRoute('/api/checkout/session')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as CreateCheckoutSessionBody
        const validated = validateCreateFlowerInput(body)
        const voiceMessageId = body.voiceMessageId?.trim()

        if (voiceMessageId) {
          const pendingVoiceMessage = getVoiceMessageById(voiceMessageId)

          if (!pendingVoiceMessage || pendingVoiceMessage.flowerId) {
            return json(
              { error: 'Voice message is invalid or already used.' },
              { status: 400 },
            )
          }
        }

        const locale = resolveLocale(body.locale)
        const stripe = getStripeClient()
        const appUrl = getAppUrl()
        const t = getDictionary(locale)

        const session = await stripe.checkout.sessions.create({
          mode: 'payment',
          line_items: [
            {
              quantity: 1,
              price: getStripePriceId(),
            },
          ],
          metadata: {
            senderName: validated.senderName,
            recipientName: validated.recipientName,
            quote: validated.quote,
            senderEmail: validated.senderEmail,
            deliveryMethod: validated.deliveryMethod,
            locale,
            ...(validated.recipientEmail
              ? { recipientEmail: validated.recipientEmail }
              : {}),
            ...(validated.recipientPhone
              ? { recipientPhone: validated.recipientPhone }
              : {}),
            ...(voiceMessageId ? { voiceMessageId } : {}),
          },
          success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${appUrl}/?canceled=1#create`,
        })

        if (!session.url) {
          return json(
            { error: t.createForm.errors.checkoutFailed },
            { status: 500 },
          )
        }

        return json({ url: session.url })
      },
    },
  },
})

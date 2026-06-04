import type { CreateFlowerInput } from '#/lib/flower-types'
import { validateShareDelivery } from '#/lib/validate-share-delivery'

export function validateCreateFlowerInput(
  data: CreateFlowerInput,
): CreateFlowerInput {
  const senderName = data.senderName.trim()
  const recipientName = data.recipientName.trim()
  const quote = data.quote.trim()

  if (!senderName || !recipientName || !quote) {
    throw new Error('Sender name, recipient name, and quote are required.')
  }

  const shareDelivery = validateShareDelivery({
    senderEmail: data.senderEmail,
    deliveryMethod: data.deliveryMethod,
    recipientEmail: data.recipientEmail,
    recipientPhone: data.recipientPhone,
  })

  return {
    senderName,
    recipientName,
    quote,
    ...shareDelivery,
  }
}

import type { ShareDeliveryMethod } from '#/lib/share-delivery-types'
import { isShareDeliveryMethod } from '#/lib/share-delivery-types'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phonePattern = /^\+?[\d\s\-()]{7,20}$/

export interface ShareDeliveryFields {
  senderEmail: string
  deliveryMethod: ShareDeliveryMethod
  recipientEmail?: string
  recipientPhone?: string
}

export function validateShareDelivery(
  data: ShareDeliveryFields,
): ShareDeliveryFields {
  const senderEmail = data.senderEmail.trim().toLowerCase()
  const deliveryMethod = data.deliveryMethod

  if (!senderEmail || !emailPattern.test(senderEmail)) {
    throw new Error('A valid sender email is required.')
  }

  if (!isShareDeliveryMethod(deliveryMethod)) {
    throw new Error('A delivery method is required.')
  }

  if (deliveryMethod === 'email') {
    const recipientEmail = data.recipientEmail?.trim().toLowerCase() ?? ''

    if (!recipientEmail || !emailPattern.test(recipientEmail)) {
      throw new Error('A valid recipient email is required.')
    }

    return { senderEmail, deliveryMethod, recipientEmail }
  }

  if (deliveryMethod === 'phone') {
    const recipientPhone = data.recipientPhone?.trim() ?? ''

    if (!recipientPhone || !phonePattern.test(recipientPhone)) {
      throw new Error('A valid recipient phone number is required.')
    }

    return { senderEmail, deliveryMethod, recipientPhone }
  }

  return { senderEmail, deliveryMethod }
}

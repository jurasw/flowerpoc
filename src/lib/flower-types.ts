import type { ShareDeliveryMethod } from '#/lib/share-delivery-types'

export interface Flower {
  id: string
  senderName: string
  recipientName: string
  quote: string
  senderEmail: string
  deliveryMethod: ShareDeliveryMethod
  recipientEmail?: string
  recipientPhone?: string
  createdAt: string
  stripeSessionId?: string
  voiceMessageId?: string
}

export interface CreateFlowerInput {
  senderName: string
  recipientName: string
  quote: string
  senderEmail: string
  deliveryMethod: ShareDeliveryMethod
  recipientEmail?: string
  recipientPhone?: string
}

export interface CreateFlowerResult {
  id: string
  createdAt: string
}

export interface CheckoutResult {
  id: string
  createdAt: string
  isReady: boolean
  deliveryMethod?: ShareDeliveryMethod
  senderEmail?: string
  recipientEmail?: string
  recipientPhone?: string
}

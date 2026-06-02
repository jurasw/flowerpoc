export interface Flower {
  id: string
  senderName: string
  recipientName: string
  quote: string
  createdAt: string
  stripeSessionId?: string
}

export interface CreateFlowerInput {
  senderName: string
  recipientName: string
  quote: string
}

export interface CreateFlowerResult {
  id: string
  createdAt: string
  expiresAt: string
}

export interface CheckoutResult {
  id: string
  createdAt: string
  expiresAt: string
  isReady: boolean
}

export interface FlowerLifecycle {
  isExpired: boolean
  daysRemaining: number
  expiresAt: Date
}

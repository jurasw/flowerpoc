import Stripe from 'stripe'

function getStripeSecretKey(): string {
  const secretKey = process.env.STRIPE_SECRET_KEY

  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY is not configured.')
  }

  return secretKey
}

export function getStripeClient(): Stripe {
  return new Stripe(getStripeSecretKey())
}

export function getAppUrl(): string {
  const appUrl = process.env.APP_URL

  if (!appUrl) {
    throw new Error('APP_URL is not configured.')
  }

  return appUrl.replace(/\/$/, '')
}

export function getStripePriceId(): string {
  const priceId = process.env.STRIPE_PRICE_ID

  if (!priceId) {
    throw new Error('STRIPE_PRICE_ID is not configured.')
  }

  return priceId
}

export function getStripeWebhookSecret(): string {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!webhookSecret) {
    throw new Error('STRIPE_WEBHOOK_SECRET is not configured.')
  }

  return webhookSecret
}

import { Resend } from 'resend'

import { productConfig } from '#/lib/product-config'

const resendFromEmail = 'noreplay@signosh.com'

export function isResendConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY)
}

function getResendApiKey(): string {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured.')
  }

  return apiKey
}

export function getResendFromAddress(): string {
  return `${productConfig.brandName} <${resendFromEmail}>`
}

export function getResendClient(): Resend {
  return new Resend(getResendApiKey())
}

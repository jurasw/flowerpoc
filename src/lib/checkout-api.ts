import type { CheckoutResult, CreateFlowerInput } from '#/lib/flower-types'
import type { Locale } from '#/lib/i18n/locale'
import type { VoiceMessageUploadInput } from '#/lib/validate-voice-message-input'

interface CreateCheckoutSessionInput extends CreateFlowerInput {
  locale: Locale
  voiceMessageId?: string
}

interface ApiErrorBody {
  error?: string
}

async function readApiError(response: Response): Promise<string> {
  try {
    const body = (await response.json()) as ApiErrorBody
    if (body.error) {
      return body.error
    }
  } catch {
    // ignore JSON parse errors
  }

  return `Request failed (${response.status}).`
}

export async function createCheckoutSession(
  input: CreateCheckoutSessionInput,
): Promise<{ url: string }> {
  const response = await fetch('/api/checkout/session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })

  if (!response.ok) {
    throw new Error(await readApiError(response))
  }

  return (await response.json()) as { url: string }
}

export async function getCheckoutResult(
  sessionId: string,
): Promise<CheckoutResult> {
  const response = await fetch(
    `/api/checkout/result?sessionId=${encodeURIComponent(sessionId)}`,
  )

  if (!response.ok) {
    throw new Error(await readApiError(response))
  }

  return (await response.json()) as CheckoutResult
}

export async function savePendingVoiceMessage(
  input: VoiceMessageUploadInput,
): Promise<{ voiceMessageId: string }> {
  const response = await fetch('/api/voice-messages/pending', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })

  if (!response.ok) {
    throw new Error(await readApiError(response))
  }

  return (await response.json()) as { voiceMessageId: string }
}

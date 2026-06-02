import type { CreateFlowerInput } from '#/lib/flower-types'
import {
  createFlowerRecord,
  getFlowerByStripeSessionId,
} from '#/lib/flower-store'
import { validateCreateFlowerInput } from '#/lib/validate-flower-input'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function readMetadataString(
  metadata: Record<string, unknown>,
  key: string,
): string | undefined {
  const value = metadata[key]
  return typeof value === 'string' ? value : undefined
}

export function createFlowerFromCheckoutMetadata(
  sessionId: string,
  metadata: Record<string, unknown> | null,
): ReturnType<typeof createFlowerRecord> | null {
  const existingFlower = getFlowerByStripeSessionId(sessionId)

  if (existingFlower) {
    return existingFlower
  }

  if (!isRecord(metadata)) {
    return null
  }

  const senderName = readMetadataString(metadata, 'senderName')
  const recipientName = readMetadataString(metadata, 'recipientName')
  const quote = readMetadataString(metadata, 'quote')

  if (!senderName || !recipientName || !quote) {
    return null
  }

  const input: CreateFlowerInput = validateCreateFlowerInput({
    senderName,
    recipientName,
    quote,
  })

  return createFlowerRecord(input, sessionId)
}

import type { CreateFlowerInput } from '#/lib/flower-types'
import {
  createFlowerRecord,
  getFlowerByStripeSessionId,
} from '#/lib/flower-store'
import { linkFlowerVoiceMessage } from '#/lib/link-flower-voice-message'
import { isShareDeliveryMethod } from '#/lib/share-delivery-types'
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
  const senderEmail = readMetadataString(metadata, 'senderEmail')
  const deliveryMethodRaw = readMetadataString(metadata, 'deliveryMethod')
  const recipientEmail = readMetadataString(metadata, 'recipientEmail')
  const recipientPhone = readMetadataString(metadata, 'recipientPhone')
  const voiceMessageId = readMetadataString(metadata, 'voiceMessageId')

  if (
    !senderName ||
    !recipientName ||
    !quote ||
    !senderEmail ||
    !deliveryMethodRaw ||
    !isShareDeliveryMethod(deliveryMethodRaw)
  ) {
    return null
  }

  const input: CreateFlowerInput = validateCreateFlowerInput({
    senderName,
    recipientName,
    quote,
    senderEmail,
    deliveryMethod: deliveryMethodRaw,
    recipientEmail,
    recipientPhone,
  })

  const flower = createFlowerRecord(input, sessionId, voiceMessageId)

  if (voiceMessageId) {
    linkFlowerVoiceMessage(flower.id, voiceMessageId)
  }

  return flower
}

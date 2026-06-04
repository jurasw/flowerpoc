import type { Tables, TablesInsert } from '#/lib/database.types'
import type { CreateFlowerInput, Flower } from '#/lib/flower-types'
import { isShareDeliveryMethod } from '#/lib/share-delivery-types'

type CardRow = Tables<'cards'>

export function cardRowToFlower(row: CardRow): Flower {
  if (!isShareDeliveryMethod(row.delivery_method)) {
    throw new Error(`Invalid delivery method on card ${row.id}.`)
  }

  return {
    id: row.id,
    senderName: row.sender_name,
    recipientName: row.recipient_name,
    quote: row.message ?? '',
    senderEmail: row.sender_email,
    deliveryMethod: row.delivery_method,
    recipientEmail: row.recipient_email ?? undefined,
    recipientPhone: row.recipient_phone ?? undefined,
    createdAt: row.created_at,
    stripeSessionId: row.stripe_session_id ?? undefined,
    voiceMessageId: row.voice_message_id ?? undefined,
  }
}

interface FlowerToCardInsertParams {
  id: string
  createdAt: string
  input: CreateFlowerInput
  stripeSessionId?: string
  voiceMessageId?: string
}

export function flowerToCardInsert({
  id,
  createdAt,
  input,
  stripeSessionId,
  voiceMessageId,
}: FlowerToCardInsertParams): TablesInsert<'cards'> {
  return {
    id,
    created_at: createdAt,
    sender_name: input.senderName.trim(),
    recipient_name: input.recipientName.trim(),
    message: input.quote.trim(),
    sender_email: input.senderEmail,
    delivery_method: input.deliveryMethod,
    recipient_email: input.recipientEmail ?? null,
    recipient_phone: input.recipientPhone ?? null,
    stripe_session_id: stripeSessionId ?? null,
    voice_message_id: voiceMessageId ?? null,
  }
}

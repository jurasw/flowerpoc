import type { CreateFlowerInput } from '#/lib/flower-types'

export function validateCreateFlowerInput(
  data: CreateFlowerInput,
): CreateFlowerInput {
  const senderName = data.senderName.trim()
  const recipientName = data.recipientName.trim()
  const quote = data.quote.trim()

  if (!senderName || !recipientName || !quote) {
    throw new Error('Sender name, recipient name, and quote are required.')
  }

  return { senderName, recipientName, quote }
}

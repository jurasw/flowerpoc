import type { CreateFlowerInput, Flower } from '#/lib/flower-types'

const flowers = new Map<string, Flower>()

const SEED_FLOWERS: Flower[] = [
  {
    id: 'poc',
    senderName: 'Janusz',
    recipientName: 'Barbary',
    quote: 'kocham cię bardzo, z tobą Basiu i na łóżku i na sianie, wszystko jedno',
    senderEmail: 'janusz@example.com',
    deliveryMethod: 'link',
    createdAt: '2026-05-30T16:10:36.850Z',
  },
]

for (const flower of SEED_FLOWERS) {
  flowers.set(flower.id, flower)
}

export function createFlowerRecord(
  input: CreateFlowerInput,
  stripeSessionId?: string,
  voiceMessageId?: string,
): Flower {
  const flower: Flower = {
    id: crypto.randomUUID(),
    senderName: input.senderName.trim(),
    recipientName: input.recipientName.trim(),
    quote: input.quote.trim(),
    senderEmail: input.senderEmail,
    deliveryMethod: input.deliveryMethod,
    recipientEmail: input.recipientEmail,
    recipientPhone: input.recipientPhone,
    createdAt: new Date().toISOString(),
    stripeSessionId,
    voiceMessageId,
  }

  flowers.set(flower.id, flower)
  return flower
}

export function getFlowerById(id: string): Flower | undefined {
  return flowers.get(id)
}

export function getFlowerByStripeSessionId(
  stripeSessionId: string,
): Flower | undefined {
  for (const flower of flowers.values()) {
    if (flower.stripeSessionId === stripeSessionId) {
      return flower
    }
  }

  return undefined
}

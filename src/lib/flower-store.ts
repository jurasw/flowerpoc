import type { CreateFlowerInput, Flower } from '#/lib/flower-types'

const flowers = new Map<string, Flower>()

const SEED_FLOWERS: Flower[] = [
  {
    id: '4f058d7e-26b1-4a78-8da2-c69cc357605d',
    senderName: 'Dominik',
    recipientName: 'Roksana',
    quote: 'dla mojej roksanki',
    createdAt: '2026-05-30T16:10:36.850Z',
  },
]

for (const flower of SEED_FLOWERS) {
  flowers.set(flower.id, flower)
}

export function createFlowerRecord(input: CreateFlowerInput): Flower {
  const flower: Flower = {
    id: crypto.randomUUID(),
    senderName: input.senderName.trim(),
    recipientName: input.recipientName.trim(),
    quote: input.quote.trim(),
    createdAt: new Date().toISOString(),
  }

  flowers.set(flower.id, flower)
  return flower
}

export function getFlowerById(id: string): Flower | undefined {
  return flowers.get(id)
}

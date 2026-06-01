import type { CreateFlowerInput, Flower } from '#/lib/flower-types'

const flowers = new Map<string, Flower>()

const SEED_FLOWERS: Flower[] = [
  {
    id: 'poc',
    senderName: 'Janusz',
    recipientName: 'Barbary',
    quote: 'kocham cię bardzo, z tobą Basiu i na łóżku i na sianie, wszystko jedno',
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

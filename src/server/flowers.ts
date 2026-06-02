import { createServerFn } from '@tanstack/react-start'

import { getExpiresAt } from '#/lib/flower-lifecycle'
import type { CreateFlowerInput, CreateFlowerResult, Flower } from '#/lib/flower-types'
import { createFlowerRecord, getFlowerById } from '#/lib/flower-store'
import { validateCreateFlowerInput } from '#/lib/validate-flower-input'

export const createFlower = createServerFn({ method: 'POST' })
  .inputValidator((data: CreateFlowerInput) => validateCreateFlowerInput(data))
  .handler(async ({ data }): Promise<CreateFlowerResult> => {
    const flower = createFlowerRecord(data)
    const expiresAt = getExpiresAt(flower.createdAt)

    return {
      id: flower.id,
      createdAt: flower.createdAt,
      expiresAt: expiresAt.toISOString(),
    }
  })

export const getFlower = createServerFn({ method: 'GET' })
  .inputValidator((data: { id: string }) => {
    if (!data.id.trim()) {
      throw new Error('Flower id is required.')
    }

    return { id: data.id.trim() }
  })
  .handler(async ({ data }): Promise<Flower | null> => {
    return getFlowerById(data.id) ?? null
  })

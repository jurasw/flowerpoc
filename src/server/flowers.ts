import { createServerFn } from '@tanstack/react-start'

import type { CreateFlowerInput, CreateFlowerResult, Flower } from '#/lib/flower-types'
import { createFlowerRecord, getFlowerById } from '#/lib/flower-store'
import { validateCreateFlowerInput } from '#/lib/validate-flower-input'

export const createFlower = createServerFn({ method: 'POST' })
  .inputValidator((data: CreateFlowerInput) => validateCreateFlowerInput(data))
  .handler(async ({ data }): Promise<CreateFlowerResult> => {
    const flower = await createFlowerRecord(data)

    return {
      id: flower.id,
      createdAt: flower.createdAt,
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
    return (await getFlowerById(data.id)) ?? null
  })

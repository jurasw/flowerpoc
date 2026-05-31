import type { FlowerLifecycle } from '#/lib/flower-types'

export const FLOWER_LIFESPAN_DAYS = 5
export const FLOWER_LIFESPAN_MS = FLOWER_LIFESPAN_DAYS * 24 * 60 * 60 * 1000

export function getExpiresAt(createdAt: string): Date {
  return new Date(new Date(createdAt).getTime() + FLOWER_LIFESPAN_MS)
}

export function getFlowerLifecycle(createdAt: string): FlowerLifecycle {
  const expiresAt = getExpiresAt(createdAt)
  const now = new Date()
  const isExpired = now >= expiresAt
  const msRemaining = expiresAt.getTime() - now.getTime()
  const daysRemaining = isExpired
    ? 0
    : Math.ceil(msRemaining / (24 * 60 * 60 * 1000))

  return { isExpired, daysRemaining, expiresAt }
}

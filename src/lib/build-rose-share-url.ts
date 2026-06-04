import { getAppUrl } from '#/lib/stripe-client'

export function buildRoseShareUrl(flowerId: string): string {
  return `${getAppUrl()}/flower/${flowerId}`
}

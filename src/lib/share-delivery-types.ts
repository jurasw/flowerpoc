export type ShareDeliveryMethod = 'email' | 'phone' | 'link'

export const selectableShareDeliveryMethods: readonly ShareDeliveryMethod[] = [
  'email',
  'link',
]

export function isShareDeliveryMethod(
  value: string,
): value is ShareDeliveryMethod {
  return value === 'email' || value === 'phone' || value === 'link'
}

export function normalizeSelectableShareDeliveryMethod(
  value: ShareDeliveryMethod,
): ShareDeliveryMethod {
  if (value === 'phone') {
    return 'link'
  }

  return value
}

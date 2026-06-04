export type ShareDeliveryMethod = 'email' | 'phone' | 'link'

export function isShareDeliveryMethod(
  value: string,
): value is ShareDeliveryMethod {
  return value === 'email' || value === 'phone' || value === 'link'
}

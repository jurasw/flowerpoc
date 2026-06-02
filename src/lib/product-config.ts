export const productConfig = {
  brandName: 'Maison de Rose',
  productName: 'Digital Rose',
  priceCents: 200,
  currency: 'usd',
  lifespanDays: 5,
} as const

export function formatProductPrice(): string {
  const dollars = productConfig.priceCents / 100
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: productConfig.currency.toUpperCase(),
  }).format(dollars)
}

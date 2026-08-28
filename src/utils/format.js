export function formatPrice(value) {
  const num = Number(value)
  if (Number.isNaN(num)) return '$0.00'
  return num.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

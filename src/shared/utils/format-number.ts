// Formatear el número como pesos colombianos
export const formatNumberCOP = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
})

export function formatAsPercentage(number: number) {
  const percentage = number * 100

  const formatter = new Intl.NumberFormat('es-CO', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return formatter.format(percentage / 100)
}

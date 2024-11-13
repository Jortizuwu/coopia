// Formatear el número como pesos colombianos
export const formatNumberCOP = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
})

export function formatAsPercentage(number: number) {
  return number ?  `${(number).toFixed(2)}%` : "0.00%"
}

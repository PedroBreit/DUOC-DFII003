
const currencyFormatter = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0
});

/**
 * Formatea un valor numérico como moneda chilena.
 *
 * Ejemplo:
 * formatCurrency(1590) -> "$1.590"
 */
export function formatCurrency(amount) {
  return currencyFormatter.format(amount);
}

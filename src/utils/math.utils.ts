export function formatDecimalsDigits(num: number, decimals = 2): number {
  return Number(num.toFixed(decimals));
}

/**
 * Calculates the `valueToCalc` percentage from `total`
 * @param {number} total value of the 100%
 * @param {number} valueToCalc unknown percentage value
 *
 */
export function getPercentage(total: number, valueToCalc: number): number {
  return formatDecimalsDigits((valueToCalc / total) * 100);
}

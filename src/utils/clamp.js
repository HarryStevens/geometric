/**
 * Clamps a number to the inclusive range [0, 1].
 *
 * @param {number} value
 * @returns {number}
 */
export function clamp01(value) {
  if (value < 0) {
    return 0;
  }
  if (value > 1) {
    return 1;
  }
  return value;
}

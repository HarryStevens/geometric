/**
 * @typedef {import("../types.js").Point} Point
 * @typedef {import("../types.js").Line} Line
 */

/**
 * Returns an interpolator function given a <i>line</i> [a, b]. The returned interpolator function takes a single argument <i>t</i>, where t is a number in [0, 1]; a value of 0 returns a, while a value of 1 returns b. Intermediate values interpolate from a to b along the line segment.
 *
 * By default, the returned interpolator will <i>clamp</i> the output to the ends of the line segment. You can pass an optional boolean indicating whether to return points outside the line segment if t is greater than 1 or less than 0.
 *
 * @param {Line} line
 * @param {boolean} [clamp=true]
 * @returns {(t: number) => Point}
 */
export function lineInterpolate(line, clamp = true) {
  const [[x1, y1], [x2, y2]] = line;
  /** @param {number} value */
  const x = (value) => (x2 - x1) * value + x1;
  /** @param {number} value */
  const y = (value) => (y2 - y1) * value + y1;
  return (t) => {
    const t0 = clamp ? (t < 0 ? 0 : t > 1 ? 1 : t) : t;
    return [x(t0), y(t0)];
  };
}

/**
 * @typedef {import("../types.js").Point} Point
 * @typedef {import("../types.js").Line} Line
 */

// Calculates the midpoint of a line segment.
/**
 * @param {Line} line
 * @returns {Point}
 */
export function lineMidpoint(line) {
  return [(line[0][0] + line[1][0]) / 2, (line[0][1] + line[1][1]) / 2];
}

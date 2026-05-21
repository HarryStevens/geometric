/**
 * @typedef {import("../types.js").Point} Point
 * @typedef {import("../types.js").Line} Line
 */

// Returns the midpoint of a <i>line</i>.
/**
 * @param {Line} line
 * @returns {Point}
 */
export function lineMidpoint(line) {
  return [(line[0][0] + line[1][0]) / 2, (line[0][1] + line[1][1]) / 2];
}

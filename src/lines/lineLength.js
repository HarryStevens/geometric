/**
 * @typedef {import("../types.js").Line} Line
 */

// Calculates the distance between the endpoints of a line segment.
/**
 * @param {Line} line
 * @returns {number}
 */
export function lineLength(line) {
  return Math.sqrt(
    Math.pow(line[1][0] - line[0][0], 2) + Math.pow(line[1][1] - line[0][1], 2),
  );
}

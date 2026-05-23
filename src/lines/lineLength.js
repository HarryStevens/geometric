/**
 * @typedef {import("../types.js").Line} Line
 */

// Returns the length of a <i>line</i>.
/**
 * @param {Line} line
 * @returns {number}
 */
export function lineLength(line) {
  return Math.sqrt(
    Math.pow(line[1][0] - line[0][0], 2) + Math.pow(line[1][1] - line[0][1], 2),
  );
}

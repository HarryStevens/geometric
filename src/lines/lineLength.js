import { distanceSquared } from "../utils/vector.js";

/**
 * @typedef {import("../types.js").Line} Line
 */

// Returns the length of a <i>line</i>.
/**
 * @param {Line} line
 * @returns {number}
 */
export function lineLength(line) {
  return Math.sqrt(distanceSquared(line[0], line[1]));
}

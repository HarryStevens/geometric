import { pointTranslate } from "../points/pointTranslate.js";

/**
 * @typedef {import("../types.js").Line} Line
 */

// Returns the coordinates resulting from translating a line by an angle in degrees and a distance.
/**
 * @param {Line} line
 * @param {number} angle
 * @param {number} distance
 * @returns {Line}
 */
export function lineTranslate(line, angle, distance) {
  return line.map((point) => pointTranslate(point, angle, distance));
}

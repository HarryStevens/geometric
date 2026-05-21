import { pointTranslate } from "../points/pointTranslate.js";

/**
 * @typedef {import("../types.js").Line} Line
 */

// Returns the coordinates resulting from translating a <i>line</i> by an <i>angle</i> in degrees and a <i>distance</i>. If <i>angle</i> is not specified, defaults to 0. If <i>distance</i> is not specified, defaults to 0.
/**
 * @param {Line} line
 * @param {number} angle
 * @param {number} distance
 * @returns {Line}
 */
export function lineTranslate(line, angle, distance) {
  return line.map((point) => pointTranslate(point, angle, distance));
}

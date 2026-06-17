import { angleToRadians } from "../angles/angleToRadians.js";

/**
 * @typedef {import("../types.js").Point} Point
 */

/**
 * Returns the coordinates resulting from translating a <i>point</i> by an <i>angle</i> in degrees and a <i>distance</i>. If <i>angle</i> is not specified, defaults to 0. If <i>distance</i> is not specified, defaults to 0.
 *
 * @param {Point} point
 * @param {number} [angle=0]
 * @param {number} [distance=0]
 * @returns {Point}
 */
export function pointTranslate(point, angle = 0, distance = 0) {
  const r = angleToRadians(angle);
  return [point[0] + distance * Math.cos(r), point[1] + distance * Math.sin(r)];
}

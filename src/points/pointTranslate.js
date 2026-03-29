import { angleToRadians } from "../angles/angleToRadians.js";

/**
 * @typedef {import("../types.js").Point} Point
 */

// Translates a point by an angle in degrees and distance
/**
 * @param {Point} point
 * @param {number} [angle=0]
 * @param {number} [distance=0]
 * @returns {Point}
 */
export function pointTranslate(point, angle = 0, distance = 0) {
  const r = angleToRadians(angle);
  return [point[0] + distance * Math.cos(r), point[1] + distance * Math.sin(r)];
}

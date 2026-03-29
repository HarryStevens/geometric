import { pointRotate } from "../points/pointRotate.js";

/**
 * @typedef {import("../types.js").Point} Point
 * @typedef {import("../types.js").Polygon} Polygon
 */

// Rotates a polygon by an angle in degrees around an origin.
/**
 * @param {Polygon} polygon
 * @param {number} angle
 * @param {Point} [origin]
 * @returns {Polygon}
 */
export function polygonRotate(polygon, angle, origin) {
  let p = [];

  for (let i = 0, l = polygon.length; i < l; i++) {
    p[i] = pointRotate(polygon[i], angle, origin);
  }

  return p;
}

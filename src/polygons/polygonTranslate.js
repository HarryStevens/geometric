import { pointTranslate } from "../points/pointTranslate.js";

/**
 * @typedef {import("../types.js").Polygon} Polygon
 */

// Translates a polygon by an angle in degrees and distance.
/**
 * @param {Polygon} polygon
 * @param {number} angle
 * @param {number} distance
 * @returns {Polygon}
 */
export function polygonTranslate(polygon, angle, distance) {
  let p = [];

  for (let i = 0, l = polygon.length; i < l; i++) {
    p[i] = pointTranslate(polygon[i], angle, distance);
  }

  return p;
}

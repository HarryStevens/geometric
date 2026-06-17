import { pointTranslate } from "../points/pointTranslate.js";

/**
 * @typedef {import("../types.js").Polygon} Polygon
 */

/**
 * Returns the vertices resulting from translating a <i>polygon</i> by an <i>angle</i> in degrees and a <i>distance</i>.
 *
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

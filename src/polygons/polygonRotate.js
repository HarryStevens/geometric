import { pointRotate } from "../points/pointRotate.js";

/**
 * @typedef {import("../types.js").Point} Point
 * @typedef {import("../types.js").Polygon} Polygon
 */

/**
 * Returns the vertices resulting from rotating a <i>polygon</i> about an origin by an <i>angle</i> in degrees. If <i>origin</i> is not specified, the origin defaults to [0, 0].
 *
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

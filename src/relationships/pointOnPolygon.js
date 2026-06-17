import { pointOnLine } from "./pointOnLine.js";
import { polygonClose } from "../polygons/polygonClose.js";

/**
 * @typedef {import("../types.js").Point} Point
 * @typedef {import("../types.js").Polygon} Polygon
 */

/**
 * Returns a boolean representing whether a <i>point</i> is located on one of the edges of a <i>polygon</i>. An optional <i>epsilon</i> number, such as 1e-6, can be passed to reduce the precision with which the relationship is measured.
 *
 * @param {Point} point
 * @param {Polygon} polygon
 * @param {number} [epsilon=0]
 * @returns {boolean}
 */
export function pointOnPolygon(point, polygon, epsilon = 0) {
  let on = false;
  const closed = polygonClose(polygon);

  for (let i = 0, l = closed.length - 1; i < l; i++) {
    if (pointOnLine(point, [closed[i], closed[i + 1]], epsilon)) {
      on = true;
      break;
    }
  }

  return on;
}

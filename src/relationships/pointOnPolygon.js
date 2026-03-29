import { pointOnLine } from "./pointOnLine.js";
import { polygonClose } from "../polygons/polygonClose.js";

/**
 * @typedef {import("../types.js").Point} Point
 * @typedef {import("../types.js").Polygon} Polygon
 */

// Determines whether a point is located on one of the edges of a polygon.
// Returns a boolean.
/**
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

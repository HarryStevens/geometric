import { lineIntersection } from "./lineIntersection.js";
import { polygonClose } from "../polygons/polygonClose.js";
import { pointsEqual } from "./pointsEqual.js";

/**
 * @typedef {import("../types.js").Point} Point
 * @typedef {import("../types.js").Line} Line
 * @typedef {import("../types.js").Polygon} Polygon
 */

/**
 * Returns an array of points where a <i>line</i> intersects a </i>polygon</i>. If the line does not intersect the polygon, returns null.
 *
 * @param {Line} line
 * @param {Polygon} polygon
 * @returns {Point[] | null}
 */
export function lineIntersectsPolygon(line, polygon) {
  if (polygon.length < 2) {
    return null;
  }

  /** @type {Point[]} */
  const intersections = [];
  const closed = polygonClose(polygon);

  /**
   * @param {Point[]} arr
   * @param {Point} point
   * @returns {boolean}
   */
  const pointExists = (arr, point) => {
    return arr.some((p) => pointsEqual(p, point));
  };

  for (let i = 0, l = closed.length - 1; i < l; i++) {
    const v0 = closed[i],
      v1 = closed[i + 1];

    const intersection = lineIntersection(line, [v0, v1]);
    if (intersection && !pointExists(intersections, intersection)) {
      intersections.push(intersection);
    }
  }

  return intersections.length ? intersections : null;
}

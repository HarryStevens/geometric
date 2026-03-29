import { lineInterpolate } from "../lines/lineInterpolate.js";
import { polygonClose } from "../polygons/polygonClose.js";
import { segmentProject } from "../utils/segment.js";

/**
 * @typedef {import("../types.js").Point} Point
 * @typedef {import("../types.js").Line} Line
 * @typedef {import("../types.js").Polygon} Polygon
 */

// Returns the closest position on a polygon's perimeter to a point
/**
 * @param {Polygon} polygon
 * @param {Point} point
 * @returns {Point | []}
 */
export function pointToPolygon(polygon, point) {
  if (polygon.length === 1) return polygon[0];

  /** @type {Point | []} */
  let closestD = Infinity,
    closest = [];
  const closed = polygonClose(polygon);

  for (let i = 0, l = closed.length - 1; i < l; i++) {
    /** @type {Line} */
    const line = [closed[i], closed[i + 1]];
    const { t, dist2 } = segmentProject(point, line);
    if (dist2 < closestD) {
      closestD = dist2;
      closest = lineInterpolate(line)(1 - t);
    }
  }

  return closest;
}

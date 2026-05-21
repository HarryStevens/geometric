/**
 * @typedef {import("../types.js").Polygon} Polygon
 */

// Returns a new <i>polygon</i> that is closed by appending the first point of the polygon to the end if it is not already closed. The input <i>polygon</i> is not modified.
/**
 * @param {Polygon} polygon
 * @returns {Polygon}
 */
export function polygonClose(polygon) {
  if (!polygon.length) {
    return polygon;
  }
  return polygonClosed(polygon) ? polygon : [...polygon, polygon[0]];
}

// Returns a boolean indicating whether the given <i>polygon</i> is closed. A polygon is considered closed if its first point is identical to its last point.
/**
 * @param {Polygon} polygon
 * @returns {boolean}
 */
export function polygonClosed(polygon) {
  if (polygon.length < 2) {
    return false;
  }
  const first = polygon[0],
    last = polygon[polygon.length - 1];
  return first[0] === last[0] && first[1] === last[1];
}

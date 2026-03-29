/**
 * @typedef {import("../types.js").Polygon} Polygon
 */

// Closes a polygon if it's not closed already. Does not modify input polygon.
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

// Tests whether a polygon is closed
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

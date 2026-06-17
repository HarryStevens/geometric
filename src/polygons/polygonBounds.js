/**
 * @typedef {import("../types.js").Point} Point
 * @typedef {import("../types.js").Polygon} Polygon
 * @typedef {[Point, Point]} Bounds
 */

/**
 * Returns the bounds of a <i>polygon</i>, ignoring points with invalid values (null, undefined, NaN, Infinity). The returned bounds are represented as an array of two points, where the first point is the top-left corner and the second point is the bottom-right corner. For example:
 *
 * ```js
 * const rectangle = [
 *   [0, 0],
 *   [0, 1],
 *   [1, 1],
 *   [1, 0],
 * ];
 * const bounds = geometric.polygonBounds(rectangle); // [[0, 0], [1, 1]]
 * ```
 *
 * Returns null if the <i>polygon</i> has fewer than three points.
 *
 * @param {Polygon} polygon
 * @returns {Bounds | null}
 */
export function polygonBounds(polygon) {
  if (polygon.length < 3) {
    return null;
  }

  let xMin = Infinity,
    xMax = -Infinity,
    yMin = Infinity,
    yMax = -Infinity,
    found = false;

  for (let i = 0, l = polygon.length; i < l; i++) {
    const p = polygon[i],
      x = p[0],
      y = p[1];

    if (x != null && isFinite(x) && y != null && isFinite(y)) {
      found = true;
      if (x < xMin) xMin = x;
      if (x > xMax) xMax = x;
      if (y < yMin) yMin = y;
      if (y > yMax) yMax = y;
    }
  }

  return found
    ? [
        [xMin, yMin],
        [xMax, yMax],
      ]
    : null;
}

// Determines whether a point is inside of a polygon, represented as an array of vertices.
// From https://github.com/substack/point-in-polygon/blob/master/index.js,
// based on the ray-casting algorithm from https://web.archive.org/web/20180115151705/https://wrf.ecse.rpi.edu//Research/Short_Notes/pnpoly.html
// Wikipedia: https://en.wikipedia.org/wiki/Point_in_polygon#Ray_casting_algorithm
// Returns a boolean.
/**
 * @typedef {import("../types.js").Point} Point
 * @typedef {import("../types.js").Polygon} Polygon
 */

// Returns a boolean representing whether a <i>point</i> is inside of a <i>polygon</i>. Uses [ray casting](https://en.wikipedia.org/wiki/Point_in_polygon#Ray_casting_algorithm).
/**
 * @param {Point} point
 * @param {Polygon} polygon
 * @returns {boolean}
 */
export function pointInPolygon(point, polygon) {
  let x = point[0],
    y = point[1],
    inside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i][0],
      yi = polygon[i][1],
      xj = polygon[j][0],
      yj = polygon[j][1];

    if (yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }

  return inside;
}

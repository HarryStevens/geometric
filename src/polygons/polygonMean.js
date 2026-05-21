/**
 * @typedef {import("../types.js").Point} Point
 * @typedef {import("../types.js").Polygon} Polygon
 */

// Returns the arithmetic mean of the vertices of a polygon. Keeps duplicate vertices, resulting in different values for open and closed polygons. Not to be [confused](https://github.com/Turfjs/turf/issues/334) with a [centroid](#polygonCentroid).
/**
 * @param {Polygon} vertices
 * @returns {Point | []}
 */
export function polygonMean(vertices) {
  if (!vertices.length) return [];

  let x = 0,
    y = 0,
    l = vertices.length;

  for (let i = 0; i < l; i++) {
    const v = vertices[i];

    x += v[0];
    y += v[1];
  }

  return [x / l, y / l];
}

/**
 * @typedef {import("../types.js").Point} Point
 * @typedef {import("../types.js").Polygon} Polygon
 */

// Calculates the arithmetic mean of a polygon's vertices.
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

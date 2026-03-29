import { lineMidpoint } from "../lines/lineMidpoint.js";

/**
 * @typedef {import("../types.js").Point} Point
 * @typedef {import("../types.js").Polygon} Polygon
 */

// Calculates the weighted centroid a polygon.
/**
 * @param {Polygon} vertices
 * @returns {Point | []}
 */
export function polygonCentroid(vertices) {
  if (!vertices.length) return [];
  if (vertices.length === 1) return vertices[0];
  if (vertices.length === 2) return lineMidpoint(vertices);

  let a = 0,
    x = 0,
    y = 0,
    l = vertices.length;

  for (let i = 0; i < l; i++) {
    const s = i === l - 1 ? 0 : i + 1,
      v0 = vertices[i],
      v1 = vertices[s],
      f = v0[0] * v1[1] - v1[0] * v0[1];

    a += f;
    x += (v0[0] + v1[0]) * f;
    y += (v0[1] + v1[1]) * f;
  }

  const d = a * 3;

  return [x / d, y / d];
}

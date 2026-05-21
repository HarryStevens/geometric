/**
 * @typedef {import("../types.js").Polygon} Polygon
 */

// Returns the length of a <i>polygon</i>'s perimeter.
/**
 * @param {Polygon} vertices
 * @returns {number}
 */
export function polygonLength(vertices) {
  if (vertices.length === 0) {
    return 0;
  }

  let i = -1,
    n = vertices.length,
    b = vertices[n - 1],
    xa,
    ya,
    xb = b[0],
    yb = b[1],
    perimeter = 0;

  while (++i < n) {
    xa = xb;
    ya = yb;
    b = vertices[i];
    xb = b[0];
    yb = b[1];
    xa -= xb;
    ya -= yb;
    perimeter += Math.sqrt(xa * xa + ya * ya);
  }

  return perimeter;
}

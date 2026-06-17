/**
 * @typedef {import("../types.js").Polygon} Polygon
 */

/**
 * Returns the area of a <i>polygon</i>. You can pass a boolean indicating whether the returned area is <i>signed</i>, which defaults to false.
 *
 * @param {Polygon} vertices
 * @param {boolean} [signed=false]
 * @returns {number}
 */
export function polygonArea(vertices, signed = false) {
  let a = 0;

  for (let i = 0, l = vertices.length; i < l; i++) {
    const v0 = vertices[i],
      v1 = vertices[i === l - 1 ? 0 : i + 1];

    a += v0[0] * v1[1];
    a -= v1[0] * v0[1];
  }

  return signed ? a / 2 : Math.abs(a / 2);
}

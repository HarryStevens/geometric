import { angleToRadians } from "../angles/angleToRadians.js";

/**
 * @typedef {import("../types.js").Point} Point
 */

// Returns the coordinates resulting from rotating a <i>point</i> about an origin by an <i>angle</i> in degrees. If <i>angle</i> is not specified, defaults to 0. If <i>origin</i> is not specified, the origin defaults to [0, 0].
/**
 * @param {Point} point
 * @param {number} [angle=0]
 * @param {Point} [origin]
 * @returns {Point}
 */
export function pointRotate(point, angle, origin) {
  const r = angleToRadians(angle || 0);

  if (!origin || (origin[0] === 0 && origin[1] === 0)) {
    return rotate(point, r);
  } else {
    // See: https://math.stackexchange.com/questions/1964905/rotation-around-non-zero-point
    const p0 = point.map((c, i) => c - origin[i]);
    const rotated = rotate(p0, r);
    return rotated.map((c, i) => c + origin[i]);
  }
}

/**
 * @param {Point} point
 * @param {number} angle
 * @returns {Point}
 */
function rotate(point, angle) {
  // See: https://en.wikipedia.org/wiki/Cartesian_coordinate_system#Rotation
  return [
    point[0] * Math.cos(angle) - point[1] * Math.sin(angle),
    point[0] * Math.sin(angle) + point[1] * Math.cos(angle),
  ];
}

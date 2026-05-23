/**
 * @typedef {import("../types.js").Point} Point
 */

/**
 * Returns the midpoint between two points.
 *
 * @param {Point} pointA
 * @param {Point} pointB
 * @returns {Point}
 */
export function midpoint(pointA, pointB) {
  return [(pointA[0] + pointB[0]) / 2, (pointA[1] + pointB[1]) / 2];
}

/**
 * Subtracts pointB from pointA.
 *
 * @param {Point} pointA
 * @param {Point} pointB
 * @returns {Point}
 */
export function subtract(pointA, pointB) {
  return [pointA[0] - pointB[0], pointA[1] - pointB[1]];
}

/**
 * Dot product of two vectors.
 *
 * @param {Point} pointA
 * @param {Point} pointB
 * @returns {number}
 */
export function dot(pointA, pointB) {
  return pointA[0] * pointB[0] + pointA[1] * pointB[1];
}

/**
 * 2D cross product of two vectors.
 *
 * @param {Point} pointA
 * @param {Point} pointB
 * @returns {number}
 */
export function cross2(pointA, pointB) {
  return pointA[0] * pointB[1] - pointA[1] * pointB[0];
}

/**
 * 2D cross product of OA x OB, where O is the origin point.
 *
 * @param {Point} pointA
 * @param {Point} pointB
 * @param {Point} origin
 * @returns {number}
 */
export function cross(pointA, pointB, origin) {
  return cross2(subtract(pointA, origin), subtract(pointB, origin));
}

/**
 * Magnitude of a vector.
 *
 * @param {Point} point
 * @returns {number}
 */
export function magnitude(point) {
  return Math.sqrt(dot(point, point));
}

/**
 * Squared distance between two points.
 *
 * @param {Point} pointA
 * @param {Point} pointB
 * @returns {number}
 */
export function distanceSquared(pointA, pointB) {
  const dx = pointA[0] - pointB[0];
  const dy = pointA[1] - pointB[1];
  return dx * dx + dy * dy;
}

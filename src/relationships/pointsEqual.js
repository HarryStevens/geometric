import { EPSILON } from "../utils/constants.js";

/**
 * @typedef {import("../types.js").Point} Point
 */

// Determines whether two points are equal within an epsilon tolerance.
/**
 * @param {Point} pointA
 * @param {Point} pointB
 * @param {number} [epsilon=EPSILON]
 * @returns {boolean}
 */
export function pointsEqual(pointA, pointB, epsilon = EPSILON) {
  return (
    Math.abs(pointA[0] - pointB[0]) <= epsilon &&
    Math.abs(pointA[1] - pointB[1]) <= epsilon
  );
}

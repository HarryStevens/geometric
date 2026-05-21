import { EPSILON } from "../utils/constants.js";

/**
 * @typedef {import("../types.js").Point} Point
 */

// Returns a boolean representing whether two <i>points</i> are equal within an optional <i>epsilon</i> tolerance. If <i>epsilon</i> is not specified, a small default tolerance is used.
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

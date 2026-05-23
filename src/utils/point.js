import { EPSILON } from "./constants.js";
import { cross2, subtract } from "./vector.js";

/**
 * @typedef {import("../types.js").Point} Point
 */

/**
 * Returns a stable string key for a point using epsilon-aligned precision.
 *
 * @param {Point} point
 * @returns {string}
 */
export function pointKey(point) {
  return `${point[0].toFixed(9)},${point[1].toFixed(9)}`;
}

/**
 * Tests whether three points are collinear within an epsilon tolerance.
 *
 * @param {Point} pointA
 * @param {Point} pointB
 * @param {Point} pointC
 * @param {number} [epsilon=EPSILON]
 * @returns {boolean}
 */
export function isCollinear(pointA, pointB, pointC, epsilon = EPSILON) {
  return (
    Math.abs(cross2(subtract(pointB, pointA), subtract(pointC, pointB))) <=
    epsilon
  );
}

import { lineLength } from "../lines/lineLength.js";
import { isCollinear } from "../utils/point.js";
import { cross } from "../utils/vector.js";

/**
 * @typedef {import("../types.js").Point} Point
 * @typedef {import("../types.js").Line} Line
 */

// See https://math.stackexchange.com/questions/274712/calculate-on-which-side-of-a-straight-line-is-a-given-point-located
/**
 * @param {Line} line
 * @returns {Line}
 */
function topPointFirst(line) {
  return line[1][1] > line[0][1] ? line : [line[1], line[0]];
}

/**
 * @param {Point} point
 * @param {Line} line
 * @returns {boolean}
 */
export function pointLeftofLine(point, line) {
  const t = topPointFirst(line);
  return cross(point, t[1], t[0]) < 0;
}
/**
 * @param {Point} point
 * @param {Line} line
 * @returns {boolean}
 */
export function pointRightofLine(point, line) {
  const t = topPointFirst(line);
  return cross(point, t[1], t[0]) > 0;
}
/**
 * @param {Point} point
 * @param {Line} line
 * @param {number} [epsilon=0]
 * @returns {boolean}
 */
export function pointOnLine(point, line, epsilon = 0) {
  const l = lineLength(line);
  return (
    pointWithLine(point, line, epsilon) &&
    lineLength([line[0], point]) <= l &&
    lineLength([line[1], point]) <= l
  );
}
/**
 * @param {Point} point
 * @param {Line} line
 * @param {number} [epsilon=0]
 * @returns {boolean}
 */
export function pointWithLine(point, line, epsilon = 0) {
  return isCollinear(point, line[0], line[1], epsilon);
}

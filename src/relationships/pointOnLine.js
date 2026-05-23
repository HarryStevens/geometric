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

// Returns a boolean representing whether a <i>point</i> is to the left of a <i>line</i>.
/**
 * @param {Point} point
 * @param {Line} line
 * @returns {boolean}
 */
export function pointLeftofLine(point, line) {
  const t = topPointFirst(line);
  return cross(point, t[1], t[0]) < 0;
}
// Returns a boolean representing whether a <i>point</i> is to the right of a <i>line</i>.
/**
 * @param {Point} point
 * @param {Line} line
 * @returns {boolean}
 */
export function pointRightofLine(point, line) {
  const t = topPointFirst(line);
  return cross(point, t[1], t[0]) > 0;
}

// Returns a boolean representing whether a <i>point</i> is collinear with a <i>line</i> and is also located on the line segment. An optional <i>epsilon</i> number, such as 1e-6, can be passed to reduce the precision with which the relationship is measured. See also [pointWithLine](#pointWithLine).
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

// Returns a boolean representing whether a <i>point</i> is collinear with a <i>line</i>. An optional <i>epsilon</i> number, such as 1e-6, can be passed to reduce the precision with which the relationship is measured. See also [pointOnLine](#pointOnLine).
/**
 * @param {Point} point
 * @param {Line} line
 * @param {number} [epsilon=0]
 * @returns {boolean}
 */
export function pointWithLine(point, line, epsilon = 0) {
  return isCollinear(point, line[0], line[1], epsilon);
}

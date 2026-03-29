import { lineInterpolate } from "../lines/lineInterpolate.js";
import { segmentProject } from "../utils/segment.js";

/**
 * @typedef {import("../types.js").Point} Point
 * @typedef {import("../types.js").Line} Line
 */

// Returns the closest position on a line to a point
/**
 * @param {Line} line
 * @param {Point} point
 * @returns {Point}
 */
export function pointToLine(line, point) {
  return lineInterpolate(line)(1 - segmentProject(point, line).t);
}

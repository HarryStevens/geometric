import { angleToDegrees } from "../angles/angleToDegrees.js";

/**
 * @typedef {import("../types.js").Line} Line
 */

// Returns the angle of a <i>line</i>, in degrees, with respect to the horizontal axis.
/**
 * @param {Line} line
 * @returns {number}
 */
export function lineAngle(line) {
  return angleToDegrees(
    Math.atan2(line[1][1] - line[0][1], line[1][0] - line[0][0]),
  );
}

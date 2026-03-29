import { angleToDegrees } from "../angles/angleToDegrees.js";

/**
 * @typedef {import("../types.js").Line} Line
 */

// Calculates the angle of a line, in degrees.
/**
 * @param {Line} line
 * @returns {number}
 */
export function lineAngle(line) {
  return angleToDegrees(
    Math.atan2(line[1][1] - line[0][1], line[1][0] - line[0][0]),
  );
}

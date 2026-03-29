import { lineMidpoint } from "./lineMidpoint.js";
import { pointRotate } from "../points/pointRotate.js";

/**
 * @typedef {import("../types.js").Line} Line
 * @typedef {import("../types.js").Point} Point
 */

// Returns the coordinates resulting from rotating a line about an origin by an angle in degrees.
// If origin is not specified, the origin defaults to the midpoint of the line.
/**
 * @param {Line} line
 * @param {number} angle
 * @param {Point} [origin]
 * @returns {Line}
 */
export function lineRotate(line, angle, origin) {
  return line.map((point) =>
    pointRotate(point, angle, origin || lineMidpoint(line)),
  );
}

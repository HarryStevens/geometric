import { lineMidpoint } from "./lineMidpoint.js";
import { pointRotate } from "../points/pointRotate.js";

/**
 * @typedef {import("../types.js").Line} Line
 * @typedef {import("../types.js").Point} Point
 */

// Returns the coordinates resulting from rotating a <i>line</i> about an origin by an <i>angle</i> in degrees. If <i>origin</i> is not specified, the origin defaults to the <a href="#lineMidpoint">midpoint</a> of the line.
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

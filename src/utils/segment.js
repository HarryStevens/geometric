import { pointKey } from "./point.js";

/**
 * @typedef {import("../types.js").Point} Point
 * @typedef {import("../types.js").Line} Line
 */

/**
 * @param {{ startKey: string, endKey: string }} segment
 * @returns {string}
 */
export function segmentKey(segment) {
  return `${segment.startKey}>${segment.endKey}`;
}

/**
 * Creates a stable directed key for a segment represented by start/end points.
 *
 * @param {[import("../types.js").Point, import("../types.js").Point]} segment
 * @returns {string}
 */
export function directedSegmentKey(segment) {
  return `${pointKey(segment[0])}>${pointKey(segment[1])}`;
}

/**
 * Projects a point onto a line segment.
 * See https://harryjstevens.com/geometric/examples/point-to-line/
 *
 * @param {Point} point
 * @param {Line} line
 * @returns {{ t: number, dist2: number }}
 */
export function segmentProject(point, line) {
  const [x, y] = point;
  const [[x1, y1], [x2, y2]] = line;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const a = dx * (x - x1) + dy * (y - y1);
  const b = dx * (x2 - x) + dy * (y2 - y);
  const t = a > 0 && b > 0 ? b / (a + b) : +(b > a);
  return { t, dist2: (x - x2 + t * dx) ** 2 + (y - y2 + t * dy) ** 2 };
}

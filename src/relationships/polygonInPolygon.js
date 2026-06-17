import { lineIntersectsPolygon } from "./lineIntersectsPolygon.js";
import { pointInPolygon } from "./pointInPolygon.js";
import { pointOnPolygon } from "./pointOnPolygon.js";
import { pointsEqual } from "./pointsEqual.js";
import { polygonClose } from "../polygons/polygonClose.js";

/**
 * @typedef {import("../types.js").Polygon} Polygon
 * @typedef {import("../types.js").Line} Line
 */

/**
 * @param {import("../types.js").Point} point
 * @param {Polygon} polygon
 * @returns {boolean}
 */
function pointInOrOnPolygon(point, polygon) {
  return pointInPolygon(point, polygon) || pointOnPolygon(point, polygon);
}

/**
 * @param {Line} line
 * @param {Polygon} polygon
 * @returns {boolean}
 */
function lineInOrOnPolygon(line, polygon) {
  const intersections = lineIntersectsPolygon(line, polygon) || [];
  const points = [line[0], line[1], ...intersections]
    .sort((a, b) => {
      const dA = (a[0] - line[0][0]) ** 2 + (a[1] - line[0][1]) ** 2;
      const dB = (b[0] - line[0][0]) ** 2 + (b[1] - line[0][1]) ** 2;
      return dA - dB;
    })
    .filter((point, i, arr) => i === 0 || !pointsEqual(point, arr[i - 1]));

  for (let i = 0, l = points.length - 1; i < l; i++) {
    const a = points[i],
      b = points[i + 1],
      midpoint = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];

    if (!pointInOrOnPolygon(midpoint, polygon)) {
      return false;
    }
  }

  return true;
}

/**
 * Returns a boolean representing whether <i>polygonA</i> is contained by <i>polygonB</i>. Points and edges on <i>polygonB</i>'s boundary are considered contained.
 *
 * @param {Polygon} polygonA
 * @param {Polygon} polygonB
 * @returns {boolean}
 */
export function polygonInPolygon(polygonA, polygonB) {
  let inside = true;
  const closed = polygonClose(polygonA);

  for (let i = 0, l = closed.length - 1; i < l; i++) {
    const v0 = closed[i];

    // Points test
    if (!pointInOrOnPolygon(v0, polygonB)) {
      inside = false;
      break;
    }

    // Lines test
    if (!lineInOrOnPolygon([v0, closed[i + 1]], polygonB)) {
      inside = false;
      break;
    }
  }

  return inside;
}

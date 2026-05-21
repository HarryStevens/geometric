import { lineIntersectsPolygon } from "./lineIntersectsPolygon.js";
import { pointInPolygon } from "./pointInPolygon.js";
import { polygonClose } from "../polygons/polygonClose.js";

/**
 * @typedef {import("../types.js").Polygon} Polygon
 */

// Returns a boolean representing whether <i>polygonA</i> is contained by <i>polygonB</i>.
/**
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
    if (!pointInPolygon(v0, polygonB)) {
      inside = false;
      break;
    }

    // Lines test
    if (lineIntersectsPolygon([v0, closed[i + 1]], polygonB)) {
      inside = false;
      break;
    }
  }

  return inside;
}

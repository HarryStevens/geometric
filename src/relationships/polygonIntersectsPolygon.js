import { lineIntersectsPolygon } from "./lineIntersectsPolygon.js";
import { pointOnPolygon } from "./pointOnPolygon.js";
import { polygonClose } from "../polygons/polygonClose.js";

/**
 * @typedef {import("../types.js").Polygon} Polygon
 */

/**
 * Returns a boolean representing whether <i>polygonA</i> intersects but is not contained by <i>polygonB</i>.
 *
 * @param {Polygon} polygonA
 * @param {Polygon} polygonB
 * @returns {boolean}
 */
export function polygonIntersectsPolygon(polygonA, polygonB) {
  let intersects = false,
    onCount = 0;
  const closed = polygonClose(polygonA);

  for (let i = 0, l = closed.length - 1; i < l; i++) {
    const v0 = closed[i],
      v1 = closed[i + 1];

    if (lineIntersectsPolygon([v0, v1], polygonB)) {
      intersects = true;
      break;
    }

    if (pointOnPolygon(v0, polygonB)) {
      ++onCount;
    }

    if (onCount === 2) {
      intersects = true;
      break;
    }
  }

  return intersects;
}

import { lineAngle } from "../lines/lineAngle.js";
import { lineLength } from "../lines/lineLength.js";
import { pointTranslate } from "../points/pointTranslate.js";
import { polygonCentroid } from "./polygonCentroid.js";

/**
 * @typedef {import("../types.js").Point} Point
 * @typedef {import("../types.js").Polygon} Polygon
 */

// Scales a polygon by a scale factor (where 1 is the original size) from an origin point.
// The returned polygon's area is equal to the input polygon's area multiplied by the square of the scaleFactor.
// The origin defaults to the polygon's centroid.
/**
 * @param {Polygon} polygon
 * @param {number} scale
 * @param {Point} [origin]
 * @returns {Polygon}
 */
export function polygonScale(polygon, scale, origin) {
  if (!origin) {
    origin = polygonCentroid(polygon);
  }

  let p = [];

  for (let i = 0, l = polygon.length; i < l; i++) {
    const v = polygon[i],
      d = lineLength([origin, v]),
      a = lineAngle([origin, v]);

    p[i] = pointTranslate(origin, a, d * scale);
  }

  return p;
}

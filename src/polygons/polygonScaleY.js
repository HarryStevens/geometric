import { lineAngle } from "../lines/lineAngle.js";
import { lineLength } from "../lines/lineLength.js";
import { pointTranslate } from "../points/pointTranslate.js";
import { polygonCentroid } from "./polygonCentroid.js";

/**
 * @typedef {import("../types.js").Point} Point
 * @typedef {import("../types.js").Polygon} Polygon
 */

// Scales a polygon's y-coordinates by a scale factor (where 1 is the original size) from an origin point.
// The origin defaults to the polygon's centroid.
/**
 * @param {Polygon} polygon
 * @param {number} scale
 * @param {Point} [origin]
 * @returns {Polygon}
 */
export function polygonScaleY(polygon, scale, origin) {
  if (!origin) {
    origin = polygonCentroid(polygon);
  }

  let p = [];

  for (let i = 0, l = polygon.length; i < l; i++) {
    const v = polygon[i],
      d = lineLength([origin, v]),
      a = lineAngle([origin, v]),
      t = pointTranslate(origin, a, d * scale);

    p[i] = [v[0], t[1]];
  }

  return p;
}

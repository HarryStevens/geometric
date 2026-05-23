import { lineAngle } from "../lines/lineAngle.js";
import { lineLength } from "../lines/lineLength.js";
import { pointTranslate } from "../points/pointTranslate.js";
import { polygonCentroid } from "./polygonCentroid.js";

/**
 * @typedef {import("../types.js").Point} Point
 * @typedef {import("../types.js").Polygon} Polygon
 */

// Returns the vertices resulting from scaling the vertical coordinates of a <i>polygon</i> by a <i>scaleFactor</i> (where 1 is the polygon's current size) from an origin point. The horizontal coordinates remain unchanged. If <i>origin</i> is not specified, the origin defaults to the polygon's centroid.
//
// The returned polygon's area is equal to the input polygon's area multiplied by the <i>scaleFactor</i>.
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

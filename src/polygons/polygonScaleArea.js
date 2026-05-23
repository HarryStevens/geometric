import { lineAngle } from "../lines/lineAngle.js";
import { lineLength } from "../lines/lineLength.js";
import { pointTranslate } from "../points/pointTranslate.js";
import { polygonCentroid } from "./polygonCentroid.js";

/**
 * @typedef {import("../types.js").Point} Point
 * @typedef {import("../types.js").Polygon} Polygon
 */

// Returns the vertices resulting from scaling a <i>polygon</i> by a <i>scaleFactor</i> (where 1 is the polygon's current size) from an origin point. If <i>origin</i> is not specified, the origin defaults to the polygon's centroid.
//
// The returned polygon's area is equal to the input polygon's area multiplied by the <i>scaleFactor</i>. To scale the polygon's area by the square of the <i>scaleFactor</i>, see <a href="#polygonScale">geometric.polygonScale</a>.
/**
 * @param {Polygon} polygon
 * @param {number} scale
 * @param {Point} [origin]
 * @returns {Polygon}
 */
export function polygonScaleArea(polygon, scale, origin) {
  if (!origin) {
    origin = polygonCentroid(polygon);
  }

  let p = [];

  for (let i = 0, l = polygon.length; i < l; i++) {
    const v = polygon[i],
      d = lineLength([origin, v]),
      a = lineAngle([origin, v]);

    p[i] = pointTranslate(origin, a, d * Math.sqrt(scale));
  }

  return p;
}

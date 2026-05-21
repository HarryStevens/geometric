import { lineInterpolate } from "../lines/lineInterpolate.js";
import { polygonBounds } from "./polygonBounds.js";

/**
 * @typedef {import("../types.js").Polygon} Polygon
 */

// Reflects a <em>polygon</em> over its horizontal midline. Pass an optional <em>reflectFactor</em> between 0 and 1, where 1 indicates a full reflection, 0 leaves the polygon unchanged, and 0.5 collapses the polygon on its horizontal midline.
/**
 * @param {Polygon} polygon
 * @param {number} [reflectFactor=1]
 * @returns {Polygon}
 */
export function polygonReflectY(polygon, reflectFactor = 1) {
  const bounds = polygonBounds(polygon);
  if (!bounds) {
    return polygon.slice();
  }

  const [[_, min], [__, max]] = bounds;
  const p = [];

  for (let i = 0, l = polygon.length; i < l; i++) {
    const [x, y] = polygon[i];
    const r = [x, min + max - y];

    if (reflectFactor === 0) {
      p[i] = [x, y];
    } else if (reflectFactor === 1) {
      p[i] = r;
    } else {
      const t = lineInterpolate([[x, y], r]);
      p[i] = t(Math.max(Math.min(reflectFactor, 1), 0));
    }
  }

  return p;
}

import { lineAngle } from "../lines/lineAngle.js";
import { lineLength } from "../lines/lineLength.js";
import { pointTranslate } from "../points/pointTranslate.js";
import { polygonTranslate } from "./polygonTranslate.js";

/**
 * @typedef {import("../types.js").Point} Point
 * @typedef {import("../types.js").Polygon} Polygon
 */

/**
 * Returns the vertices of a regular polygon of the specified number of <i>sides</i>, <i>area</i>, and <i>center</i> coordinates. If <i>sides</i> is not specified, defaults to 3. If <i>area</i> is not specified, defaults to 100. If <i>center</i> is not specified, defaults to [0, 0]. The returned polygon's winding order will be counter-clockwise.
 *
 * @param {number} [sides=3]
 * @param {number} [area=100]
 * @param {Point} [center]
 * @returns {Polygon}
 */
export function polygonRegular(sides = 3, area = 100, center) {
  let polygon = [],
    point = [0, 0],
    sum = [0, 0],
    angle = 0;

  for (let i = 0; i < sides; i++) {
    polygon[i] = point;
    sum[0] += point[0];
    sum[1] += point[1];
    point = pointTranslate(
      point,
      angle,
      Math.sqrt((4 * area * Math.tan(Math.PI / sides)) / sides),
    ); // https://web.archive.org/web/20180404142713/http://keisan.casio.com/exec/system/1355985985
    angle -= 360 / sides;
  }

  if (center) {
    const line = [[sum[0] / sides, sum[1] / sides], center];
    polygon = polygonTranslate(polygon, lineAngle(line), lineLength(line));
  }

  return polygon;
}

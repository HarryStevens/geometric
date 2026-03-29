/** @typedef {import("./types.js").Point} Point */
/** @typedef {import("./types.js").Line} Line */
/** @typedef {import("./types.js").Polygon} Polygon */

export { lineAngle } from "./lines/lineAngle.js";
export { lineInterpolate } from "./lines/lineInterpolate.js";
export { lineLength } from "./lines/lineLength.js";
export { lineMidpoint } from "./lines/lineMidpoint.js";
export { lineRotate } from "./lines/lineRotate.js";
export { lineTranslate } from "./lines/lineTranslate.js";

export { pointRotate } from "./points/pointRotate.js";
export { pointTranslate } from "./points/pointTranslate.js";

export { polygonArea } from "./polygons/polygonArea.js";
export { polygonBounds } from "./polygons/polygonBounds.js";
export { polygonCentroid } from "./polygons/polygonCentroid.js";
export { polygonClose, polygonClosed } from "./polygons/polygonClose.js";
export {
  polygonDifference,
  polygonIntersection,
  polygonUnion,
  polygonXor,
} from "./polygons/polygonBoolean.js";
export { polygonHull } from "./polygons/polygonHull.js";
export { polygonInterpolate } from "./polygons/polygonInterpolate.js";
export { polygonLength } from "./polygons/polygonLength.js";
export { polygonMean } from "./polygons/polygonMean.js";
export { polygonRandom } from "./polygons/polygonRandom.js";
export { polygonReflectX } from "./polygons/polygonReflectX.js";
export { polygonReflectY } from "./polygons/polygonReflectY.js";
export { polygonRegular } from "./polygons/polygonRegular.js";
export { polygonRotate } from "./polygons/polygonRotate.js";
export { polygonScale } from "./polygons/polygonScale.js";
export { polygonScaleArea } from "./polygons/polygonScaleArea.js";
export { polygonScaleX } from "./polygons/polygonScaleX.js";
export { polygonScaleY } from "./polygons/polygonScaleY.js";
export { polygonTranslate } from "./polygons/polygonTranslate.js";
export { polygonWind } from "./polygons/polygonWind.js";

export { lineIntersection } from "./relationships/lineIntersection.js";
export { lineIntersectsPolygon } from "./relationships/lineIntersectsPolygon.js";
export { pointInPolygon } from "./relationships/pointInPolygon.js";
export { pointOnPolygon } from "./relationships/pointOnPolygon.js";
export {
  pointLeftofLine,
  pointRightofLine,
  pointOnLine,
  pointWithLine,
} from "./relationships/pointOnLine.js";
export { pointsEqual } from "./relationships/pointsEqual.js";
export { pointToLine } from "./relationships/pointToLine.js";
export { pointToPolygon } from "./relationships/pointToPolygon.js";
export { polygonInPolygon } from "./relationships/polygonInPolygon.js";
export { polygonIntersectsPolygon } from "./relationships/polygonIntersectsPolygon.js";

export { angleReflect } from "./angles/angleReflect.js";
export { angleToDegrees } from "./angles/angleToDegrees.js";
export { angleToRadians } from "./angles/angleToRadians.js";

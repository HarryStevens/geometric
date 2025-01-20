import { lineAngle } from "./src/lines/lineAngle";
import { lineInterpolate } from "./src/lines/lineInterpolate";
import { lineLength } from "./src/lines/lineLength";
import { lineMidpoint } from "./src/lines/lineMidpoint";
import { lineRotate } from "./src/lines/lineRotate";
import { lineTranslate } from "./src/lines/lineTranslate";

import { pointRotate } from "./src/points/pointRotate";
import { pointTranslate } from "./src/points/pointTranslate";

import { polygonArea } from "./src/polygons/polygonArea";
import { polygonBounds } from "./src/polygons/polygonBounds";
import { polygonCentroid } from "./src/polygons/polygonCentroid";
import { polygonClose, polygonClosed } from "./src/polygons/polygonClose";
import { polygonHull } from "./src/polygons/polygonHull";
import { polygonInterpolate } from "./src/polygons/polygonInterpolate";
import { polygonLength } from "./src/polygons/polygonLength";
import { polygonMean } from "./src/polygons/polygonMean";
import { polygonRandom } from "./src/polygons/polygonRandom";
import { polygonReflectX } from "./src/polygons/polygonReflectX";
import { polygonReflectY } from "./src/polygons/polygonReflectY";
import { polygonRegular } from "./src/polygons/polygonRegular";
import { polygonRotate } from "./src/polygons/polygonRotate";
import { polygonScale } from "./src/polygons/polygonScale";
import { polygonScaleArea } from "./src/polygons/polygonScaleArea";
import { polygonScaleX } from "./src/polygons/polygonScaleX";
import { polygonScaleY } from "./src/polygons/polygonScaleY";
import { polygonTranslate } from "./src/polygons/polygonTranslate";
import { polygonWind } from "./src/polygons/polygonWind";

import { lineIntersectsLine } from "./src/relationships/lineIntersectsLine";
import { lineIntersectsPolygon } from "./src/relationships/lineIntersectsPolygon";
import { pointInPolygon } from "./src/relationships/pointInPolygon";
import { pointOnPolygon } from "./src/relationships/pointOnPolygon";
import { pointLeftofLine, pointRightofLine, pointOnLine, pointWithLine } from "./src/relationships/pointOnLine";
import { polygonInPolygon } from "./src/relationships/polygonInPolygon";
import { polygonIntersectsPolygon } from "./src/relationships/polygonIntersectsPolygon";

import { angleReflect } from "./src/angles/angleReflect";
import { angleToDegrees } from "./src/angles/angleToDegrees";
import { angleToRadians } from "./src/angles/angleToRadians";

const geometric = {
  lineAngle,
  lineInterpolate,
  lineLength,
  lineMidpoint,
  lineRotate,
  lineTranslate,

  pointRotate,
  pointTranslate,

  polygonArea,
  polygonBounds,
  polygonCentroid,
  polygonClose,
  polygonClosed,
  polygonHull,
  polygonInterpolate,
  polygonLength,
  polygonMean,
  polygonRandom,
  polygonReflectX,
  polygonReflectY,
  polygonRegular,
  polygonRotate,
  polygonScale,
  polygonScaleArea,
  polygonScaleX,
  polygonScaleY,
  polygonTranslate,
  polygonWind,

  lineIntersectsLine,
  lineIntersectsPolygon,
  pointInPolygon,
  pointOnPolygon,
  pointLeftofLine, pointRightofLine, pointOnLine, pointWithLine,
  polygonInPolygon,
  polygonIntersectsPolygon,

  angleReflect,
  angleToDegrees,
  angleToRadians
};

export default geometric;
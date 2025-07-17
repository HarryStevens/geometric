import { lineAngle } from "../lines/lineAngle";
import { lineLength } from "../lines/lineLength";
import { pointTranslate } from "../points/pointTranslate";
import { polygonCentroid } from "./polygonCentroid";

// Scales a polygon by a scale factor (where 1 is the original size) from an origin point.
// The returned polygon's area is equal to the input polygon's area multiplied by the scaleFactor.
// The origin defaults to the polygon's centroid.
export function polygonScaleArea(polygon, scale, origin){
  if (!origin){
    origin = polygonCentroid(polygon);
  }

  let p = [];

  for (let i = 0, l = polygon.length; i < l; i++){
    const v = polygon[i],
          d = lineLength([origin, v]),
          a = lineAngle([origin, v]);

    p[i] = pointTranslate(origin, a, d * Math.sqrt(scale));
  }

  return p;
}
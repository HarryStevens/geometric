import { lineAngle } from "../lines/lineAngle";
import { lineLength } from "../lines/lineLength";
import { pointTranslate } from "../points/pointTranslate";
import { polygonCentroid } from "./polygonCentroid";

// Scales a polygon by a scale factor (where 1 is the original size) from an origin point.
// The origin defaults to the polygon's centroid.
export function polygonScale(polygon, scale, origin){
  if (!origin){
    origin = polygonCentroid(polygon);
  }

  let p = [];

  for (let i = 0, l = polygon.length; i < l; i++){
    const v = polygon[i],
          d = lineLength([origin, v]),
          a = lineAngle([origin, v]);

    p[i] = pointTranslate(origin, a, d * scale);
  }

  return p;
}
import { lineInterpolate } from "../lines/lineInterpolate";
import { polygonBounds } from "./polygonBounds";

// Reflects a polygon over its horizontal midline.
// Pass an optional reflectFactor between 0 and 1,
// where 1 indicates a full reflection,
// 0 leaves the polygon unchanged,
// and 0.5 collapses the polygon on its horizontal midline.
export function polygonReflectY(polygon, reflectFactor = 1){
  const [[_, min], [__, max]] = polygonBounds(polygon);
  const p = [];
  
  for (let i = 0, l = polygon.length; i < l; i++){
    const [x, y] = polygon[i];
    const r = [x, min + max - y];

    if (reflectFactor === 0){
      p[i] = [x, y];
    }
    else if (reflectFactor === 1){
      p[i] = r;
    }
    else {
      const t = lineInterpolate([[x, y], r]);
      p[i] = t(Math.max(Math.min(reflectFactor, 1), 0));
    }
  }
  
  return p;
}
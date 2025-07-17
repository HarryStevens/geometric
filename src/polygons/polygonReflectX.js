import { lineInterpolate } from "../lines/lineInterpolate";
import { polygonBounds } from "./polygonBounds";

export function polygonReflectX(polygon, reflectFactor = 1){
  const [[min, _], [max, __]] = polygonBounds(polygon);
  const p = [];
  
  for (let i = 0, l = polygon.length; i < l; i++){
    const [x, y] = polygon[i];
    const r = [min + max - x, y];

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
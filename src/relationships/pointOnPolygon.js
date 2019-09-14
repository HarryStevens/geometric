import { close } from "../utils/closePolygon";
import { pointOnLine } from "./pointOnLine";

// Determines whether a point is located on one of the edges of a polygon.
// Returns a boolean.
export function pointOnPolygon(point, polygon){
  let on = false;
  const closed = close(polygon);
  
  for (let i = 0, l = closed.length - 1; i < l; i++){
    const v0 = closed[i],
          v1 = closed[i + 1],
          s = [v0, v1];
    
    if (pointOnLine(point, s)){
      on = true;
      break;
    }
  }
  
  return on;
}
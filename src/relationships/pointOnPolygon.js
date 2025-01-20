import { pointOnLine } from "./pointOnLine";
import { polygonClose } from "../polygons/polygonClose";

// Determines whether a point is located on one of the edges of a polygon.
// Returns a boolean.
export function pointOnPolygon(point, polygon, epsilon = 0){
  let on = false;
  const closed = polygonClose(polygon);
  
  for (let i = 0, l = closed.length - 1; i < l; i++){
    if (pointOnLine(point, [closed[i], closed[i + 1]], epsilon)){
      on = true;
      break;
    }
  }
  
  return on;
}
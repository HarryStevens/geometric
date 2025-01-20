import { lineIntersectsLine } from "./lineIntersectsLine";
import { pointOnLine } from "./pointOnLine";
import { polygonClose } from "../polygons/polygonClose";

// Determines whether a line intersects a polygon.
// Returns a boolean.
export function lineIntersectsPolygon(line, polygon){
  let intersects = false;
  const closed = polygonClose(polygon);

  for (let i = 0, l = closed.length - 1; i < l; i++){
    const v0 = closed[i],
          v1 = closed[i + 1];
    
    if (lineIntersectsLine(line, [v0, v1]) || (pointOnLine(v0, line) && pointOnLine(v1, line))){
      intersects = true;
      break;
    }
  }

  return intersects;
}
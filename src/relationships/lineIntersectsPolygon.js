import { close } from "../utils/closePolygon.js";
import { lineIntersectsLine } from "./lineIntersectsLine";
import { pointOnLine } from "../relationships/pointOnLine.js";

// Determines whether a line intersects a polygon.
// Returns a boolean.
export function lineIntersectsPolygon(line, polygon){
  let intersects = false;
  
  // Make it a closed polygon if it's not already
  // This will not modify the input polygon
  const closed = close(polygon);

  for (let i = 0, l = closed.length - 1; i < l; i++){
    const vertex0 = closed[i],
      vertex1 = closed[i + 1];
    
    if (lineIntersectsLine(line, [vertex0, vertex1]) || (pointOnLine(vertex0, line) && pointOnLine(vertex1, line))){
      intersects = true;
      break;
    }
  }

  return intersects;
}
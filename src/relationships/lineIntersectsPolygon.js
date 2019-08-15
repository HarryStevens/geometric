import { lineIntersectsLine } from "./lineIntersectsLine";

// Determines whether a line intersects a polygon.
// Returns a boolean.
export function lineIntersectsPolygon(line, polygon){
  let intersects = false;
  
  // Make it a closed polygon if it's not already
  // This will not alter the input polygonA
  const closed = polygon[0] !== polygon[polygon.length - 1] ? [...polygon, polygon[0]] : polygon;

  for (let i = 0, l = closed.length - 1; i < l; i++){
    if (lineIntersectsLine(line, [closed[i], closed[i + 1]])) {
      intersects = true;
      break;
    }
  }

  return intersects;
}
import { lineIntersectsLine } from "./lineIntersectsLine";

// Determines whether a line intersects a polygon.
// Returns a boolean.
export function lineIntersectsPolygon(line, polygon){
  let intersects = false;
  
  // Make it a closed polygon.
  if (polygon[0] !== polygon[polygon.length - 1]){
    polygon.push(polygon[0]);
  }

  for (let i = 0, l = polygon.length - 1; i < l; i++){
    if (lineIntersectsLine(line, [polygon[i], polygon[i + 1]])) {
      intersects = true;
      break;
    }
  }

  return intersects;
}
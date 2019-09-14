import { close } from "../utils/closePolygon";
import { lineIntersectsPolygon } from "./lineIntersectsPolygon";
import { pointInPolygon } from "./pointInPolygon";

// Determines whether a polygon is contained by another polygon.
// Polygons are represented as an array of vertices, each of which is an array of two numbers,
// where the first number represents its x-coordinate and the second its y-coordinate.
// Returns a boolean.
export function polygonInPolygon(polygonA, polygonB){
  let inside = true;
  const closed = close(polygonA);
  
  for (let i = 0, l = closed.length - 1; i < l; i++){
    const v0 = closed[i];
    
    // Points test  
    if (!pointInPolygon(v0, polygonB)){
      inside = false;
      break;
    }
    
    // Lines test
    if (lineIntersectsPolygon([v0, closed[i + 1]], polygonB)){
      inside = false;
      break;
    }
  }
  
  return inside;
}
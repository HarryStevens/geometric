import { close } from "../utils/closePolygon";
import { lineIntersectsPolygon } from "./lineIntersectsPolygon";
import { pointOnPolygon } from "./pointOnPolygon";

// Determines whether a polygon intersects but is not contained by another polygon.
// Polygons are represented as an array of vertices, each of which is an array of two numbers,
// where the first number represents its x-coordinate and the second its y-coordinate.
// Returns a boolean.
export function polygonIntersectsPolygon(polygonA, polygonB){
  let intersects = false,
      onCount = 0;
  const closed = close(polygonA);

  for (let i = 0, l = closed.length - 1; i < l; i++){
    const v0 = closed[i],
          v1 = closed[i + 1];
    
    if (lineIntersectsPolygon([v0, v1], polygonB)){
      intersects = true;
      break;
    }
    
    if (pointOnPolygon(v0, polygonB)){
      ++onCount;
    }
    
    if (onCount === 2){
      intersects = true;
      break;
    }
  }

  return intersects;
}
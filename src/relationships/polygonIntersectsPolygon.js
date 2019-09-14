import { close } from "../utils/closePolygon.js";
import { lineIntersectsPolygon } from "./lineIntersectsPolygon";

// Determines whether a polygon intersects but is not contained by another polygon.
// Polygons are represented as an array of vertices, each of which is an array of two numbers,
// where the first number represents its x-coordinate and the second its y-coordinate.
// Returns a boolean.
export function polygonIntersectsPolygon(polygonA, polygonB){
  let intersects = false;

  // Make it a closed polygon if it's not already
  // This will not modify the input polygonA
  const closed = close(polygonA);

  for (let i = 0, l = closed.length - 1; i < l; i++){
    if (lineIntersectsPolygon([closed[i], closed[i + 1]], polygonB)){
      intersects = true;
      break;
    }
  }

  return intersects;
}
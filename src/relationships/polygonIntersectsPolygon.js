import {lineIntersectsPolygon} from "./lineIntersectsPolygon";

// Determines whether a polygon intersects but is not contained by another polygon.
// Polygons are represented as an array of vertices, each of which is an array of two numbers,
// where the first number represents its x-coordinate and the second its y-coordinate.
// Returns a boolean.
export function polygonIntersectsPolygon(polygonA, polygonB){
  var intersects = false;

  // Make it a closed polygon
  if (polygonA[0] !== polygonA[polygonA.length - 1]){
    polygonA.push(polygonA[0]);
  }

  for (var i = 0, l = polygonA.length - 1; i < l; i++){
    if (lineIntersectsPolygon([polygonA[i], polygonA[i + 1]], polygonB)){
      intersects = true;
      break;
    }
  }

  return intersects;
}
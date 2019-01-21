import {pointInPolygon} from "./pointInPolygon";

// Determines whether a polygon is contained by another polygon.
// Polygons are represented as an array of vertices, each of which is an array of two numbers,
// where the first number represents its x-coordinate and the second its y-coordinate.
// Returns a boolean.
export function polygonInPolygon(polygonA, polygonB){
  var inside = true;

  for (var i = 0, l = polygonA.length; i < l; i++){
    var p = polygonA[i];
    if (!pointInPolygon(p, polygonB)){
      inside = false;
      break;
    }
  }

  return inside;
}
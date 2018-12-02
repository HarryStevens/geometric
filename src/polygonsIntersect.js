import pointInPolygon from "./pointInPolygon";

// Determines whether a polygon intersects but is not contained by another polygon.
// Polygons are represented as an array of vertices, each of which is an array of two numbers,
// where the first number represents its x-coordinate and the second its y-coordinate.
// Returns a boolean.
export default function polygonsIntersect(verticesA, verticesB){
  return verticesA.some(function(p){ return pointInPolygon(p, verticesB); }) &&
        !verticesA.every(function(p){ return pointInPolygon(p, verticesB); });
}
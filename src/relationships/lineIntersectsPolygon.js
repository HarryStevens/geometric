import { lineIntersection } from "./lineIntersection";
import { polygonClose } from "../polygons/polygonClose";

// Returns an array of points where a line intersects a polygon.
// If the line does not intersect the polygon, returns null.
export function lineIntersectsPolygon(line, polygon) {
  const intersections = [];
  const closed = polygonClose(polygon);

  const pointExists = (arr, point) => {
    return arr.some(p => Math.abs(p[0] - point[0]) < 1e-9 && Math.abs(p[1] - point[1]) < 1e-9);
  };

  for (let i = 0, l = closed.length - 1; i < l; i++) {
    const v0 = closed[i],
          v1 = closed[i + 1];

    const intersection = lineIntersection(line, [v0, v1]);
    if (intersection && !pointExists(intersections, intersection)) {
      intersections.push(intersection);
    }
  }

  return intersections.length ? intersections : null;
}
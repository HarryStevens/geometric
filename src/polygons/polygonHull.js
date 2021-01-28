import { cross } from "../utils/crossProduct";

// Caclulates the convex hull of a set of points.
// See https://en.wikibooks.org/wiki/Algorithm_Implementation/Geometry/Convex_hull/Monotone_chain#JavaScript
export function polygonHull(points){
  if (points.length < 3) { return null; }

  const pointsCopy = points.slice().sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);

  let lower = [];
  for (let i = 0; i < pointsCopy.length; i++) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], pointsCopy[i]) <= 0) {
       lower.pop();
    }
    lower.push(pointsCopy[i]);
  }

  let upper = [];
  for (let i = pointsCopy.length - 1; i >= 0; i--) {
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], pointsCopy[i]) <= 0) {
       upper.pop();
    }
    upper.push(pointsCopy[i]);
  }

  upper.pop();
  lower.pop();

  return lower.concat(upper);
}
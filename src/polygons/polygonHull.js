import { cross } from "../utils/crossProduct";

// Caclulates the convex hull of a set of points.
// See https://en.wikibooks.org/wiki/Algorithm_Implementation/Geometry/Convex_hull/Monotone_chain#JavaScript
export function polygonHull(points){
  if (points.length < 3) { return null; }

  const pointsCopy = points.slice().sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);

  let lower = [];
  for (let i0 = 0; i0 < pointsCopy.length; i0++) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], pointsCopy[i0]) <= 0) {
       lower.pop();
    }
    lower.push(pointsCopy[i0]);
  }

  let upper = [];
  for (let i1 = pointsCopy.length - 1; i1 >= 0; i1--) {
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], pointsCopy[i1]) <= 0) {
       upper.pop();
    }
    upper.push(pointsCopy[i1]);
  }

  upper.pop();
  lower.pop();

  return lower.concat(upper);
}
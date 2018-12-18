import {cross} from "./utils/crossProduct";

// Caclulates the convex hull of a set of points.
// See https://en.wikibooks.org/wiki/Algorithm_Implementation/Geometry/Convex_hull/Monotone_chain#JavaScript
export function convexHull(points){
  if (points.length < 3) { return null; }

  points.sort(function(a, b) {
    return a[0] === b[0] ? a[1] - b[1] : a[0] - b[0];
  });

  var lower = [];
  for (var i0 = 0; i0 < points.length; i0++) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], points[i0]) <= 0) {
       lower.pop();
    }
    lower.push(points[i0]);
  }

  var upper = [];
  for (var i1 = points.length - 1; i1 >= 0; i1--) {
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], points[i1]) <= 0) {
       upper.pop();
    }
    upper.push(points[i1]);
  }

  upper.pop();
  lower.pop();

  return lower.concat(upper);
}
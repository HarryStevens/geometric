import { cross } from "../utils/vector.js";

/**
 * @typedef {import("../types.js").Point} Point
 * @typedef {import("../types.js").Polygon} Polygon
 */

// Returns the [convex hull](https://en.wikipedia.org/wiki/Convex_hull), represented as a polygon, for an array of <i>points</i>. Returns null if the input array has fewer than three points. Uses [Andrew’s monotone chain algorithm](https://en.wikibooks.org/wiki/Algorithm_Implementation/Geometry/Convex_hull/Monotone_chain#JavaScript).
/**
 * @param {Point[]} points
 * @returns {Polygon | null}
 */
export function polygonHull(points) {
  if (points.length < 3) {
    return null;
  }

  const pointsCopy = points
    .slice()
    .sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));

  let lower = [];
  for (let i = 0; i < pointsCopy.length; i++) {
    while (
      lower.length >= 2 &&
      cross(lower[lower.length - 2], lower[lower.length - 1], pointsCopy[i]) <=
        0
    ) {
      lower.pop();
    }
    lower.push(pointsCopy[i]);
  }

  let upper = [];
  for (let i = pointsCopy.length - 1; i >= 0; i--) {
    while (
      upper.length >= 2 &&
      cross(upper[upper.length - 2], upper[upper.length - 1], pointsCopy[i]) <=
        0
    ) {
      upper.pop();
    }
    upper.push(pointsCopy[i]);
  }

  upper.pop();
  lower.pop();

  return lower.concat(upper);
}

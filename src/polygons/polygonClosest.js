import { lineInterpolate } from "../lines/lineInterpolate";
import { polygonClose } from "./polygonClose";
import { segmentProject } from "../utils/segmentProject";

// Returns the closest position on a polygon's perimeter to a point
export function polygonClosest(polygon, point) {
  if (polygon.length === 1) return polygon[0];

  let closestD = Infinity, closest = [];
  const closed = polygonClose(polygon);

  for (let i = 0, l = closed.length - 1; i < l; i++) {
    const line = [closed[i], closed[i + 1]];    
    const { t, dist2 } = segmentProject(point, line);
    if (dist2 < closestD) {
      closestD = dist2;
      closest = lineInterpolate(line)(1 - t);
    }
  }
  
  return closest;
}
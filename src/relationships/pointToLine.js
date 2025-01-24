import { lineInterpolate } from "../lines/lineInterpolate";
import { segmentProject } from "../utils/segmentProject";

// Returns the closest position on a line to a point
export function pointToLine(line, point) {
  return lineInterpolate(line)(1 - segmentProject(point, line).t)
}
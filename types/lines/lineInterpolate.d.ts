import { Line, Point } from "../common";

export function lineInterpolate(
  line: Line,
  clamp?: boolean
): (t: number) => Point;
import { lineAngle } from "./lineAngle";
import { lineLength } from "./lineLength";
import { pointTranslate } from "../points/pointTranslate";

// Returns an interpolator function given a line [a, b].
// The returned interpolator function takes a single argument t, where t is a number ranging from 0 to 1;
// a value of 0 returns a, while a value of 1 returns b.
// Intermediate values interpolate from start to end along the line segment.
export function lineInterpolate(line){
  return t => t === 0 ? line[0] : t === 1 ? line[1] : pointTranslate(line[0], lineAngle(line), lineLength(line) * t);
}
import { lineAngle } from "./lineAngle";
import { lineLength } from "./lineLength";
import { pointTranslate } from "../points/pointTranslate";

// Returns an interpolator function given a line [a, b].
// The returned interpolator function takes a single argument t, where t is a number ranging from 0 to 1;
// a value of 0 returns a, while a value of 1 returns b.
// Intermediate values interpolate from start to end along the line segment.
// By default, the returned interpolator will output points outside of the line segment if t is less than 0 or greater than 1.
// You can pass an optional boolean indicating whether to the returned point to inside of the line segment,
// even if t is greater than 1 or less then 0.
export function lineInterpolate(line, clamp = false){
  if (clamp) {
    return t => t <= 0 ? line[0] : t >= 1 ? line[1] : pointTranslate(line[0], lineAngle(line), lineLength(line) * t);
  }
  else {
    return t => t === 0 ? line[0] : t === 1 ? line[1] : pointTranslate(line[0], lineAngle(line), lineLength(line) * t);  
  }
}
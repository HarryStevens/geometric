import { angleToDegrees } from "../angles/angleToDegrees";

// Calculates the angle of a line, in degrees.
export function lineAngle(line){
  return angleToDegrees(Math.atan2(line[1][1] - line[0][1], line[1][0] - line[0][0]));
}
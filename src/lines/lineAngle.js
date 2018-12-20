// Calculates the angle of a line, in degrees.
export function lineAngle(line){
  return Math.atan2(line[1][1] - line[0][1], line[1][0] - line[0][0]) * 180 / Math.PI;
}
import { lineMidpoint } from "./lineMidpoint";
import { pointRotate } from "../points/pointRotate";

// Returns the coordinates resulting from rotating a line about an origin by an angle in degrees.
// If origin is not specified, the origin defaults to the midpoint of the line.
export function lineRotate(line, angle, origin){
  return line.map(point => pointRotate(point, angle, origin || lineMidpoint(line)));
}
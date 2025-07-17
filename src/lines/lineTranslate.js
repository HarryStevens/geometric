import { pointTranslate } from "../points/pointTranslate";

// Returns the coordinates resulting from translating a line by an angle in degrees and a distance.
export function lineTranslate(line, angle, distance){
  return line.map(point => pointTranslate(point, angle, distance));
}
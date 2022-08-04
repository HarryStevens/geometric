import { pointTranslate } from "../points/pointTranslate";

export function lineTranslate(line, angle, distance){
  return line.map(point => pointTranslate(point, angle, distance));
}
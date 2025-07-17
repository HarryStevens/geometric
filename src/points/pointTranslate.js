import { angleToRadians } from "../angles/angleToRadians";

// Translates a point by an angle in degrees and distance
export function pointTranslate(point, angle = 0, distance = 0){
  const r = angleToRadians(angle);
  return [point[0] + distance * Math.cos(r), point[1] + distance * Math.sin(r)];
}
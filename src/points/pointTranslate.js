// Translates a point by an angle in degrees and distance
export function pointTranslate(point, angle, distance){
  angle = angle / 180 * Math.PI;
  return [point[0] + distance * Math.cos(angle), point[1] + distance * Math.sin(angle)];
}
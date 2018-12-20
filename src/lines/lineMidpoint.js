// Calculates the midpoint of a line segment.
export function lineMidpoint(line){
  return [(line[0][0] + line[1][0]) / 2, (line[0][1] + line[1][1]) / 2];
}
// Calculate the angle between two points, in degrees.
// Takes two arguments, each of which is a point represented as an array of two numbers,
// where the first number is its x coordinate and the second number is its y coordinate.
export function angleDegrees(a, b){
  return Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI;
}
// Calculates the midpoint between two points.
// Takes two arguments, each of which is a point represented as an array of two numbers,
// where the first number is its x coordinate and the second number is its y coordinate.
export function midpoint(a, b){
  return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]
}
// Calculates the distance between two points.
// Takes two arguments, each of which is a point represented as an array of two numbers,
// where the first number is its x coordinate and the second number is its y coordinate.
export default function distance(a, b){
  return Math.sqrt(Math.pow(b[0] - a[0], 2) + Math.pow(b[1] - a[1], 2))
}
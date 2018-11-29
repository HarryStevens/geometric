// Translates a point (p) by an angle in radians (a) and distance (d)
export default function translateDegrees(p, a, d){
  a = a / 180 * Math.PI;
  return [p[0] + d * Math.cos(a), p[1] + d * Math.sin(a)]
}
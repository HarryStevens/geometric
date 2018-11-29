// Translates a point (p) by an angle in degrees (a) and distance (d)
export default function translateRadians(p, a, d){
  return [p[0] + d * Math.cos(a), p[1] + d * Math.sin(a)]
}
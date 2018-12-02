// Rotates a point (p) by an angle in degrees (a) around an origin (o)
export default function rotateDegrees(p, a, o){
  a = a / 180 * Math.PI;
  if (!o || o === [0, 0]){
    return rotate(p, a);
  }

  else {
    // See: https://math.stackexchange.com/questions/1964905/rotation-around-non-zero-point
    var p0 = p.map((c, i) => c - o[i]);
    var r = rotate(p0, a);
    return r.map((c, i) => c + o[i]);
  }
  
  function rotate(p, a){
    // See: https://en.wikipedia.org/wiki/Cartesian_coordinate_system#Rotation
    return [(p[0] * Math.cos(a)) - p[1] * Math.sin(a), (p[0] * Math.sin(a)) + p[1] * Math.cos(a)];
  }
}
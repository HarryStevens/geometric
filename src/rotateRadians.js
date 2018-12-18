// Rotate a point (p) by an angle in radians (a) around an origin (o)
export function rotateRadians(p, a, o){
  if (!o || o === [0, 0]){
    return rotate(p, a);
  }

  else {
    // See: https://math.stackexchange.com/questions/1964905/rotation-around-non-zero-point
    var p0 = p.map(function(c, i){ return c - o[i]; });
    var r = rotate(p0, a);
    return r.map(function(c, i){ return c + o[i]; });
  }
    
  function rotate(p, a){
    // See: https://en.wikipedia.org/wiki/Cartesian_coordinate_system#Rotation
    return [(p[0] * Math.cos(a)) - p[1] * Math.sin(a), (p[0] * Math.sin(a)) + p[1] * Math.cos(a)];
  }
}
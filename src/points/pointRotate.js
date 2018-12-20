// Rotates a point by an angle in degrees around an origin.
export function pointRotate(point, angle, origin){
  angle = angle / 180 * Math.PI;
  if (!origin || origin === [0, 0]){
    return rotate(point, angle);
  }

  else {
    // See: https://math.stackexchange.com/questions/1964905/rotation-around-non-zero-point
    var p0 = point.map(function(c, i){ return c - origin[i]; });
    var r = rotate(p0, angle);
    return r.map(function(c, i){ return c + origin[i]; });
  }
  
  function rotate(point, angle){
    // See: https://en.wikipedia.org/wiki/Cartesian_coordinate_system#Rotation
    return [(point[0] * Math.cos(angle)) - point[1] * Math.sin(angle), (point[0] * Math.sin(angle)) + point[1] * Math.cos(angle)];
  }
}
// Returns the angle of reflection given an angle of incidence and a surface angle.
export function angleReflect(incidenceAngle, surfaceAngle){
  var a = surfaceAngle * 2 + incidenceAngle * -1;
  return a >= 360 ? a - 360 : a < 0 ? a + 360 : a;
}
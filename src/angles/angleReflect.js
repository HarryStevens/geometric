// Returns the angle of reflection given an angle of incidence and a surface angle.
export function angleReflect(incidenceAngle, surfaceAngle) {
  return (surfaceAngle * 2 - incidenceAngle % 360 + 360) % 360;
}
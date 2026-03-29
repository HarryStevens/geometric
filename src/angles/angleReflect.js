// Returns the angle of reflection given an angle of incidence and a surface angle.
/**
 * @param {number} incidenceAngle
 * @param {number} surfaceAngle
 * @returns {number}
 */
export function angleReflect(incidenceAngle, surfaceAngle) {
  return (surfaceAngle * 2 - (incidenceAngle % 360) + 360) % 360;
}

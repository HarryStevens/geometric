/**
 * Returns the angle of reflection given a starting angle, also known as the angle of <i>incidence</i>, and the angle of the <i>surface</i> off of which it is reflected.
 *
 * @param {number} incidenceAngle
 * @param {number} surfaceAngle
 * @returns {number}
 */
export function angleReflect(incidenceAngle, surfaceAngle) {
  return (surfaceAngle * 2 - (incidenceAngle % 360) + 360) % 360;
}

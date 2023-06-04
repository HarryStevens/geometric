// Returns an interpolator function given a line [a, b].
// The returned interpolator function takes a single argument t, where t is a number ranging from 0 to 1;
// a value of 0 returns a, while a value of 1 returns b.
// Intermediate values interpolate from start to end along the line segment.
// By default, the returned interpolator will output points outside of the line segment if t is less than 0 or greater than 1.
// You can pass an optional boolean indicating whether to the returned point to inside of the line segment,
// even if t is greater than 1 or less then 0.
export function lineInterpolate(line, clamp = false){
  const [[x1, y1], [x2, y2]] = line;
  const x = scale([0, 1], [x1, x2]);
  const y = scale([0, 1], [y1, y2]);
  return t => {
    const t0 = clamp ? t < 0 ? 0 : t > 1 ? 1 : t : t;
    return [x(t0), y(t0)];
  }
}

// A linear scale
function scale([d0, d1], [r0, r1]){
  const dx = d1 - d0;
  const rx = r1 - r0;
  return v => rx * ((v - d0) / dx) + r0;
}
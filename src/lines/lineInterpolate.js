// Returns an interpolator function given a line [a, b].
// The returned interpolator function takes a single argument t, where t is a number ranging from 0 to 1;
// a value of 0 returns a, while a value of 1 returns b.
// Intermediate values interpolate from start to end along the line segment.
// By default, the returned interpolator will clamp the output to the ends of the line segment.
// You can pass an optional boolean indicating whether to return points outside the line segment
// if t is greater than 1 or less than 0.
export function lineInterpolate(line, clamp = true){
  const [[x1, y1], [x2, y2]] = line;
  const x = v => (x2 - x1) * v + x1;
  const y = v => (y2 - y1) * v + y1;
  return t => {
    const t0 = clamp ? t < 0 ? 0 : t > 1 ? 1 : t : t;
    return [ x(t0), y(t0) ];
  }
}
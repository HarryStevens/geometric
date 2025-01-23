// Projects a point onto a line segment
// See https://observablehq.com/@fil/distance-to-a-segment
export function segmentProject(point, line) {
  const [x, y] = point;
  const [[x1, y1], [x2, y2]] = line;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const a = dx * (x - x1) + dy * (y - y1);
  const b = dx * (x2 - x) + dy * (y2 - y);
  const t = a > 0 && b > 0 ? b / (a + b) : +(b > a);
  return { t, dist2: (x - x2 + t * dx) ** 2 + (y - y2 + t * dy) ** 2 };
}
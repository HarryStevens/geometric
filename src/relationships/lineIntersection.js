import { pointOnLine } from "./pointOnLine";

// Returns a point where line <i>a</i> intersects line <i>b</i>.
// If the two lines do not intersect, returns null.
export function lineIntersection(a, b) {
  const [a0x, a0y] = a[0], [a1x, a1y] = a[1];
  const [b0x, b0y] = b[0], [b1x, b1y] = b[1];

  // Bounding box overlap check
  if (
    Math.min(a0x, a1x) > Math.max(b0x, b1x) ||
    Math.min(b0x, b1x) > Math.max(a0x, a1x) ||
    Math.min(a0y, a1y) > Math.max(b0y, b1y) ||
    Math.min(b0y, b1y) > Math.max(a0y, a1y)
  ) {
    return null;
  }

  // Shared points or points on line
  if ((a0x === b0x && a0y === b0y) || pointOnLine(a[0], b)) return a[0];
  if ((a1x === b1x && a1y === b1y) || pointOnLine(a[1], b)) return a[1];
  if (pointOnLine(b[0], a)) return b[0];
  if (pointOnLine(b[1], a)) return b[1];

  // Vectorized calculation
  const dxA = a1x - a0x, dyA = a1y - a0y;
  const dxB = b1x - b0x, dyB = b1y - b0y;

  const denom = (dyB * dxA) - (dxB * dyA);
  if (denom === 0) return null; // Parallel lines

  const dy = a0y - b0y, dx = a0x - b0x;
  const numerA = (dxB * dy) - (dyB * dx);
  const numerB = (dxA * dy) - (dyA * dx);
  const quotA = numerA / denom, quotB = numerB / denom;

  return (quotA >= 0 && quotA <= 1 && quotB >= 0 && quotB <= 1) 
    ? [a0x + quotA * dxA, a0y + quotA * dyA] 
    : null;
}
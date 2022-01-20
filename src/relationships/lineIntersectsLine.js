import { pointOnLine } from "../relationships/pointOnLine";

// Determines if lineA intersects lineB.
// Returns a boolean.
export function lineIntersectsLine(lineA, lineB) {
  const [[a0x, a0y], [a1x, a1y]] = lineA,
        [[b0x, b0y], [b1x, b1y]] = lineB;
  
  // Test for shared points
  if (a0x === b0x && a0y === b0y) return true;
  if (a1x === b1x && a1y === b1y) return true;

  // Test for point on line
  if (pointOnLine(lineA[0], lineB) || pointOnLine(lineA[1], lineB)) return true;
  if (pointOnLine(lineB[0], lineA) || pointOnLine(lineB[1], lineA)) return true;

  const denom = ((b1y - b0y) * (a1x - a0x)) - ((b1x - b0x) * (a1y - a0y));
  
  if (denom === 0) return false;
  
  const deltaY = a0y - b0y,
        deltaX = a0x - b0x,
        numer0 = ((b1x - b0x) * deltaY) - ((b1y - b0y) * deltaX),
        numer1 = ((a1x - a0x) * deltaY) - ((a1y - a0y) * deltaX),
        quotA = numer0 / denom,
        quotB = numer1 / denom;

  return quotA > 0 && quotA < 1 && quotB > 0 && quotB < 1;
}


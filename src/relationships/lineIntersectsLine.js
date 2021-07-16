// Determines if lineA intersects lineB. 
// See: https://stackoverflow.com/questions/9043805/test-if-two-lines-intersect-javascript-function/24392281#24392281
// See also https://github.com/HarryStevens/geometric/issues/10#issuecomment-880587209
// Returns a boolean.
export function lineIntersectsLine(lineA, lineB) {
  const a = lineA[0][0],
        b = lineA[0][1],
        c = lineA[1][0],
        d = lineA[1][1],
        p = lineB[0][0],
        q = lineB[0][1],
        r = lineB[1][0],
        s = lineB[1][1],
        det = ((c - a) * (s - q) - (r - p) * (d - b));
  
  // Check if lines are parallel
  if (floatEqual(det, 0)) {
    // Check if parallel lines have same origin
    const lineAConst = (d - b) * a - (c - a) * b;
    const lineBConst = (s - q) * p - (r - p) * q;

    if (floatEqual(lineBConst, lineAConst)) {
      // Check if segments overlap
      const minLineXA = Math.min(a, c);
      const maxXLineA = Math.max(a, c);
      const minLineXB = Math.min(p, r);
      const maxXLineB = Math.max(p, r);

      return minLineXB <= maxXLineA + Number.EPSILON || maxXLineB >= minLineXA - Number.EPSILON;
    } else {
      return false;
    }
  } else {
    // Check if lines are crossing in the segments
    const lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
    const gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;

    return (0 <= lambda + Number.EPSILON  && lambda <= 1 + Number.EPSILON) && (0 <= gamma + Number.EPSILON && gamma <= 1 + Number.EPSILON);
  }
}

function floatEqual(float1, float2) { 
  return float1 <= float2 + Number.EPSILON && float1 >= float2 - Number.EPSILON;
}
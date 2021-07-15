// Determines if lineA intersects lineB. 
// See: https://stackoverflow.com/questions/9043805/test-if-two-lines-intersect-javascript-function/24392281#24392281
// Returns a boolean.
export function lineIntersectsLine(lineA, lineB) {
  let a = lineA[0][0],
      b = lineA[0][1],
      c = lineA[1][0],
      d = lineA[1][1],
      p = lineB[0][0],
      q = lineB[0][1],
      r = lineB[1][0],
      s = lineB[1][1],
      det, gamma, lambda;

  det = ((c - a) * (s - q) - (r - p) * (d - b));
  
  if (floatEqual(det, 0)) {
      return false;
  } else {
    lambda = (((s - q) * (r - a) + (p - r) * (s - b)) / det);
    gamma = (((b - d) * (r - a) + (c - a) * (s - b)) / det);
    return (0 <= lambda + Number.EPSILON  && lambda <= 1 + Number.EPSILON ) && (0 <= gamma + Number.EPSILON && gamma <= 1 + Number.EPSILON);
  }
}

function floatEqual(float1, float2) { 
  return float1 <= float2 + Number.EPSILON && float1 >= float2 - Number.EPSILON;
}
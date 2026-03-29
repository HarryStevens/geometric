// Converts radians to degrees.
/**
 * @param {number} angle
 * @returns {number}
 */
function angleToDegrees(angle) {
  return (angle * 180) / Math.PI;
}

/**
 * @typedef {import("../types.js").Line} Line
 */

// Calculates the angle of a line, in degrees.
/**
 * @param {Line} line
 * @returns {number}
 */
function lineAngle(line) {
  return angleToDegrees(
    Math.atan2(line[1][1] - line[0][1], line[1][0] - line[0][0]),
  );
}

/**
 * @typedef {import("../types.js").Point} Point
 * @typedef {import("../types.js").Line} Line
 */

// Returns an interpolator function given a line [a, b].
// The returned interpolator function takes a single argument t, where t is a number ranging from 0 to 1;
// a value of 0 returns a, while a value of 1 returns b.
// Intermediate values interpolate from start to end along the line segment.
// By default, the returned interpolator will clamp the output to the ends of the line segment.
// You can pass an optional boolean indicating whether to return points outside the line segment
// if t is greater than 1 or less than 0.
/**
 * @param {Line} line
 * @param {boolean} [clamp=true]
 * @returns {(t: number) => Point}
 */
function lineInterpolate(line, clamp = true) {
  const [[x1, y1], [x2, y2]] = line;
  /** @param {number} value */
  const x = (value) => (x2 - x1) * value + x1;
  /** @param {number} value */
  const y = (value) => (y2 - y1) * value + y1;
  return (t) => {
    const t0 = clamp ? (t < 0 ? 0 : t > 1 ? 1 : t) : t;
    return [x(t0), y(t0)];
  };
}

/**
 * @typedef {import("../types.js").Line} Line
 */

// Calculates the distance between the endpoints of a line segment.
/**
 * @param {Line} line
 * @returns {number}
 */
function lineLength(line) {
  return Math.sqrt(
    Math.pow(line[1][0] - line[0][0], 2) + Math.pow(line[1][1] - line[0][1], 2),
  );
}

/**
 * @typedef {import("../types.js").Point} Point
 * @typedef {import("../types.js").Line} Line
 */

// Calculates the midpoint of a line segment.
/**
 * @param {Line} line
 * @returns {Point}
 */
function lineMidpoint(line) {
  return [(line[0][0] + line[1][0]) / 2, (line[0][1] + line[1][1]) / 2];
}

// Converts degrees to radians.
/**
 * @param {number} angle
 * @returns {number}
 */
function angleToRadians(angle) {
  return (angle / 180) * Math.PI;
}

/**
 * @typedef {import("../types.js").Point} Point
 */

// Rotates a point by an angle in degrees around an origin.
/**
 * @param {Point} point
 * @param {number} [angle=0]
 * @param {Point} [origin]
 * @returns {Point}
 */
function pointRotate(point, angle, origin) {
  const r = angleToRadians(angle || 0);

  if (!origin || (origin[0] === 0 && origin[1] === 0)) {
    return rotate(point, r);
  } else {
    // See: https://math.stackexchange.com/questions/1964905/rotation-around-non-zero-point
    const p0 = point.map((c, i) => c - origin[i]);
    const rotated = rotate(p0, r);
    return rotated.map((c, i) => c + origin[i]);
  }
}

/**
 * @param {Point} point
 * @param {number} angle
 * @returns {Point}
 */
function rotate(point, angle) {
  // See: https://en.wikipedia.org/wiki/Cartesian_coordinate_system#Rotation
  return [
    point[0] * Math.cos(angle) - point[1] * Math.sin(angle),
    point[0] * Math.sin(angle) + point[1] * Math.cos(angle),
  ];
}

/**
 * @typedef {import("../types.js").Line} Line
 * @typedef {import("../types.js").Point} Point
 */

// Returns the coordinates resulting from rotating a line about an origin by an angle in degrees.
// If origin is not specified, the origin defaults to the midpoint of the line.
/**
 * @param {Line} line
 * @param {number} angle
 * @param {Point} [origin]
 * @returns {Line}
 */
function lineRotate(line, angle, origin) {
  return line.map((point) =>
    pointRotate(point, angle, origin || lineMidpoint(line)),
  );
}

/**
 * @typedef {import("../types.js").Point} Point
 */

// Translates a point by an angle in degrees and distance
/**
 * @param {Point} point
 * @param {number} [angle=0]
 * @param {number} [distance=0]
 * @returns {Point}
 */
function pointTranslate(point, angle = 0, distance = 0) {
  const r = angleToRadians(angle);
  return [point[0] + distance * Math.cos(r), point[1] + distance * Math.sin(r)];
}

/**
 * @typedef {import("../types.js").Line} Line
 */

// Returns the coordinates resulting from translating a line by an angle in degrees and a distance.
/**
 * @param {Line} line
 * @param {number} angle
 * @param {number} distance
 * @returns {Line}
 */
function lineTranslate(line, angle, distance) {
  return line.map((point) => pointTranslate(point, angle, distance));
}

/**
 * @typedef {import("../types.js").Polygon} Polygon
 */

// Calculates the area of a polygon.
/**
 * @param {Polygon} vertices
 * @param {boolean} [signed=false]
 * @returns {number}
 */
function polygonArea(vertices, signed = false) {
  let a = 0;

  for (let i = 0, l = vertices.length; i < l; i++) {
    const v0 = vertices[i],
      v1 = vertices[i === l - 1 ? 0 : i + 1];

    a += v0[0] * v1[1];
    a -= v1[0] * v0[1];
  }

  return signed ? a / 2 : Math.abs(a / 2);
}

/**
 * @typedef {import("../types.js").Point} Point
 * @typedef {import("../types.js").Polygon} Polygon
 * @typedef {[Point, Point]} Bounds
 */

// Calculates the bounds of a polygon.
/**
 * @param {Polygon} polygon
 * @returns {Bounds | null}
 */
function polygonBounds(polygon) {
  if (polygon.length < 3) {
    return null;
  }

  let xMin = Infinity,
    xMax = -Infinity,
    yMin = Infinity,
    yMax = -Infinity,
    found = false;

  for (let i = 0, l = polygon.length; i < l; i++) {
    const p = polygon[i],
      x = p[0],
      y = p[1];

    if (x != null && isFinite(x) && y != null && isFinite(y)) {
      found = true;
      if (x < xMin) xMin = x;
      if (x > xMax) xMax = x;
      if (y < yMin) yMin = y;
      if (y > yMax) yMax = y;
    }
  }

  return found
    ? [
        [xMin, yMin],
        [xMax, yMax],
      ]
    : null;
}

/**
 * @typedef {import("../types.js").Point} Point
 * @typedef {import("../types.js").Polygon} Polygon
 */

// Calculates the weighted centroid a polygon.
/**
 * @param {Polygon} vertices
 * @returns {Point | []}
 */
function polygonCentroid(vertices) {
  if (!vertices.length) return [];
  if (vertices.length === 1) return vertices[0];
  if (vertices.length === 2) return lineMidpoint(vertices);

  let a = 0,
    x = 0,
    y = 0,
    l = vertices.length;

  for (let i = 0; i < l; i++) {
    const s = i === l - 1 ? 0 : i + 1,
      v0 = vertices[i],
      v1 = vertices[s],
      f = v0[0] * v1[1] - v1[0] * v0[1];

    a += f;
    x += (v0[0] + v1[0]) * f;
    y += (v0[1] + v1[1]) * f;
  }

  const d = a * 3;

  return [x / d, y / d];
}

/**
 * @typedef {import("../types.js").Polygon} Polygon
 */

// Closes a polygon if it's not closed already. Does not modify input polygon.
/**
 * @param {Polygon} polygon
 * @returns {Polygon}
 */
function polygonClose(polygon) {
  if (!polygon.length) {
    return polygon;
  }
  return polygonClosed(polygon) ? polygon : [...polygon, polygon[0]];
}

// Tests whether a polygon is closed
/**
 * @param {Polygon} polygon
 * @returns {boolean}
 */
function polygonClosed(polygon) {
  if (polygon.length < 2) {
    return false;
  }
  const first = polygon[0],
    last = polygon[polygon.length - 1];
  return first[0] === last[0] && first[1] === last[1];
}

// Determines whether a point is inside of a polygon, represented as an array of vertices.
// From https://github.com/substack/point-in-polygon/blob/master/index.js,
// based on the ray-casting algorithm from https://web.archive.org/web/20180115151705/https://wrf.ecse.rpi.edu//Research/Short_Notes/pnpoly.html
// Wikipedia: https://en.wikipedia.org/wiki/Point_in_polygon#Ray_casting_algorithm
// Returns a boolean.
/**
 * @typedef {import("../types.js").Point} Point
 * @typedef {import("../types.js").Polygon} Polygon
 */

/**
 * @param {Point} point
 * @param {Polygon} polygon
 * @returns {boolean}
 */
function pointInPolygon(point, polygon) {
  let x = point[0],
    y = point[1],
    inside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i][0],
      yi = polygon[i][1],
      xj = polygon[j][0],
      yj = polygon[j][1];

    if (yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }

  return inside;
}

const EPSILON = 1e-9;

/**
 * @typedef {import("../types.js").Point} Point
 */

/**
 * Returns the midpoint between two points.
 *
 * @param {Point} pointA
 * @param {Point} pointB
 * @returns {Point}
 */
function midpoint(pointA, pointB) {
  return [(pointA[0] + pointB[0]) / 2, (pointA[1] + pointB[1]) / 2];
}

/**
 * Subtracts pointB from pointA.
 *
 * @param {Point} pointA
 * @param {Point} pointB
 * @returns {Point}
 */
function subtract(pointA, pointB) {
  return [pointA[0] - pointB[0], pointA[1] - pointB[1]];
}

/**
 * Dot product of two vectors.
 *
 * @param {Point} pointA
 * @param {Point} pointB
 * @returns {number}
 */
function dot(pointA, pointB) {
  return pointA[0] * pointB[0] + pointA[1] * pointB[1];
}

/**
 * 2D cross product of two vectors.
 *
 * @param {Point} pointA
 * @param {Point} pointB
 * @returns {number}
 */
function cross2(pointA, pointB) {
  return pointA[0] * pointB[1] - pointA[1] * pointB[0];
}

/**
 * 2D cross product of OA x OB, where O is the origin point.
 *
 * @param {Point} pointA
 * @param {Point} pointB
 * @param {Point} origin
 * @returns {number}
 */
function cross(pointA, pointB, origin) {
  return cross2(subtract(pointA, origin), subtract(pointB, origin));
}

/**
 * Magnitude of a vector.
 *
 * @param {Point} point
 * @returns {number}
 */
function magnitude(point) {
  return Math.sqrt(dot(point, point));
}

/**
 * Squared distance between two points.
 *
 * @param {Point} pointA
 * @param {Point} pointB
 * @returns {number}
 */
function distanceSquared(pointA, pointB) {
  const dx = pointA[0] - pointB[0];
  const dy = pointA[1] - pointB[1];
  return dx * dx + dy * dy;
}

/**
 * @typedef {import("../types.js").Point} Point
 */

/**
 * Returns a stable string key for a point using epsilon-aligned precision.
 *
 * @param {Point} point
 * @returns {string}
 */
function pointKey(point) {
  return `${point[0].toFixed(9)},${point[1].toFixed(9)}`;
}

/**
 * Tests whether three points are collinear within an epsilon tolerance.
 *
 * @param {Point} pointA
 * @param {Point} pointB
 * @param {Point} pointC
 * @param {number} [epsilon=EPSILON]
 * @returns {boolean}
 */
function isCollinear(pointA, pointB, pointC, epsilon = EPSILON) {
  return (
    Math.abs(cross2(subtract(pointB, pointA), subtract(pointC, pointB))) <=
    epsilon
  );
}

/**
 * @typedef {import("../types.js").Point} Point
 * @typedef {import("../types.js").Line} Line
 */

// See https://math.stackexchange.com/questions/274712/calculate-on-which-side-of-a-straight-line-is-a-given-point-located
/**
 * @param {Line} line
 * @returns {Line}
 */
function topPointFirst(line) {
  return line[1][1] > line[0][1] ? line : [line[1], line[0]];
}

/**
 * @param {Point} point
 * @param {Line} line
 * @returns {boolean}
 */
function pointLeftofLine(point, line) {
  const t = topPointFirst(line);
  return cross(point, t[1], t[0]) < 0;
}
/**
 * @param {Point} point
 * @param {Line} line
 * @returns {boolean}
 */
function pointRightofLine(point, line) {
  const t = topPointFirst(line);
  return cross(point, t[1], t[0]) > 0;
}
/**
 * @param {Point} point
 * @param {Line} line
 * @param {number} [epsilon=0]
 * @returns {boolean}
 */
function pointOnLine(point, line, epsilon = 0) {
  const l = lineLength(line);
  return (
    pointWithLine(point, line, epsilon) &&
    lineLength([line[0], point]) <= l &&
    lineLength([line[1], point]) <= l
  );
}
/**
 * @param {Point} point
 * @param {Line} line
 * @param {number} [epsilon=0]
 * @returns {boolean}
 */
function pointWithLine(point, line, epsilon = 0) {
  return isCollinear(point, line[0], line[1], epsilon);
}

/**
 * @typedef {import("../types.js").Point} Point
 * @typedef {import("../types.js").Polygon} Polygon
 */

// Determines whether a point is located on one of the edges of a polygon.
// Returns a boolean.
/**
 * @param {Point} point
 * @param {Polygon} polygon
 * @param {number} [epsilon=0]
 * @returns {boolean}
 */
function pointOnPolygon(point, polygon, epsilon = 0) {
  let on = false;
  const closed = polygonClose(polygon);

  for (let i = 0, l = closed.length - 1; i < l; i++) {
    if (pointOnLine(point, [closed[i], closed[i + 1]], epsilon)) {
      on = true;
      break;
    }
  }

  return on;
}

/**
 * @typedef {import("../types.js").Point} Point
 */

// Determines whether two points are equal within an epsilon tolerance.
/**
 * @param {Point} pointA
 * @param {Point} pointB
 * @param {number} [epsilon=EPSILON]
 * @returns {boolean}
 */
function pointsEqual(pointA, pointB, epsilon = EPSILON) {
  return (
    Math.abs(pointA[0] - pointB[0]) <= epsilon &&
    Math.abs(pointA[1] - pointB[1]) <= epsilon
  );
}

/**
 * Clamps a number to the inclusive range [0, 1].
 *
 * @param {number} value
 * @returns {number}
 */
function clamp01(value) {
  if (value < 0) {
    return 0;
  }
  if (value > 1) {
    return 1;
  }
  return value;
}

/**
 * @typedef {import("../types.js").Point} Point
 * @typedef {import("../types.js").Line} Line
 */

/**
 * @param {{ startKey: string, endKey: string }} segment
 * @returns {string}
 */
function segmentKey(segment) {
  return `${segment.startKey}>${segment.endKey}`;
}

/**
 * Creates a stable directed key for a segment represented by start/end points.
 *
 * @param {[import("../types.js").Point, import("../types.js").Point]} segment
 * @returns {string}
 */
function directedSegmentKey(segment) {
  return `${pointKey(segment[0])}>${pointKey(segment[1])}`;
}

/**
 * Projects a point onto a line segment.
 * See https://observablehq.com/@fil/distance-to-a-segment
 *
 * @param {Point} point
 * @param {Line} line
 * @returns {{ t: number, dist2: number }}
 */
function segmentProject(point, line) {
  const [x, y] = point;
  const [[x1, y1], [x2, y2]] = line;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const a = dx * (x - x1) + dy * (y - y1);
  const b = dx * (x2 - x) + dy * (y2 - y);
  const t = a > 0 && b > 0 ? b / (a + b) : +(b > a);
  return { t, dist2: (x - x2 + t * dx) ** 2 + (y - y2 + t * dy) ** 2 };
}

/**
 * @typedef {import("../types.js").Point} Point
 * @typedef {import("../types.js").Line} Line
 * @typedef {import("../types.js").Polygon} Polygon
 */

/**
 * Returns the union of two polygons.
 *
 * Disjoint results are bridged into a single point array.
 *
 * @param {Polygon} polygonA
 * @param {Polygon} polygonB
 * @returns {Polygon | null}
 */
function polygonUnion(polygonA, polygonB) {
  return polygonBoolean("union", polygonA, polygonB);
}

/**
 * Returns the overlapping area shared by two polygons.
 *
 * @param {Polygon} polygonA
 * @param {Polygon} polygonB
 * @returns {Polygon | null}
 */
function polygonIntersection(polygonA, polygonB) {
  return polygonBoolean("intersection", polygonA, polygonB);
}

/**
 * Returns the portion of `polygonA` that is outside `polygonB`.
 *
 * Holes are bridged into a single point array.
 *
 * @param {Polygon} polygonA
 * @param {Polygon} polygonB
 * @returns {Polygon | null}
 */
function polygonDifference(polygonA, polygonB) {
  return polygonBoolean("difference", polygonA, polygonB);
}

/**
 * Returns the symmetric difference of two polygons.
 *
 * Split results are bridged into a single point array.
 *
 * @param {Polygon} polygonA
 * @param {Polygon} polygonB
 * @returns {Polygon | null}
 */
function polygonXor(polygonA, polygonB) {
  return polygonBoolean("xor", polygonA, polygonB);
}

/**
 * @param {"union" | "intersection" | "difference" | "xor"} operation
 * @param {Polygon} polygonA
 * @param {Polygon} polygonB
 * @returns {Polygon | null}
 */
function polygonBoolean(operation, polygonA, polygonB) {
  const polygon0 = preparePolygon(polygonA);
  const polygon1 = preparePolygon(polygonB);

  if (!polygon0 || !polygon1) {
    return null;
  }

  const scale = offsetScale(polygon0, polygon1);
  const segments = buildBoundarySegments(operation, polygon0, polygon1, scale);

  if (!segments.length) {
    return null;
  }

  const rings = traceBoundaryRings(segments)
    .map(cleanRing)
    .filter(
      (ring) => ring.length >= 3 && Math.abs(polygonArea(ring, true)) > EPSILON,
    );

  if (!rings.length) {
    return null;
  }

  return bridgeRings(rings);
}

/**
 * @param {Polygon} polygon
 * @returns {Polygon | null}
 */
function preparePolygon(polygon) {
  if (!Array.isArray(polygon) || polygon.length < 3) {
    return null;
  }

  const open = polygonClosed(polygon) ? polygon.slice(0, -1) : polygon.slice();
  if (open.length < 3) {
    return null;
  }

  return polygonArea(open, true) < 0 ? open.slice().reverse() : open;
}

/**
 * @param {Polygon} polygonA
 * @param {Polygon} polygonB
 * @returns {number}
 */
function offsetScale(polygonA, polygonB) {
  const points = polygonA.concat(polygonB);
  let xMin = Infinity;
  let xMax = -Infinity;
  let yMin = Infinity;
  let yMax = -Infinity;

  for (const [x, y] of points) {
    if (x < xMin) xMin = x;
    if (x > xMax) xMax = x;
    if (y < yMin) yMin = y;
    if (y > yMax) yMax = y;
  }

  const span = Math.max(xMax - xMin, yMax - yMin, 1);
  return span * 1e-7;
}

/**
 * @param {"union" | "intersection" | "difference" | "xor"} operation
 * @param {Polygon} polygonA
 * @param {Polygon} polygonB
 * @param {number} scale
 * @returns {{ start: Point, end: Point, startKey: string, endKey: string, angle: number }[]}
 */
function buildBoundarySegments(operation, polygonA, polygonB, scale) {
  const splitEdgesA = splitPolygonEdges(polygonA, polygonB);
  const splitEdgesB = splitPolygonEdges(polygonB, polygonA);
  const segments = [];
  const seen = new Set();

  for (const segment of splitEdgesA.concat(splitEdgesB)) {
    const boundary = orientBoundarySegment(
      operation,
      polygonA,
      polygonB,
      segment,
      scale,
    );
    if (!boundary) {
      continue;
    }

    const key = directedSegmentKey([boundary.start, boundary.end]);
    if (!seen.has(key)) {
      seen.add(key);
      segments.push(boundary);
    }
  }

  return segments;
}

/**
 * @param {Polygon} polygon
 * @param {Polygon} otherPolygon
 * @returns {{ start: Point, end: Point }[]}
 */
function splitPolygonEdges(polygon, otherPolygon) {
  /** @type {{ start: Point, end: Point }[]} */
  const segments = [];
  const closed = polygonClose(polygon);
  const otherClosed = polygonClose(otherPolygon);

  for (let i = 0; i < closed.length - 1; i += 1) {
    /** @type {Line} */
    const edge = [closed[i], closed[i + 1]];
    const interpolateEdge = lineInterpolate(edge, false);
    const cuts = [0, 1];

    for (let j = 0; j < otherClosed.length - 1; j += 1) {
      /** @type {Line} */
      const otherEdge = [otherClosed[j], otherClosed[j + 1]];
      const intersections = segmentIntersections(edge, otherEdge);

      for (const intersection of intersections) {
        cuts.push(intersection.tA);
      }
    }

    const values = uniqueNumbers(cuts).sort((a, b) => a - b);
    for (let j = 0; j < values.length - 1; j += 1) {
      const start = interpolateEdge(values[j]);
      const end = interpolateEdge(values[j + 1]);
      if (!pointsEqual(start, end)) {
        segments.push({ start, end });
      }
    }
  }

  return segments;
}

/**
 * @param {"union" | "intersection" | "difference" | "xor"} operation
 * @param {Polygon} polygonA
 * @param {Polygon} polygonB
 * @param {{ start: Point, end: Point }} segment
 * @param {number} scale
 * @returns {{ start: Point, end: Point, startKey: string, endKey: string, angle: number } | null}
 */
function orientBoundarySegment(operation, polygonA, polygonB, segment, scale) {
  const center = midpoint(segment.start, segment.end);
  const direction = subtract(segment.end, segment.start);
  const length = magnitude(direction);

  if (length <= EPSILON) {
    return null;
  }

  const normal = [-direction[1] / length, direction[0] / length];
  const offset = Math.min(scale, length / 3);
  /** @type {Point} */
  const leftPoint = [
    center[0] + normal[0] * offset,
    center[1] + normal[1] * offset,
  ];
  /** @type {Point} */
  const rightPoint = [
    center[0] - normal[0] * offset,
    center[1] - normal[1] * offset,
  ];

  const leftInside = operationContains(
    operation,
    leftPoint,
    polygonA,
    polygonB,
  );
  const rightInside = operationContains(
    operation,
    rightPoint,
    polygonA,
    polygonB,
  );

  if (leftInside === rightInside) {
    return null;
  }

  const start = leftInside ? segment.start : segment.end;
  const end = leftInside ? segment.end : segment.start;

  return {
    start,
    end,
    startKey: pointKey(start),
    endKey: pointKey(end),
    angle: Math.atan2(end[1] - start[1], end[0] - start[0]),
  };
}

/**
 * @param {"union" | "intersection" | "difference" | "xor"} operation
 * @param {Point} point
 * @param {Polygon} polygonA
 * @param {Polygon} polygonB
 * @returns {boolean}
 */
function operationContains(operation, point, polygonA, polygonB) {
  const inA = containsPoint(point, polygonA);
  const inB = containsPoint(point, polygonB);

  switch (operation) {
    case "union":
      return inA || inB;
    case "intersection":
      return inA && inB;
    case "difference":
      return inA && !inB;
    case "xor":
      return inA !== inB;
    default:
      return false;
  }
}

/**
 * @param {Point} point
 * @param {Polygon} polygon
 * @returns {boolean}
 */
function containsPoint(point, polygon) {
  return (
    pointOnPolygon(point, polygon, EPSILON) || pointInPolygon(point, polygon)
  );
}

/**
 * @param {[Point, Point]} segmentA
 * @param {[Point, Point]} segmentB
 * @returns {{ point: Point, tA: number, tB: number }[]}
 */
function segmentIntersections(segmentA, segmentB) {
  const interpolateSegmentA = lineInterpolate(segmentA, false);
  const p = segmentA[0];
  const q = segmentB[0];
  const r = subtract(segmentA[1], segmentA[0]);
  const s = subtract(segmentB[1], segmentB[0]);
  const rxs = cross2(r, s);
  const qmp = subtract(q, p);
  const qmpxr = cross2(qmp, r);
  const rr = dot(r, r);
  const ss = dot(s, s);

  if (rr <= EPSILON || ss <= EPSILON) {
    return [];
  }

  if (Math.abs(rxs) <= EPSILON && Math.abs(qmpxr) <= EPSILON) {
    const t0 = dot(qmp, r) / rr;
    const t1 = t0 + dot(s, r) / rr;
    const start = clamp01(Math.max(0, Math.min(t0, t1)));
    const end = clamp01(Math.min(1, Math.max(t0, t1)));

    if (end + EPSILON < start) {
      return [];
    }

    if (Math.abs(start - end) <= EPSILON) {
      const point = interpolateSegmentA(start);
      return [{ point, tA: start, tB: projectPointToSegment(point, segmentB) }];
    }

    const startPoint = interpolateSegmentA(start);
    const endPoint = interpolateSegmentA(end);
    return [
      {
        point: startPoint,
        tA: start,
        tB: projectPointToSegment(startPoint, segmentB),
      },
      {
        point: endPoint,
        tA: end,
        tB: projectPointToSegment(endPoint, segmentB),
      },
    ];
  }

  if (Math.abs(rxs) <= EPSILON) {
    return [];
  }

  const t = cross2(qmp, s) / rxs;
  const u = cross2(qmp, r) / rxs;

  if (t < -EPSILON || t > 1 + EPSILON || u < -EPSILON || u > 1 + EPSILON) {
    return [];
  }

  const tA = clamp01(t);
  const tB = clamp01(u);
  return [{ point: interpolateSegmentA(tA), tA, tB }];
}

/**
 * @param {{ start: Point, end: Point, startKey: string, endKey: string, angle: number }[]} segments
 * @returns {Polygon[]}
 */
function traceBoundaryRings(segments) {
  /** @type {Map<string, { start: Point, end: Point, startKey: string, endKey: string, angle: number }[]>} */
  const outgoing = new Map();

  for (const segment of segments) {
    if (!outgoing.has(segment.startKey)) {
      outgoing.set(segment.startKey, []);
    }
    outgoing.get(segment.startKey).push(segment);
  }

  for (const entries of outgoing.values()) {
    entries.sort((a, b) => b.angle - a.angle);
  }

  /** @type {Set<string>} */
  const used = new Set();
  /** @type {Polygon[]} */
  const rings = [];

  for (const segment of segments) {
    const key = segmentKey(segment);
    if (used.has(key)) {
      continue;
    }

    /** @type {Polygon} */
    const ring = [segment.start];
    let current = segment;

    while (current) {
      const currentKey = segmentKey(current);
      if (used.has(currentKey)) {
        break;
      }

      used.add(currentKey);
      ring.push(current.end);

      if (current.endKey === segment.startKey) {
        break;
      }

      current = nextSegment(current, outgoing, used);
    }

    if (ring.length > 3 && pointsEqual(ring[0], ring[ring.length - 1])) {
      ring.pop();
      rings.push(ring);
    }
  }

  return rings;
}

/**
 * @param {{ end: Point, endKey: string, start: Point } & { angle: number }} segment
 * @param {Map<string, { start: Point, end: Point, startKey: string, endKey: string, angle: number }[]>} outgoing
 * @param {Set<string>} used
 * @returns {{ start: Point, end: Point, startKey: string, endKey: string, angle: number } | null}
 */
function nextSegment(segment, outgoing, used) {
  const candidates = outgoing.get(segment.endKey) || [];
  const reverseAngle = Math.atan2(
    segment.start[1] - segment.end[1],
    segment.start[0] - segment.end[0],
  );
  let best = null;
  let bestDelta = Infinity;

  for (const candidate of candidates) {
    if (used.has(segmentKey(candidate))) {
      continue;
    }

    const delta = clockwiseDelta(reverseAngle, candidate.angle);
    if (delta < bestDelta - EPSILON) {
      bestDelta = delta;
      best = candidate;
    }
  }

  return best;
}

/**
 * @param {Polygon[]} rings
 * @returns {Polygon}
 */
function bridgeRings(rings) {
  const ordered = rings
    .slice()
    .sort(
      (a, b) => Math.abs(polygonArea(b, true)) - Math.abs(polygonArea(a, true)),
    );

  let merged = ordered[0].slice();

  for (let i = 1; i < ordered.length; i += 1) {
    merged = bridgeTwoRings(merged, ordered[i]);
  }

  return cleanRing(merged);
}

/**
 * @param {Polygon} ringA
 * @param {Polygon} ringB
 * @returns {Polygon}
 */
function bridgeTwoRings(ringA, ringB) {
  let bestA = 0;
  let bestB = 0;
  let bestDistance = Infinity;

  for (let i = 0; i < ringA.length; i += 1) {
    for (let j = 0; j < ringB.length; j += 1) {
      const distance = distanceSquared(ringA[i], ringB[j]);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestA = i;
        bestB = j;
      }
    }
  }

  const rotated = rotateRing(ringB, bestB);
  const anchor = ringA[bestA];

  return [
    ...ringA.slice(0, bestA + 1),
    ...rotated,
    rotated[0],
    anchor,
    ...ringA.slice(bestA + 1),
  ];
}

/**
 * @param {Polygon} ring
 * @param {number} startIndex
 * @returns {Polygon}
 */
function rotateRing(ring, startIndex) {
  return ring.slice(startIndex).concat(ring.slice(0, startIndex));
}

/**
 * @param {Polygon} ring
 * @returns {Polygon}
 */
function cleanRing(ring) {
  if (!ring.length) {
    return ring;
  }

  /** @type {Polygon} */
  const cleaned = [ring[0]];

  for (let i = 1; i < ring.length; i += 1) {
    const point = ring[i];
    if (!pointsEqual(point, cleaned[cleaned.length - 1])) {
      cleaned.push(point);
    }
  }

  if (
    cleaned.length > 1 &&
    pointsEqual(cleaned[0], cleaned[cleaned.length - 1])
  ) {
    cleaned.pop();
  }

  let changed = true;
  while (changed && cleaned.length >= 3) {
    changed = false;
    for (let i = 0; i < cleaned.length; i += 1) {
      const previous = cleaned[(i - 1 + cleaned.length) % cleaned.length];
      const current = cleaned[i];
      const next = cleaned[(i + 1) % cleaned.length];
      if (isCollinear(previous, current, next)) {
        cleaned.splice(i, 1);
        changed = true;
        break;
      }
    }
  }

  return cleaned;
}

/**
 * @param {number[]} values
 * @returns {number[]}
 */
function uniqueNumbers(values) {
  /** @type {number[]} */
  const unique = [];

  for (const value of values) {
    if (!unique.some((entry) => Math.abs(entry - value) <= EPSILON)) {
      unique.push(value);
    }
  }

  return unique;
}

/**
 * @param {Point} point
 * @param {[Point, Point]} segment
 * @returns {number}
 */
function projectPointToSegment(point, segment) {
  const direction = subtract(segment[1], segment[0]);
  const lengthSquared = dot(direction, direction);
  if (lengthSquared <= EPSILON) {
    return 0;
  }

  return clamp01(dot(subtract(point, segment[0]), direction) / lengthSquared);
}

/**
 * @param {number} angleA
 * @param {number} angleB
 * @returns {number}
 */
function clockwiseDelta(angleA, angleB) {
  const delta = angleA - angleB;
  return delta >= 0 ? delta : delta + Math.PI * 2;
}

/**
 * @typedef {import("../types.js").Point} Point
 * @typedef {import("../types.js").Polygon} Polygon
 */

// Caclulates the convex hull of a set of points.
// See https://en.wikibooks.org/wiki/Algorithm_Implementation/Geometry/Convex_hull/Monotone_chain#JavaScript
/**
 * @param {Point[]} points
 * @returns {Polygon | null}
 */
function polygonHull(points) {
  if (points.length < 3) {
    return null;
  }

  const pointsCopy = points
    .slice()
    .sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));

  let lower = [];
  for (let i = 0; i < pointsCopy.length; i++) {
    while (
      lower.length >= 2 &&
      cross(lower[lower.length - 2], lower[lower.length - 1], pointsCopy[i]) <=
        0
    ) {
      lower.pop();
    }
    lower.push(pointsCopy[i]);
  }

  let upper = [];
  for (let i = pointsCopy.length - 1; i >= 0; i--) {
    while (
      upper.length >= 2 &&
      cross(upper[upper.length - 2], upper[upper.length - 1], pointsCopy[i]) <=
        0
    ) {
      upper.pop();
    }
    upper.push(pointsCopy[i]);
  }

  upper.pop();
  lower.pop();

  return lower.concat(upper);
}

/**
 * @typedef {import("../types.js").Polygon} Polygon
 */

// Calculates the length of a polygon's perimeter. See https://github.com/d3/d3-polygon/blob/master/src/length.js
/**
 * @param {Polygon} vertices
 * @returns {number}
 */
function polygonLength(vertices) {
  if (vertices.length === 0) {
    return 0;
  }

  let i = -1,
    n = vertices.length,
    b = vertices[n - 1],
    xa,
    ya,
    xb = b[0],
    yb = b[1],
    perimeter = 0;

  while (++i < n) {
    xa = xb;
    ya = yb;
    b = vertices[i];
    xb = b[0];
    yb = b[1];
    xa -= xb;
    ya -= yb;
    perimeter += Math.sqrt(xa * xa + ya * ya);
  }

  return perimeter;
}

/**
 * @typedef {import("../types.js").Point} Point
 * @typedef {import("../types.js").Line} Line
 * @typedef {import("../types.js").Polygon} Polygon
 */

// Returns an interpolator function given a polygon of vertices [a, b, ..., n].
// The returned interpolator function takes a single argument t,
// where t is a number in [0, 1];
// a value of 0 returns a, while a value of 1 returns n.
// Intermediate values interpolate from a to n along the polygon's perimeter.
// You can pass an optional boolean, which defaults to true, indicating whether to <i>clamp</i> t to the range [0, 1].
// When clamp is false, the interpolator applies modular arithmetic to t.
// If t is less than 0, the interpolator wraps around the polygon's perimeter in reverse.
// If t is greater than 1, the interpolator continues forward along the perimeter.

/**
 * @param {Polygon} polygon
 * @param {boolean} [clamp=true]
 * @returns {(t: number) => Point}
 */
function polygonInterpolate(polygon, clamp = true) {
  const closed = polygonClose(polygon);
  const length = polygonLength(closed);

  /** @type {[Point, number, number][]} */
  const segments = [];
  for (let i = 0; i < closed.length - 1; i++) {
    const p0 = closed[i];
    const p1 = closed[i + 1];
    /** @type {Line} */
    const l = [p0, p1];
    segments.push([p0, lineLength(l), lineAngle(l)]);
  }

  return (t) => {
    if (clamp) {
      if (t <= 0) return polygon[0];
      if (t >= 1) return closed[closed.length - 1];
    }

    const mod = t % 1;
    const target = length * (mod < 0 ? 1 + mod : mod);
    let track = 0;

    for (const [point, length, angle] of segments) {
      const delta = target - (track += length);

      if (delta < 0) {
        return pointTranslate(point, angle, length + delta);
      }
    }

    return closed[closed.length - 1];
  };
}

/**
 * @typedef {import("../types.js").Point} Point
 * @typedef {import("../types.js").Polygon} Polygon
 */

// Calculates the arithmetic mean of a polygon's vertices.
/**
 * @param {Polygon} vertices
 * @returns {Point | []}
 */
function polygonMean(vertices) {
  if (!vertices.length) return [];

  let x = 0,
    y = 0,
    l = vertices.length;

  for (let i = 0; i < l; i++) {
    const v = vertices[i];

    x += v[0];
    y += v[1];
  }

  return [x / l, y / l];
}

/**
 * @typedef {import("../types.js").Point} Point
 * @typedef {import("../types.js").Polygon} Polygon
 */

// Scales a polygon by a scale factor (where 1 is the original size) from an origin point.
// The returned polygon's area is equal to the input polygon's area multiplied by the scaleFactor.
// The origin defaults to the polygon's centroid.
/**
 * @param {Polygon} polygon
 * @param {number} scale
 * @param {Point} [origin]
 * @returns {Polygon}
 */
function polygonScaleArea(polygon, scale, origin) {
  if (!origin) {
    origin = polygonCentroid(polygon);
  }

  let p = [];

  for (let i = 0, l = polygon.length; i < l; i++) {
    const v = polygon[i],
      d = lineLength([origin, v]),
      a = lineAngle([origin, v]);

    p[i] = pointTranslate(origin, a, d * Math.sqrt(scale));
  }

  return p;
}

/**
 * @typedef {import("../types.js").Polygon} Polygon
 */

// Translates a polygon by an angle in degrees and distance.
/**
 * @param {Polygon} polygon
 * @param {number} angle
 * @param {number} distance
 * @returns {Polygon}
 */
function polygonTranslate(polygon, angle, distance) {
  let p = [];

  for (let i = 0, l = polygon.length; i < l; i++) {
    p[i] = pointTranslate(polygon[i], angle, distance);
  }

  return p;
}

/**
 * @typedef {import("../types.js").Point} Point
 * @typedef {import("../types.js").Polygon} Polygon
 */

// Returns a random polygon according to the specific number of sides, area, and centroid.
// Based on an algorithm by Pavel Valtr and an implementation by Maneesh Agrawala: https://observablehq.com/@magrawala/random-convex-polygon
/**
 * @param {number} [sides=3]
 * @param {number} [area=100]
 * @param {Point} [centroid=[0, 0]]
 * @returns {Polygon}
 */
function polygonRandom(sides = 3, area = 100, centroid = [0, 0]) {
  const r = Math.sqrt(area / Math.PI),
    xs = Array.from({ length: sides }, () => 2 * r * Math.random()),
    ys = Array.from({ length: sides }, () => 2 * r * Math.random());

  xs.sort((a, b) => a - b);
  ys.sort((a, b) => a - b);

  const vecXS = chain(xs, xs[0], xs[xs.length - 1]),
    vecYS = chain(ys, ys[0], ys[ys.length - 1]);

  shuffle(vecYS);

  //Make polygon coordinates from the vecs by laying them out end to end
  /** @type {Polygon} */
  let polygon = [],
    x = 0,
    y = 0;

  // Zip the vector arrays together
  // Then, sort the vectors by angle, in a counter clockwise fashion.
  // a and b are tuples representing vectors. Compute angle for each vector and compare them.
  vecXS
    .map((d, i) => [d, vecYS[i]])
    .sort((a, b) => Math.atan2(b[1], b[0]) - Math.atan2(a[1], a[0]))
    .forEach((vec) => {
      x += vec[0] * 1;
      y += vec[1] * 1;
      polygon.push([x, y]);
    });

  // Scale and translate
  const c = polygonCentroid(polygon);

  return polygonTranslate(
    polygonScaleArea(polygon, area / polygonArea(polygon)),
    lineAngle([c, centroid]),
    lineLength([c, centroid]),
  );
}

/**
 * @param {number[]} values
 * @param {number} min
 * @param {number} max
 * @returns {number[]}
 */
function chain(values, min, max) {
  let lastMin = min,
    lastMax = min;
  /** @type {number[]} */
  const output = [];

  for (let i = 1; i < values.length - 1; i++) {
    const val = values[i];

    if (Math.random() > 0.5) {
      output.push(val - lastMin);
      lastMin = val;
    } else {
      output.push(lastMax - val);
      lastMax = val;
    }
  }

  output.push(max - lastMin);
  output.push(lastMax - max);

  return output;
}

/**
 * @param {number[]} array
 * @returns {void}
 */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/**
 * @typedef {import("../types.js").Polygon} Polygon
 */

// Reflects a polygon over its vertical midline.
// Pass an optional reflectFactor between 0 and 1,
// where 1 indicates a full reflection,
// 0 leaves the polygon unchanged,
// and 0.5 collapses the polygon on its vertical midline.
/**
 * @param {Polygon} polygon
 * @param {number} [reflectFactor=1]
 * @returns {Polygon}
 */
function polygonReflectX(polygon, reflectFactor = 1) {
  const bounds = polygonBounds(polygon);
  if (!bounds) {
    return polygon.slice();
  }

  const [[min, _], [max, __]] = bounds;
  const p = [];

  for (let i = 0, l = polygon.length; i < l; i++) {
    const [x, y] = polygon[i];
    const r = [min + max - x, y];

    if (reflectFactor === 0) {
      p[i] = [x, y];
    } else if (reflectFactor === 1) {
      p[i] = r;
    } else {
      const t = lineInterpolate([[x, y], r]);
      p[i] = t(Math.max(Math.min(reflectFactor, 1), 0));
    }
  }

  return p;
}

/**
 * @typedef {import("../types.js").Polygon} Polygon
 */

// Reflects a polygon over its horizontal midline.
// Pass an optional reflectFactor between 0 and 1,
// where 1 indicates a full reflection,
// 0 leaves the polygon unchanged,
// and 0.5 collapses the polygon on its horizontal midline.
/**
 * @param {Polygon} polygon
 * @param {number} [reflectFactor=1]
 * @returns {Polygon}
 */
function polygonReflectY(polygon, reflectFactor = 1) {
  const bounds = polygonBounds(polygon);
  if (!bounds) {
    return polygon.slice();
  }

  const [[_, min], [__, max]] = bounds;
  const p = [];

  for (let i = 0, l = polygon.length; i < l; i++) {
    const [x, y] = polygon[i];
    const r = [x, min + max - y];

    if (reflectFactor === 0) {
      p[i] = [x, y];
    } else if (reflectFactor === 1) {
      p[i] = r;
    } else {
      const t = lineInterpolate([[x, y], r]);
      p[i] = t(Math.max(Math.min(reflectFactor, 1), 0));
    }
  }

  return p;
}

/**
 * @typedef {import("../types.js").Point} Point
 * @typedef {import("../types.js").Polygon} Polygon
 */

// Returns the vertices of a regular polygon of the specified number of sides, area, and center coordinates.
/**
 * @param {number} [sides=3]
 * @param {number} [area=100]
 * @param {Point} [center]
 * @returns {Polygon}
 */
function polygonRegular(sides = 3, area = 100, center) {
  let polygon = [],
    point = [0, 0],
    sum = [0, 0],
    angle = 0;

  for (let i = 0; i < sides; i++) {
    polygon[i] = point;
    sum[0] += point[0];
    sum[1] += point[1];
    point = pointTranslate(
      point,
      angle,
      Math.sqrt((4 * area * Math.tan(Math.PI / sides)) / sides),
    ); // https://web.archive.org/web/20180404142713/http://keisan.casio.com/exec/system/1355985985
    angle -= 360 / sides;
  }

  if (center) {
    const line = [[sum[0] / sides, sum[1] / sides], center];
    polygon = polygonTranslate(polygon, lineAngle(line), lineLength(line));
  }

  return polygon;
}

/**
 * @typedef {import("../types.js").Point} Point
 * @typedef {import("../types.js").Polygon} Polygon
 */

// Rotates a polygon by an angle in degrees around an origin.
/**
 * @param {Polygon} polygon
 * @param {number} angle
 * @param {Point} [origin]
 * @returns {Polygon}
 */
function polygonRotate(polygon, angle, origin) {
  let p = [];

  for (let i = 0, l = polygon.length; i < l; i++) {
    p[i] = pointRotate(polygon[i], angle, origin);
  }

  return p;
}

/**
 * @typedef {import("../types.js").Point} Point
 * @typedef {import("../types.js").Polygon} Polygon
 */

// Scales a polygon by a scale factor (where 1 is the original size) from an origin point.
// The returned polygon's area is equal to the input polygon's area multiplied by the square of the scaleFactor.
// The origin defaults to the polygon's centroid.
/**
 * @param {Polygon} polygon
 * @param {number} scale
 * @param {Point} [origin]
 * @returns {Polygon}
 */
function polygonScale(polygon, scale, origin) {
  if (!origin) {
    origin = polygonCentroid(polygon);
  }

  let p = [];

  for (let i = 0, l = polygon.length; i < l; i++) {
    const v = polygon[i],
      d = lineLength([origin, v]),
      a = lineAngle([origin, v]);

    p[i] = pointTranslate(origin, a, d * scale);
  }

  return p;
}

/**
 * @typedef {import("../types.js").Point} Point
 * @typedef {import("../types.js").Polygon} Polygon
 */

// Scales a polygon's x-coordinates by a scale factor (where 1 is the original size) from an origin point.
// The origin defaults to the polygon's centroid.
/**
 * @param {Polygon} polygon
 * @param {number} scale
 * @param {Point} [origin]
 * @returns {Polygon}
 */
function polygonScaleX(polygon, scale, origin) {
  if (!origin) {
    origin = polygonCentroid(polygon);
  }

  let p = [];

  for (let i = 0, l = polygon.length; i < l; i++) {
    const v = polygon[i],
      d = lineLength([origin, v]),
      a = lineAngle([origin, v]),
      t = pointTranslate(origin, a, d * scale);

    p[i] = [t[0], v[1]];
  }

  return p;
}

/**
 * @typedef {import("../types.js").Point} Point
 * @typedef {import("../types.js").Polygon} Polygon
 */

// Scales a polygon's y-coordinates by a scale factor (where 1 is the original size) from an origin point.
// The origin defaults to the polygon's centroid.
/**
 * @param {Polygon} polygon
 * @param {number} scale
 * @param {Point} [origin]
 * @returns {Polygon}
 */
function polygonScaleY(polygon, scale, origin) {
  if (!origin) {
    origin = polygonCentroid(polygon);
  }

  let p = [];

  for (let i = 0, l = polygon.length; i < l; i++) {
    const v = polygon[i],
      d = lineLength([origin, v]),
      a = lineAngle([origin, v]),
      t = pointTranslate(origin, a, d * scale);

    p[i] = [v[0], t[1]];
  }

  return p;
}

/**
 * @typedef {import("../types.js").Polygon} Polygon
 */

// Returns a polygon in the specified winding order.
// If order is passed as a strings of "cw" or "clockwise", returns a polygon with a clockwise winding order.
// Otherwise, returns a polygon with a counter-clockwise winding order.
/**
 * @param {Polygon} polygon
 * @param {"cw" | "clockwise" | "ccw" | "counterclockwise"} [order="ccw"]
 * @returns {Polygon | null}
 */
function polygonWind(polygon, order = "ccw") {
  if (polygon.length < 3) return null;

  const reversed = polygon.slice().reverse();
  const isClockwise = polygonArea(polygon, true) < 0;

  if (order === "cw" || order === "clockwise") {
    return isClockwise ? polygon : reversed;
  } else {
    return isClockwise ? reversed : polygon;
  }
}

/**
 * @typedef {import("../types.js").Point} Point
 * @typedef {import("../types.js").Line} Line
 */

// Returns a point where line a intersects line b.
// If the two lines do not intersect, returns null.
/**
 * @param {Line} a
 * @param {Line} b
 * @returns {Point | null}
 */
function lineIntersection(a, b) {
  const [a0x, a0y] = a[0],
    [a1x, a1y] = a[1];
  const [b0x, b0y] = b[0],
    [b1x, b1y] = b[1];

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
  const dxA = a1x - a0x,
    dyA = a1y - a0y;
  const dxB = b1x - b0x,
    dyB = b1y - b0y;

  const denom = dyB * dxA - dxB * dyA;
  if (denom === 0) return null; // Parallel lines

  const dy = a0y - b0y,
    dx = a0x - b0x;
  const numerA = dxB * dy - dyB * dx;
  const numerB = dxA * dy - dyA * dx;
  const quotA = numerA / denom,
    quotB = numerB / denom;

  return quotA >= 0 && quotA <= 1 && quotB >= 0 && quotB <= 1
    ? [a0x + quotA * dxA, a0y + quotA * dyA]
    : null;
}

/**
 * @typedef {import("../types.js").Point} Point
 * @typedef {import("../types.js").Line} Line
 * @typedef {import("../types.js").Polygon} Polygon
 */

// Returns an array of points where a line intersects a polygon.
// If the line does not intersect the polygon, returns null.
/**
 * @param {Line} line
 * @param {Polygon} polygon
 * @returns {Point[] | null}
 */
function lineIntersectsPolygon(line, polygon) {
  if (polygon.length < 2) {
    return null;
  }

  /** @type {Point[]} */
  const intersections = [];
  const closed = polygonClose(polygon);

  /**
   * @param {Point[]} arr
   * @param {Point} point
   * @returns {boolean}
   */
  const pointExists = (arr, point) => {
    return arr.some((p) => pointsEqual(p, point));
  };

  for (let i = 0, l = closed.length - 1; i < l; i++) {
    const v0 = closed[i],
      v1 = closed[i + 1];

    const intersection = lineIntersection(line, [v0, v1]);
    if (intersection && !pointExists(intersections, intersection)) {
      intersections.push(intersection);
    }
  }

  return intersections.length ? intersections : null;
}

/**
 * @typedef {import("../types.js").Point} Point
 * @typedef {import("../types.js").Line} Line
 */

// Returns the closest position on a line to a point
/**
 * @param {Line} line
 * @param {Point} point
 * @returns {Point}
 */
function pointToLine(line, point) {
  return lineInterpolate(line)(1 - segmentProject(point, line).t);
}

/**
 * @typedef {import("../types.js").Point} Point
 * @typedef {import("../types.js").Line} Line
 * @typedef {import("../types.js").Polygon} Polygon
 */

// Returns the closest position on a polygon's perimeter to a point
/**
 * @param {Polygon} polygon
 * @param {Point} point
 * @returns {Point | []}
 */
function pointToPolygon(polygon, point) {
  if (polygon.length === 1) return polygon[0];

  /** @type {Point | []} */
  let closestD = Infinity,
    closest = [];
  const closed = polygonClose(polygon);

  for (let i = 0, l = closed.length - 1; i < l; i++) {
    /** @type {Line} */
    const line = [closed[i], closed[i + 1]];
    const { t, dist2 } = segmentProject(point, line);
    if (dist2 < closestD) {
      closestD = dist2;
      closest = lineInterpolate(line)(1 - t);
    }
  }

  return closest;
}

/**
 * @typedef {import("../types.js").Polygon} Polygon
 */

// Determines whether a polygon is contained by another polygon.
// Polygons are represented as an array of vertices, each of which is an array of two numbers,
// where the first number represents its x-coordinate and the second its y-coordinate.
// Returns a boolean.
/**
 * @param {Polygon} polygonA
 * @param {Polygon} polygonB
 * @returns {boolean}
 */
function polygonInPolygon(polygonA, polygonB) {
  let inside = true;
  const closed = polygonClose(polygonA);

  for (let i = 0, l = closed.length - 1; i < l; i++) {
    const v0 = closed[i];

    // Points test
    if (!pointInPolygon(v0, polygonB)) {
      inside = false;
      break;
    }

    // Lines test
    if (lineIntersectsPolygon([v0, closed[i + 1]], polygonB)) {
      inside = false;
      break;
    }
  }

  return inside;
}

/**
 * @typedef {import("../types.js").Polygon} Polygon
 */

// Determines whether a polygon intersects but is not contained by another polygon.
// Polygons are represented as an array of vertices, each of which is an array of two numbers,
// where the first number represents its x-coordinate and the second its y-coordinate.
// Returns a boolean.
/**
 * @param {Polygon} polygonA
 * @param {Polygon} polygonB
 * @returns {boolean}
 */
function polygonIntersectsPolygon(polygonA, polygonB) {
  let intersects = false,
    onCount = 0;
  const closed = polygonClose(polygonA);

  for (let i = 0, l = closed.length - 1; i < l; i++) {
    const v0 = closed[i],
      v1 = closed[i + 1];

    if (lineIntersectsPolygon([v0, v1], polygonB)) {
      intersects = true;
      break;
    }

    if (pointOnPolygon(v0, polygonB)) {
      ++onCount;
    }

    if (onCount === 2) {
      intersects = true;
      break;
    }
  }

  return intersects;
}

// Returns the angle of reflection given an angle of incidence and a surface angle.
/**
 * @param {number} incidenceAngle
 * @param {number} surfaceAngle
 * @returns {number}
 */
function angleReflect(incidenceAngle, surfaceAngle) {
  return (surfaceAngle * 2 - (incidenceAngle % 360) + 360) % 360;
}

export { angleReflect, angleToDegrees, angleToRadians, lineAngle, lineInterpolate, lineIntersection, lineIntersectsPolygon, lineLength, lineMidpoint, lineRotate, lineTranslate, pointInPolygon, pointLeftofLine, pointOnLine, pointOnPolygon, pointRightofLine, pointRotate, pointToLine, pointToPolygon, pointTranslate, pointWithLine, pointsEqual, polygonArea, polygonBounds, polygonCentroid, polygonClose, polygonClosed, polygonDifference, polygonHull, polygonInPolygon, polygonInterpolate, polygonIntersection, polygonIntersectsPolygon, polygonLength, polygonMean, polygonRandom, polygonReflectX, polygonReflectY, polygonRegular, polygonRotate, polygonScale, polygonScaleArea, polygonScaleX, polygonScaleY, polygonTranslate, polygonUnion, polygonWind, polygonXor };

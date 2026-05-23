import { lineInterpolate } from "../lines/lineInterpolate.js";
import { pointInPolygon } from "../relationships/pointInPolygon.js";
import { pointOnPolygon } from "../relationships/pointOnPolygon.js";
import { pointsEqual } from "../relationships/pointsEqual.js";
import { clamp01 } from "../utils/clamp.js";
import { EPSILON } from "../utils/constants.js";
import { isCollinear, pointKey } from "../utils/point.js";
import { directedSegmentKey, segmentKey } from "../utils/segment.js";
import {
  cross2,
  distanceSquared,
  dot,
  magnitude,
  midpoint,
  subtract,
} from "../utils/vector.js";
import { polygonArea } from "./polygonArea.js";
import { polygonClose, polygonClosed } from "./polygonClose.js";

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
export function polygonUnion(polygonA, polygonB) {
  return polygonBoolean("union", polygonA, polygonB);
}

/**
 * Returns the overlapping area shared by two polygons.
 *
 * @param {Polygon} polygonA
 * @param {Polygon} polygonB
 * @returns {Polygon | null}
 */
export function polygonIntersection(polygonA, polygonB) {
  return polygonBoolean("intersection", polygonA, polygonB);
}

/**
 * Returns the portion of <i>polygonA</i> that is outside <i>polygonB</i>.
 *
 * Holes are bridged into a single point array.
 *
 * @param {Polygon} polygonA
 * @param {Polygon} polygonB
 * @returns {Polygon | null}
 */
export function polygonDifference(polygonA, polygonB) {
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
export function polygonXor(polygonA, polygonB) {
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

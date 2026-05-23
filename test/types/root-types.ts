import {
  lineIntersection,
  pointToLine,
  polygonUnion,
  type Line,
  type Point,
  type Polygon,
} from "geometric";

const line: Line = [
  [0, 0],
  [10, 10],
];
const point: Point = [2, 4];
const polygonA: Polygon = [
  [0, 0],
  [2, 0],
  [2, 2],
  [0, 2],
];
const polygonB: Polygon = [
  [1, 1],
  [3, 1],
  [3, 3],
  [1, 3],
];

const intersection: Point | null = lineIntersection(line, [
  [0, 10],
  [10, 0],
]);
const nearest: Point = pointToLine(line, point);
const union: Polygon | null = polygonUnion(polygonA, polygonB);

const acceptedPoint: Point = nearest;
const acceptedIntersection: Point | null = intersection;
const acceptedUnion: Polygon | null = union;

void acceptedPoint;
void acceptedIntersection;
void acceptedUnion;

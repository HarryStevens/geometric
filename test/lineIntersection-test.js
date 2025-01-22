import { strict as assert } from "assert";
import geometric from "../build/geometric.js";

describe("lineIntersection", () => {
  it("returns the intersection point when lineA intersects lineB", () => {
    const lineA = [[10, 10], [40, 40]];
    const lineB = [[10, 40], [40, 10]];

    assert.deepEqual(geometric.lineIntersection(lineA, lineB), [25, 25]);
  });

  it("returns null when lineA and lineB have no bounding box overlap", () => {
    const lineA = [[0, 0], [10, 10]];
    const lineB = [[20, 20], [30, 30]];

    assert.equal(geometric.lineIntersection(lineA, lineB), null);
  });

  it("returns the shared endpoint if lineA and lineB share a point", () => {
    const lineA = [[0, 0], [20, 20]];
    const lineB = [[20, 20], [30, 30]];

    assert.deepEqual(geometric.lineIntersection(lineA, lineB), [20, 20]);
  });

  it("returns the point if lineA and lineB are collinear but overlap partially", () => {
    const lineA = [[0, 0], [20, 20]];
    const lineB = [[10, 10], [30, 30]];

    assert.deepEqual(geometric.lineIntersection(lineA, lineB), [20, 20]);
  });

  it("returns the first point if two of lineA's points lies on lineB", () => {
    const lineA = [[20, 20], [30, 30]];
    const lineB = [[0, 0], [40, 40]];

    assert.deepEqual(geometric.lineIntersection(lineA, lineB), [20, 20]);
  });

  it("returns the first point if lineA and lineB are coincident (completely overlapping)", () => {
    const lineA = [[0, 0], [40, 40]];
    const lineB = [[0, 0], [40, 40]];

    assert.deepEqual(geometric.lineIntersection(lineA, lineB), [0, 0]);
  });

  it("returns null if lineA and lineB are parallel but do not intersect", () => {
    const lineA = [[0, 0], [10, 10]];
    const lineB = [[0, 10], [10, 20]];

    assert.equal(geometric.lineIntersection(lineA, lineB), null);
  });

  it("returns null if lineA and lineB are collinear but do not overlap", () => {
    const lineA = [[0, 0], [10, 10]];
    const lineB = [[20, 20], [30, 30]];

    assert.equal(geometric.lineIntersection(lineA, lineB), null);
  });

  it("returns null if lineA and lineB do not intersect", () => {
    const lineA = [[0, 0], [10, 10]];
    const lineB = [[10, 0], [20, -10]];

    assert.equal(geometric.lineIntersection(lineA, lineB), null);
  });
});
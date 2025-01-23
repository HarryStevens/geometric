import { strict as assert } from "assert";
import * as geometric from "../build/geometric.js";
import type { Line, Polygon } from "../types/common";

describe("lineIntersectsPolygon", () => {
  it("returns intersection points when the line intersects the polygon", () => {
    const line: Line = [[0, 10], [60, 50]];
    const polygon: Polygon = [[10, 10], [10, 50], [50, 50], [50, 10]];

    assert.deepEqual(geometric.lineIntersectsPolygon(line, polygon), [
      [10, 16.666666666666664],
      [50, 43.333333333333336]
    ]);
  });

  it("returns null when the line does not intersect the polygon", () => {
    const line: Line = [[60, 60], [70, 70]];
    const polygon: Polygon = [[0, 0], [0, 50], [50, 50], [50, 0]];

    assert.equal(geometric.lineIntersectsPolygon(line, polygon), null);
  });

  it("handles a line tangent to the polygon", () => {
    const line: Line = [[0, 50], [60, 50]];
    const polygon: Polygon = [[10, 0], [10, 50], [50, 50], [50, 0]];

    assert.deepEqual(geometric.lineIntersectsPolygon(line, polygon), [
      [10, 50],
      [50, 50]
    ]);
  });

  it("returns null for a line completely inside the polygon", () => {
    const line: Line = [[10, 10], [40, 40]];
    const polygon: Polygon = [[0, 0], [0, 50], [50, 50], [50, 0]];

    assert.equal(geometric.lineIntersectsPolygon(line, polygon), null);
  });

  it("returns correct intersections for polygons with collinear edges", () => {
    const line: Line = [[0, 25], [100, 25]];
    const polygon: Polygon = [[0, 0], [0, 50], [50, 50], [50, 0], [0, 0]];

    assert.deepEqual(geometric.lineIntersectsPolygon(line, polygon), [
      [0, 25],
      [50, 25]
    ]);
  });

  it("returns null for a line completely outside the polygon's bounding box", () => {
    const line: Line = [[100, 100], [200, 200]];
    const polygon: Polygon = [[0, 0], [0, 50], [50, 50], [50, 0]];

    assert.equal(geometric.lineIntersectsPolygon(line, polygon), null);
  });

  it("handles degenerate polygons (single point)", () => {
    const line: Line = [[0, 0], [10, 10]];
    const polygon: Polygon = [[5, 5]];

    assert.equal(geometric.lineIntersectsPolygon(line, polygon), null);
  });

  it("returns intersections for a line crossing multiple edges", () => {
    const line: Line = [[-10, 25], [60, 25]];
    const polygon: Polygon = [[0, 0], [0, 50], [50, 50], [50, 0]];

    assert.deepEqual(geometric.lineIntersectsPolygon(line, polygon), [
      [0, 25],
      [50, 25]
    ]);
  });

  it("works with very large polygons", () => {
    const line: Line = [[0, 0], [100, 100]];
    const polygon: Polygon = geometric.polygonRegular(100, 1000, [50, 50]);

    assert.deepEqual(geometric.lineIntersectsPolygon(line, polygon), [
      [62.61981422601329, 62.61981422601329],
      [37.38018577398674, 37.38018577398674]
    ]);
  });
});

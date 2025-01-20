import { strict as assert } from "assert";
import geometric from "../build/geometric.js";
import type { Polygon } from "../types/common";

describe("polygonIntersectsPolygon", () => {
  it("determines whether two polygons intersect but neither contains the other", () => {
    const polygon: Polygon = [[0, 0], [2, 0], [2, 2], [0, 2]];
    assert.equal(geometric.polygonIntersectsPolygon([[.5, .5], [1.5, .5], [1.5, 1.5], [.5, 1.5]], polygon), false);
    assert.equal(geometric.polygonIntersectsPolygon([[.5, .5], [2.5, .5], [2.5, 2.5], [.5, 2.5]], polygon), true);
    assert.equal(geometric.polygonIntersectsPolygon([[3, 3], [3, 4], [4, 4]], polygon), false);

    // Test cases where lines overlap but no points are inside
    const polygonA: Polygon = [[5, 3], [10, 3], [10, 8], [5, 8]],
          polygonB: Polygon = [[4, 6], [8, 2], [11, 6]],
          polygonC: Polygon = [[4, 6], [11, 6], [11, 9], [4, 9]];
    assert.equal(geometric.polygonIntersectsPolygon(polygonA, polygonB), true);
    assert.equal(geometric.polygonIntersectsPolygon(polygonB, polygonA), true);
    assert.equal(geometric.polygonIntersectsPolygon(polygonA, polygonC), true);
    assert.equal(geometric.polygonIntersectsPolygon(polygonC, polygonA), true);
  });

  it("returns true if overlapping rectangles share two edges", () => {
    const a: Polygon = [[562.6875, 304.4375], [601.09375, 304.4375], [601.09375, 322.9375], [562.6875, 322.9375]],
          b: Polygon = [[562.6875, 298.4375], [601.09375, 298.4375], [601.09375, 316.9375], [562.6875, 316.9375]];
    assert.equal(geometric.polygonIntersectsPolygon(a, b), true);
  });

  it("detects intersections in special cases", () => {
    // One of the polygons just has two points. See https://github.com/HarryStevens/geometric/issues/13
    const a: Polygon = [[180, 140], [180, 205]],
          b: Polygon = [[160, 180], [170, 181.72], [180, 187.64], [185, 193.41]];
    assert.equal(geometric.polygonIntersectsPolygon(a, b), true);
  });

  it("returns false in open U configuration", () => {
    const a: Polygon = [[3, 3], [3, 4], [4, 4], [4, 3]],
          b: Polygon = [[1, 1], [1, 4], [2, 4], [2, 2], [5, 2], [5, 4], [6, 4], [6, 1]];
    assert.equal(geometric.polygonIntersectsPolygon(a, b), false);
  });

  it("does not alter polygonA if forced closed", () => {
    const openPolygon: Polygon = [[0, 0], [1, 0], [1, 1]],
          clonedBefore = openPolygon.slice();
    geometric.polygonIntersectsPolygon(openPolygon, [[10, 0], [11, 0], [11, 11]]);
    assert.deepEqual(clonedBefore, openPolygon);
  });
});

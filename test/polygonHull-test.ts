import { strict as assert } from "assert";
import * as geometric from "../build/geometric.js";
import type { Polygon } from "../types/common";

describe("polygonHull", () => {
  it("returns null if there are fewer than 3 input points", () => {
    assert.equal(geometric.polygonHull([]), null);
    assert.equal(geometric.polygonHull([[0, 1]]), null);
    assert.equal(geometric.polygonHull([[0, 1], [1, 2]]), null);
  });

  it("calculates the convex hull of a set of points", () => {
    const vertices: Polygon = [[0, 0], [0, 2], [2, 2], [2, 0], [1, 1]];
    const hull = geometric.polygonHull(vertices);

    if (hull) {
      assert.equal(hull.length, 4);
      assert.equal(hull[0][0], 0);
      assert.equal(hull[0][1], 0);
      assert.equal(hull[1][0], 2);
      assert.equal(hull[1][1], 0);
      assert.equal(hull[2][0], 2);
      assert.equal(hull[2][1], 2);
      assert.equal(hull[3][0], 0);
      assert.equal(hull[3][1], 2);
    } else {
      throw new Error("Hull should not be null for a valid polygon.");
    }
  });

  it("does not modify its input array", () => {
    const input: Polygon = [[0, 1], [1, 2], [0, 3]];
    const clone = input.slice();
    geometric.polygonHull(input);
    assert.deepEqual(input, clone);
  });
});

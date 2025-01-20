import { strict as assert } from "assert";
import geometric from "../build/geometric.js";
import type { Polygon } from "../types/common";

describe("polygonBounds", () => {
  it("returns null if the polygon has fewer than 3 points", () => {
    assert.equal(geometric.polygonBounds([]), null);
    assert.equal(geometric.polygonBounds([[0, 1]]), null);
    assert.equal(geometric.polygonBounds([[0, 1], [1, 2]]), null);
    assert.deepEqual(geometric.polygonBounds([[0, 1], [1, 2], [0, 3]]), [[0, 1], [1, 3]]);
  });

  it("calculates the bounds of a polygon", () => {
    const polygon: Polygon = [[110, 40], [210, 10], [310, 40], [360, 140], [310, 240], [210, 270], [110, 240], [60, 140]];
    const bounds = geometric.polygonBounds(polygon);

    if (bounds) {
      assert.equal(bounds[0][0], 60);
      assert.equal(bounds[0][1], 10);
      assert.equal(bounds[1][0], 360);
      assert.equal(bounds[1][1], 270);
    } else {
      throw new Error("Bounds should not be null for a valid polygon.");
    }
  });

  it("ignores invalid values in the polygon", () => {
    const polygonWithInvalidValues: Polygon = [
      [Number.NaN, 5],
      [0, 1],
      [1, 2],
      [0, 3],
    ];
    const polygonWithInfinity: Polygon = [
      [5, Infinity],
      [0, 1],
      [1, 2],
      [0, 3],
    ];

    assert.deepEqual(geometric.polygonBounds(polygonWithInvalidValues), [[0, 1], [1, 3]]);
    assert.deepEqual(geometric.polygonBounds(polygonWithInfinity), [[0, 1], [1, 3]]);
  });
});

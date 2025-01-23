import { strict as assert } from "assert";
import * as geometric from "../build/geometric.js";
import type { Polygon } from "../types/common";

describe("pointInPolygon", () => {
  it("determines whether a point is in a polygon", () => {
    const polygon: Polygon = [[0, 0], [2, 0], [2, 2], [0, 2]];
    assert.equal(geometric.pointInPolygon([1, 1], polygon), true);
    assert.equal(geometric.pointInPolygon([3, 3], polygon), false);
  });
});

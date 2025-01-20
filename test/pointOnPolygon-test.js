import { strict as assert } from "assert";
import geometric from "../build/geometric.js";

const polygon = [[10, 10], [50, 10], [50, 50], [10, 50]];

describe("pointOnPolygon", () => {
  it("determines whether a point is located on one of the edges of a polygon", () => {
    assert.equal(geometric.pointOnPolygon([30, 10], polygon), true);
    assert.equal(geometric.pointOnPolygon([50, 30], polygon), true);
    assert.equal(geometric.pointOnPolygon([30, 50], polygon), true);
    assert.equal(geometric.pointOnPolygon([10, 30], polygon), true);
    assert.equal(geometric.pointOnPolygon([30, 30], polygon), false);
    assert.equal(geometric.pointOnPolygon([30, 70], polygon), false);
  });
});

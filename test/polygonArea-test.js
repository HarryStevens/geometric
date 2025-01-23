import { strict as assert } from "assert";
import * as geometric from "../build/geometric.js";

describe("polygonArea", () => {
  it("calculates the area of a polygon", () => {
    assert.equal(geometric.polygonArea([[0, 0], [1, 0], [1, 1], [0, 1]]), 1);
    assert.equal(geometric.polygonArea([[0, 0], [2, 0], [2, 2], [0, 2]]), 4);
    assert.equal(geometric.polygonArea([[0, 0], [3, 0], [3, 3], [0, 3]]), 9);
    assert.equal(geometric.polygonArea([[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]), 1);
    assert.equal(geometric.polygonArea([[0, 0], [2, 0], [2, 2], [0, 2], [0, 0]]), 4);
    assert.equal(geometric.polygonArea([[0, 0], [3, 0], [3, 3], [0, 3], [0, 0]]), 9);
  });

  it("returns a negative area if the polygon's winding order is counter-clockwise and signed is set to true", () => {
    const p = [[119, 87], [61, 150], [131, 197], [206, 135]];
    assert.equal(geometric.polygonArea(p, true), -8065);
    assert.equal(geometric.polygonArea(p, false), 8065);
    assert.equal(geometric.polygonArea(p), 8065);
  });
});

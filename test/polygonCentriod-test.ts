import { strict as assert } from "assert";
import geometric from "../build/geometric.js";

describe("polygonCentroid", () => {
  it("calculates the weighted centroid of a polygon", () => {
    const p0 = geometric.polygonCentroid([[0, 0], [1, 0], [1, 1], [0, 1]]);
    const p1 = geometric.polygonCentroid([[0, 0], [2, 0], [2, 2], [0, 2]]);
    const p2 = geometric.polygonCentroid([[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]);
    const p3 = geometric.polygonCentroid([[0, 0], [2, 0], [2, 2], [0, 2], [0, 0]]);
    
    assert.equal(p0[0], 0.5);
    assert.equal(p0[1], 0.5);
    assert.equal(p1[0], 1);
    assert.equal(p1[1], 1);
    assert.equal(p2[0], 0.5);
    assert.equal(p2[1], 0.5);
    assert.equal(p3[0], 1);
    assert.equal(p3[1], 1);
  });
});

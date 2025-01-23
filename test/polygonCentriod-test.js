import { strict as assert } from "assert";
import * as geometric from "../build/geometric.js";

describe("polygonCentroid", () => {
  it("calculates the weighted centroid of a polygon", () => {
    assert.deepEqual(geometric.polygonCentroid([[0, 0], [1, 0], [1, 1], [0, 1]]), [0.5, 0.5]);
    assert.deepEqual(geometric.polygonCentroid([[0, 0], [2, 0], [2, 2], [0, 2]]), [1, 1])
    assert.deepEqual(geometric.polygonCentroid([[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]), [0.5, 0.5]);
    assert.deepEqual(geometric.polygonCentroid([[0, 0], [2, 0], [2, 2], [0, 2], [0, 0]]), [1, 1]);

    assert.deepEqual(geometric.polygonCentroid([]), [])
    assert.deepEqual(geometric.polygonCentroid([[10, 10]]), [10, 10])
    assert.deepEqual(geometric.polygonCentroid([[10, 10], [20, 20]]), [15, 15])
  });
});

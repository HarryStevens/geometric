import { strict as assert } from "assert";
import geometric from "../build/geometric.js";

describe("polygonMean", () => {
  it("calculates the arithmetic mean of a polygon's vertices", () => {
    const mc0 = geometric.polygonMean([[0, 0], [1, 0], [1, 1], [0, 1]]);
    const mc1 = geometric.polygonMean([[0, 0], [2, 0], [2, 2], [0, 2]]);
    assert.equal(mc0[0], 0.5);
    assert.equal(mc0[1], 0.5);
    assert.equal(mc1[0], 1);
    assert.equal(mc1[1], 1);
  });
});

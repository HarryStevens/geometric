import { strict as assert } from "assert";
import * as geometric from "../build/geometric.js";

describe("pointsEqual", () => {
  it("determines whether two points are equal within an epsilon tolerance", () => {
    assert.equal(geometric.pointsEqual([1, 2], [1, 2]), true);
    assert.equal(
      geometric.pointsEqual([1, 2], [1.0000000001, 2.0000000001]),
      true,
    );
    assert.equal(geometric.pointsEqual([1, 2], [1.001, 2.001]), false);
    assert.equal(geometric.pointsEqual([1, 2], [1.001, 2.001], 0.01), true);
  });
});

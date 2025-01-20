import { strict as assert } from "assert";
import geometric from "../build/geometric.js";

describe("pointRotate", () => {
  it("rotates a point by an angle in degrees around an origin", () => {
    assert.equal(Math.round(geometric.pointRotate([1, 1], 90)[0]), -1);
    assert.equal(Math.round(geometric.pointRotate([1, 1], 90)[1]), 1);
    assert.equal(Math.round(geometric.pointRotate([1, 1], 180)[0]), -1);
    assert.equal(Math.round(geometric.pointRotate([1, 1], 180)[1]), -1);
    assert.equal(Math.round(geometric.pointRotate([1, 1], 180, [0, 0])[0]), -1);
    assert.equal(Math.round(geometric.pointRotate([1, 1], 180, [0, 0])[1]), -1);
    assert.equal(Math.round(geometric.pointRotate([1, 1], 90, [2, 2])[0]), 3);
    assert.equal(Math.round(geometric.pointRotate([1, 1], 90, [2, 2])[1]), 1);
    assert.equal(Math.round(geometric.pointRotate([1, 1], 180, [2, 2])[0]), 3);
    assert.equal(Math.round(geometric.pointRotate([1, 1], 180, [2, 2])[1]), 3);
  });

  it("returns the same point if the second two arguments are not passed", () => {
    assert.deepEqual(geometric.pointRotate([1, 1]), [1, 1]);
  });
});

import { strict as assert } from "assert";
import * as geometric from "../build/geometric.js";

describe("angleToRadians", () => {
  it("converts an angle from degrees to radians", () => {
    assert.equal(geometric.angleToRadians(180).toFixed(3), Math.PI.toFixed(3));
    assert.equal(geometric.angleToRadians(360).toFixed(3), (Math.PI * 2).toFixed(3));
    assert.equal(geometric.angleToRadians(0), 0);
  });
});

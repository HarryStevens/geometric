import { strict as assert } from "assert";
import * as geometric from "../build/geometric.js";

describe("angleReflect", () => {
  it("returns the angle of reflection", () => {
    assert.equal(geometric.angleReflect(0, 90), 180);
    assert.equal(geometric.angleReflect(0, 45), 90);
    assert.equal(geometric.angleReflect(180, 90), 0);
    assert.equal(geometric.angleReflect(180, 45), 270);
    assert.equal(geometric.angleReflect(45, 0), 315);
    assert.equal(geometric.angleReflect(45, 90), 135);
    assert.equal(geometric.angleReflect(45, 180), 315);
    assert.equal(geometric.angleReflect(45, 270), 135);
    assert.equal(geometric.angleReflect(45, 360), 315);
  });

  it("returns an angle in [0, 360)", () => {
    assert.equal(geometric.angleReflect(361, 0), 359);
    assert.equal(geometric.angleReflect(-720, 0), 0);
  });
});

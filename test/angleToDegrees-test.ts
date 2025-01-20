import { strict as assert } from "assert";
import geometric from "../build/geometric.js";

describe("angleToDegrees", () => {
  it("converts an angle from radians to degrees", () => {
    assert.equal(geometric.angleToDegrees(Math.PI), 180);
    assert.equal(geometric.angleToDegrees(Math.PI * 2), 360);
    assert.equal(geometric.angleToDegrees(0), 0);
  });
});

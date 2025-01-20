import { strict as assert } from "assert";
import geometric from "../build/geometric.js";

describe("lineAngle", () => {
  it("calculates the angle of a line, in degrees", () => {
    assert.equal(geometric.lineAngle([[0, 0], [0, 1]]), 90);
    assert.equal(geometric.lineAngle([[0, 0], [0, -1]]), -90);
    assert.equal(geometric.lineAngle([[0, 0], [1, 0]]), 0);
    assert.equal(geometric.lineAngle([[0, 0], [-1, 0]]), 180);
    assert.equal(geometric.lineAngle([[0, 0], [1, 1]]), 45);
    assert.equal(geometric.lineAngle([[0, 0], [-1, -1]]), -135);
  });
});

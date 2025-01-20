import { strict as assert } from "assert";
import geometric from "../build/geometric.js";

describe("lineLength", () => {
  it("calculates the length of a line segment", () => {
    assert.equal(geometric.lineLength([[0, 0], [0, 1]]), 1);
    assert.equal(geometric.lineLength([[0, 0], [0, -1]]), 1);
    assert.equal(geometric.lineLength([[1, 0], [1, 0]]), 0);
    assert.equal(geometric.lineLength([[1, 0], [-1, 0]]), 2);
  });
});

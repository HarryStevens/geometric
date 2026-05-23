import { strict as assert } from "assert";
import * as geometric from "../build/geometric.js";

describe("lineMidpoint", () => {
  it("calculates the midpoint of a line segment", () => {
    assert.equal(
      geometric.lineMidpoint([
        [0, 0],
        [0, 1],
      ])[0],
      0,
    );
    assert.equal(
      geometric.lineMidpoint([
        [0, 0],
        [0, 1],
      ])[1],
      0.5,
    );
    assert.equal(
      geometric.lineMidpoint([
        [0, 0],
        [0, -1],
      ])[0],
      0,
    );
    assert.equal(
      geometric.lineMidpoint([
        [0, 0],
        [0, -1],
      ])[1],
      -0.5,
    );
    assert.equal(
      geometric.lineMidpoint([
        [1, 0],
        [1, 0],
      ])[0],
      1,
    );
    assert.equal(
      geometric.lineMidpoint([
        [1, 0],
        [1, 0],
      ])[1],
      0,
    );
    assert.equal(
      geometric.lineMidpoint([
        [1, 0],
        [-1, 0],
      ])[0],
      0,
    );
    assert.equal(
      geometric.lineMidpoint([
        [1, 0],
        [-1, 0],
      ])[1],
      0,
    );
  });
});

import { strict as assert } from "assert";
import * as geometric from "../build/geometric.js";

describe("polygonLength", () => {
  it("calculates the length of a polygon's perimeter", () => {
    assert.equal(
      geometric.polygonLength([
        [0, 0],
        [1, 0],
        [1, 1],
        [0, 1],
      ]),
      4,
    );
    assert.equal(
      geometric.polygonLength([
        [0, 0],
        [1, 0],
        [1, 1],
        [0, 1],
        [0, 0],
      ]),
      4,
    );
  });

  it("returns 0 if the polygon has 0 or 1 points", () => {
    assert.equal(geometric.polygonLength([]), 0);
    assert.equal(geometric.polygonLength([[0, 0]]), 0);
  });
});

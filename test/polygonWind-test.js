import { strict as assert } from "assert";
import * as geometric from "../build/geometric.js";

describe("polygonWind", () => {
  it("sets the winding order of a polygon", () => {
    const polygon = [
      [58, 58],
      [123, 27],
      [233, 86],
      [244, 159],
      [192, 250],
      [110, 278],
      [60, 237],
      [30, 159],
      [19, 101],
    ];
    const isCounterClockwise = geometric.polygonArea(polygon, true) > 0;

    const reversed = polygon.slice().reverse(),
      wound = geometric.polygonWind(polygon),
      ccw = geometric.polygonWind(polygon, "ccw"),
      cw = geometric.polygonWind(polygon, "cw"),
      clockwise = geometric.polygonWind(polygon, "clockwise");

    assert.equal(isCounterClockwise, true);
    assert.deepEqual(wound, polygon);
    assert.deepEqual(ccw, polygon);
    assert.deepEqual(cw, reversed);
    assert.deepEqual(clockwise, reversed);
  });

  it("returns null if the polygon has fewer than three points", () => {
    assert.equal(geometric.polygonWind([]), null);
    assert.equal(geometric.polygonWind([[0, 1]]), null);
    assert.equal(
      geometric.polygonWind([
        [0, 1],
        [1, 2],
      ]),
      null,
    );
  });
});

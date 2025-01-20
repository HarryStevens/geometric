import { strict as assert } from "assert";
import geometric from "../build/geometric.js";
import round from "./utils/roundArray.js";

describe("lineInterpolate", () => {
  it("returns points along a line", () => {
    const line = [[236, 0], [708, 190]];
    const interpolator = geometric.lineInterpolate(line);
    assert.deepEqual(round(interpolator(0), 1), line[0]);
    assert.deepEqual(round(interpolator(1), 1), line[1]);
    assert.deepEqual(round(interpolator(0.1), 1), [283.2, 19]);
    assert.deepEqual(round(interpolator(0.2), 1), [330.4, 38]);
    assert.deepEqual(round(interpolator(0.3), 1), [377.6, 57]);
    assert.deepEqual(round(interpolator(0.4), 1), [424.8, 76]);
    assert.deepEqual(round(interpolator(0.5), 1), [472, 95]);
    assert.deepEqual(round(interpolator(0.6), 1), [519.2, 114]);
    assert.deepEqual(round(interpolator(0.7), 1), [566.4, 133]);
    assert.deepEqual(round(interpolator(0.8), 1), [613.6, 152]);
    assert.deepEqual(round(interpolator(0.9), 1), [660.8, 171]);
  });

  it("returns points outside the line segment if clamp is false", () => {
    const line = [[236, 0], [708, 190]];
    const interpolator = geometric.lineInterpolate(line);
    assert.deepEqual(round(interpolator(-0.1), 1), [188.8, -19]);
    assert.deepEqual(round(interpolator(1.1), 1), [755.2, 209]);
  });

  it("returns points inside the line segment if clamp is true", () => {
    const line = [[236, 0], [708, 190]];
    const interpolator = geometric.lineInterpolate(line, true);
    assert.deepEqual(interpolator(-0.1), line[0]);
    assert.deepEqual(interpolator(1.1), line[1]);
  });
});

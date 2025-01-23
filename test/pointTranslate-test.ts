import { strict as assert } from "assert";
import assertApproximatelyEqual from "./utils/assertApproximatelyEqual.js";
import * as geometric from "../build/geometric.js";
import type { Point } from "../types/common";

describe("pointTranslate", () => {
  it("translates a point by an angle in degrees and distance", () => {
    assertApproximatelyEqual(geometric.pointTranslate([0, 0], 0, 1)[0], 1);
    assertApproximatelyEqual(geometric.pointTranslate([0, 0], 0, 1)[1], 0);

    assertApproximatelyEqual(geometric.pointTranslate([0, 0], 90, 1).map((d) => Math.round(d))[0], 0);
    assertApproximatelyEqual(geometric.pointTranslate([0, 0], 90, 1).map((d) => Math.round(d))[1], 1);

    assertApproximatelyEqual(geometric.pointTranslate([0, 0], 180, 1).map((d) => Math.round(d))[0], -1);
    assertApproximatelyEqual(geometric.pointTranslate([0, 0], 180, 1).map((d) => Math.round(d))[1], 0);

    assertApproximatelyEqual(geometric.pointTranslate([0, 0], 270, 1).map((d) => Math.round(d))[0], 0);
    assertApproximatelyEqual(geometric.pointTranslate([0, 0], 270, 1).map((d) => Math.round(d))[1], -1);
    
    assertApproximatelyEqual(geometric.pointTranslate([0, 0], 360, 1).map((d) => Math.round(d))[0], 1);
    assertApproximatelyEqual(geometric.pointTranslate([0, 0], 360, 1).map((d) => Math.round(d))[1], 0);
  });

  it("returns input point if only one argument is passed", () => {
    const point: Point = [Math.random(), Math.random()];
    assert.deepEqual(geometric.pointTranslate(point), point);
  });
});

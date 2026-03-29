import { strict as assert } from "assert";
import * as geometric from "../build/geometric.js";

describe("polygonScaleY", () => {
  it("scales a polygon's y-coordinates by a scale factor from an origin point.", () => {
    const polygon = [
      [738.5, 168.5],
      [838.5, 138.5],
      [938.5, 168.5],
      [988.5, 268.5],
      [938.5, 368.5],
      [838.5, 398.5],
      [738.5, 368.5],
      [688.5, 268.5],
    ];
    const polygonDoubled = geometric.polygonScaleY(polygon, 2);

    assert.equal(polygonDoubled[0][0], polygon[0][0]);
    assert.equal(Math.round(polygonDoubled[0][1]), 68);

    assert.equal(polygonDoubled[1][0], polygon[1][0]);
    assert.equal(polygonDoubled[1][1], 8.5);

    assert.equal(polygonDoubled[2][0], polygon[2][0]);
    assert.equal(polygonDoubled[2][1], 68.5);

    assert.equal(polygonDoubled[3][0], polygon[3][0]);
    assert.equal(polygonDoubled[3][1], 268.5);

    assert.equal(polygonDoubled[4][0], polygon[4][0]);
    assert.equal(polygonDoubled[4][1], 468.5);

    assert.equal(polygonDoubled[5][0], polygon[5][0]);
    assert.equal(polygonDoubled[5][1], 528.5);

    assert.equal(polygonDoubled[6][0], polygon[6][0]);
    assert.equal(polygonDoubled[6][1], 468.5);

    assert.equal(polygonDoubled[7][0], polygon[7][0]);
    assert.equal(Math.round(polygonDoubled[7][1]), 269);
  });
});

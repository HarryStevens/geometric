import { strict as assert } from "assert";
import * as geometric from "../build/geometric.js";

describe("polygonScale", () => {
  it("scales a polygon by a scale factor from an origin point", () => {
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
    const polygonDoubled = geometric.polygonScale(polygon, 2);

    assert.equal(polygonDoubled[0][0], 638.5);
    assert.equal(Math.round(polygonDoubled[0][1]), 68);

    assert.equal(polygonDoubled[1][0], 838.5);
    assert.equal(polygonDoubled[1][1], 8.5);

    assert.equal(polygonDoubled[2][0], 1038.5);
    assert.equal(polygonDoubled[2][1], 68.5);

    assert.equal(polygonDoubled[3][0], 1138.5);
    assert.equal(polygonDoubled[3][1], 268.5);

    assert.equal(polygonDoubled[4][0], 1038.5);
    assert.equal(polygonDoubled[4][1], 468.5);

    assert.equal(polygonDoubled[5][0], 838.5);
    assert.equal(polygonDoubled[5][1], 528.5);

    assert.equal(polygonDoubled[6][0], 638.5);
    assert.equal(polygonDoubled[6][1], 468.5);

    assert.equal(polygonDoubled[7][0], 538.5);
    assert.equal(Math.round(polygonDoubled[7][1]), 269);
  });

  it("defaults the scale factor to 1", () => {
    const polygon = [
      [0, 0],
      [10, 0],
      [10, 10],
      [0, 10],
    ];

    const scaled = geometric.polygonScale(polygon);

    scaled.forEach((point, index) => {
      assert.equal(geometric.pointsEqual(point, polygon[index]), true);
    });
  });
});

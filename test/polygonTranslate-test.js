import { strict as assert } from "assert";
import * as geometric from "../build/geometric.js";

describe("polygonTranslate", () => {
  it("translates a polygon by an angle in degrees and distance.", () => {
    const myPolygon = [
      [100, 100],
      [150, 100],
      [125, 125],
      [150, 150],
      [100, 150],
    ];
    const newPolygon = geometric.polygonTranslate(myPolygon, 90, 100);

    assert.equal(newPolygon[0][0], 100);
    assert.equal(newPolygon[0][1], 200);

    assert.equal(newPolygon[1][0], 150);
    assert.equal(newPolygon[1][1], 200);

    assert.equal(newPolygon[2][0], 125);
    assert.equal(newPolygon[2][1], 225);

    assert.equal(newPolygon[3][0], 150);
    assert.equal(newPolygon[3][1], 250);

    assert.equal(newPolygon[4][0], 100);
    assert.equal(newPolygon[4][1], 250);
  });
});

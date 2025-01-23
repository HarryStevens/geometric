import { strict as assert } from "assert";
import * as geometric from "../build/geometric.js";

describe("polygonRotate", () => {
  it("rotates a polygon by an angle in degrees around an origin", () => {
    const myPolygon = [[100, 100], [150, 100], [125, 125], [150, 150], [100, 150]];
    const myOrigin = [200, 200];

    const by45 = geometric.polygonRotate(myPolygon, 45, myOrigin);

    assert.equal(by45[0][0], 200);
    assert.equal(Math.round(by45[0][1]), 59);

    assert.equal(Math.round(by45[1][0]), 235);
    assert.equal(Math.round(by45[1][1]), 94);
    
    assert.equal(by45[2][0], 200);
    assert.equal(Math.round(by45[2][1]), 94);

    assert.equal(by45[3][0], 200);
    assert.equal(Math.round(by45[3][1]), 129);

    assert.equal(Math.round(by45[4][0]), 165);
    assert.equal(Math.round(by45[4][1]), 94);
  });
});

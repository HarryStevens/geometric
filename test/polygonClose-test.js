import { strict as assert } from "assert";
import * as geometric from "../build/geometric.js";

describe("polygonClose", () => {
  it("closes a polygon if not already closed", () => {
    const closedPolygon = [[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]];
    const openPolygon = [[0, 0], [1, 0], [1, 1], [0, 1]];

    assert.deepEqual(geometric.polygonClose(closedPolygon), closedPolygon);
    assert.deepEqual(geometric.polygonClose(openPolygon), [[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]);
    assert.deepEqual(openPolygon, openPolygon);
  });
});

describe("polygonClosed", () => {
  it("checks if a polygon is closed", () => {
    const closedPolygon = [[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]];
    const openPolygon = [[0, 0], [1, 0], [1, 1], [0, 1]];

    assert.strictEqual(geometric.polygonClosed(closedPolygon), true);
    assert.strictEqual(geometric.polygonClosed(openPolygon), false);
  });
});
  
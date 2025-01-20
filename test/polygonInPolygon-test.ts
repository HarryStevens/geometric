import { strict as assert } from "assert";
import geometric from "../build/geometric.js";
import type { Polygon } from "../types/common";

describe("polygonInPolygon", () => {
  it("determines whether a polygon is contained by another polygon", () => {
    const polygon: Polygon = [[0, 0], [2, 0], [2, 2], [0, 2]];
    assert.equal(geometric.polygonInPolygon([[0.5, 0.5], [1.5, 0.5], [1.5, 1.5], [0.5, 1.5]], polygon), true);
    assert.equal(geometric.polygonInPolygon([[0.5, 0.5], [2.5, 0.5], [1.5, 1.5], [0.5, 1.5]], polygon), false);
    assert.equal(geometric.polygonInPolygon([[3, 3], [3, 4], [4, 4]], polygon), false);
  });

  it("returns false if all of polygonA's vertices fall inside polygonB but one of its lines intersects polygonB", () => {
    const polygonA: Polygon = [[435, 223], [503, 223], [524, 158], [469, 118], [414, 158]];
    const polygonB: Polygon = [[388, 150], [458, 150], [458, 110], [478, 53], [486, 50], [488, 20], [490, 50], [498, 53], [518, 110], [518, 150], [588, 150], [588, 270], [388, 270], [388, 150]];
    assert.equal(geometric.polygonInPolygon(polygonA, polygonB), false);
  });

  it("does not alter polygonA if it is forced closed", () => {
    const openPolygon: Polygon = [[0, 0], [1, 0], [1, 1]];
    const clonedBefore = openPolygon.slice();
    geometric.polygonInPolygon(openPolygon, [[10, 0], [11, 0], [11, 11]]);
    assert.deepEqual(clonedBefore, openPolygon);
  });
});

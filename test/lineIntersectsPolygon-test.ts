import { strict as assert } from "assert";
import geometric from "../build/geometric.js";
import type { Line, Polygon } from "../types/common";

describe("lineIntersectsPolygon", () => {
  it("determines whether a line intersects a polygon", () => {
    const polygon: Polygon = [[5, 3], [10, 3], [10, 8], [5, 8]],
          lineA: Line = [[4, 6], [8, 2]],
          lineB: Line = [[4, 6], [11, 6]],
          lineC: Line = [[4, 9], [11, 9]];

    assert.equal(geometric.lineIntersectsPolygon(lineA, polygon), true);
    assert.equal(geometric.lineIntersectsPolygon(lineB, polygon), true);
    assert.equal(geometric.lineIntersectsPolygon(lineC, polygon), false);
  });

  it("returns true even if the line is only collinear with one of the polygon's segments", () => {
    const polygon: Polygon = [
            [388, 150], [458, 150], [458, 110], [478, 53], [486, 50], 
            [488, 20], [490, 50], [498, 53], [518, 110], [518, 150], 
            [588, 150], [588, 270], [388, 270]
          ],
          line: Line = [[98, 150], [878, 150]];

    assert.equal(geometric.lineIntersectsPolygon(line, polygon), true);
  });
});

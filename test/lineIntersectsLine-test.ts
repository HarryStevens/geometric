import { strict as assert } from "assert";
import geometric from "../build/geometric.js";
import type { Line } from "../types/common";

describe("lineIntersectsLine", () => {
  it("determines whether lineA intersects lineB", () => {
    const lineA: Line = [[1, 4], [3, 4]],
          lineB: Line = [[2, 1], [2, 7]],
          lineC: Line = [[1, 8], [3, 8]],
          lineD: Line = [[1, 8], [3, 8]],
          lineE: Line = [[1, 9], [3, 9]],
          lineF: Line = [[1, 2], [3, 4]],
          lineG: Line = [[0, 1], [2, 3]];

    // 1.
    assert.equal(geometric.lineIntersectsLine(lineA, lineB), true);
    // 2.
    assert.equal(geometric.lineIntersectsLine(lineA, lineC), false);
    // 3.
    assert.equal(geometric.lineIntersectsLine(lineB, lineC), false);
    // 4. Same lines
    assert.equal(geometric.lineIntersectsLine(lineC, lineD), true);
    // 5. Parallel lines not crossing
    assert.equal(geometric.lineIntersectsLine(lineE, lineD), false);
    // 6. Parallel lines overlapping
    assert.equal(geometric.lineIntersectsLine(lineF, lineG), true);
  });

  it("returns true if lineA and lineB share an endpoint", () => {
    const line1: Line = [
      [50.054358, 8.693184],
      [50.055604, 8.685873]
    ];
    const line2: Line = [
      [50.054228, 8.69338],
      [50.054358, 8.693184]
    ];

    // 7.
    assert.equal(geometric.lineIntersectsLine(line1, line2), true);
    // 8.
    assert.equal(geometric.lineIntersectsLine(line2, line1), true);
  });

  it("returns true if one of lineA and lineB points is on the other line", () => {
    const line1: Line = [
      [0, 0],
      [1, 0]
    ];
    const line2: Line = [
      [0.5, -1],
      [0.5, 0]
    ];

    // 9.
    assert.equal(geometric.lineIntersectsLine(line1, line2), true);
    // 10.
    assert.equal(geometric.lineIntersectsLine(line2, line1), true);
  });

  it("returns false if two segments are collinear but do not intersect", () => {
    const line1: Line = [[0, 0], [10, 0]];
    const line2: Line = [[0, 0], [11, 0]];
    const line3: Line = [[15, 0], [25, 0]];

    // 11.
    assert.equal(geometric.lineIntersectsLine(line1, line3), false);
    // 12.
    assert.equal(geometric.lineIntersectsLine(line2, line3), false);
  });
});

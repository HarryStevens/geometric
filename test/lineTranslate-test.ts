import { strict as assert } from "assert";
import * as geometric from "../build/geometric.js";
import type { Line } from "../types/common";

describe("lineTranslate", () => {
  it("translates a line by an angle in degrees and a distance", () => {
    const line: Line = [[-1, -1], [1, 1]];

    assert.deepEqual(geometric.lineTranslate(line), line);
    assert.deepEqual(geometric.lineTranslate(line, 0), line);
    assert.deepEqual(geometric.lineTranslate(line, 0, 0), line);

    assert.deepEqual(geometric.lineTranslate(line, 0, 1), [[0, -1], [2, 1]]);
    assert.deepEqual(geometric.lineTranslate(line, 0, -1), [[-2, -1], [0, 1]]);

    assert.deepEqual(round(geometric.lineTranslate(line, 90, 1)), [[-1, 0], [1, 2]]);
    assert.deepEqual(round(geometric.lineTranslate(line, 90, -1)), [[-1, -2], [1, 0]]);

    assert.deepEqual(round(geometric.lineTranslate(line, 180, 1)), [[-2, -1], [0, 1]]);
    assert.deepEqual(round(geometric.lineTranslate(line, 180, -1)), [[0, -1], [2, 1]]);

    assert.deepEqual(round(geometric.lineTranslate(line, 270, 1)), [[-1, -2], [1, 0]]);
    assert.deepEqual(round(geometric.lineTranslate(line, 270, -1)), [[-1, 0], [1, 2]]);

    assert.deepEqual(round(geometric.lineTranslate(line, 360, 1)), [[0, -1], [2, 1]]);
    assert.deepEqual(round(geometric.lineTranslate(line, 360, -1)), [[-2, -1], [0, 1]]);
  });
});

// Helper function to round a line's points to the nearest integer
function round(line: Line): Line {
  return line.map(([x, y]) => [Math.round(x), Math.round(y)]) as Line;
}

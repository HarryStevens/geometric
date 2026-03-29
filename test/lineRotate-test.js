import { strict as assert } from "assert";
import * as geometric from "../build/geometric.js";

describe("lineRotate", () => {
  it("rotates a line by an angle in degrees around an origin, where the origin defaults to the midpoint", () => {
    const line = [
      [-1, -1],
      [1, 1],
    ];
    const midpoint = geometric.lineMidpoint(line);

    assert.deepEqual(geometric.lineRotate(line, 0), line);
    assert.deepEqual(geometric.lineRotate(line, 0, midpoint), line);

    assert.deepEqual(round(geometric.lineRotate(line, 90)), [
      [1, -1],
      [-1, 1],
    ]);
    assert.deepEqual(round(geometric.lineRotate(line, 90, midpoint)), [
      [1, -1],
      [-1, 1],
    ]);
    assert.deepEqual(round(geometric.lineRotate(line, 90, line[0])), [
      [-1, -1],
      [-3, 1],
    ]);
    assert.deepEqual(round(geometric.lineRotate(line, 90, line[1])), [
      [3, -1],
      [1, 1],
    ]);

    assert.deepEqual(round(geometric.lineRotate(line, 180)), [
      [1, 1],
      [-1, -1],
    ]);
    assert.deepEqual(round(geometric.lineRotate(line, 180, midpoint)), [
      [1, 1],
      [-1, -1],
    ]);
    assert.deepEqual(round(geometric.lineRotate(line, 180, line[0])), [
      [-1, -1],
      [-3, -3],
    ]);
    assert.deepEqual(round(geometric.lineRotate(line, 180, line[1])), [
      [3, 3],
      [1, 1],
    ]);

    assert.deepEqual(round(geometric.lineRotate(line, 270)), [
      [-1, 1],
      [1, -1],
    ]);
    assert.deepEqual(round(geometric.lineRotate(line, 270, midpoint)), [
      [-1, 1],
      [1, -1],
    ]);
    assert.deepEqual(round(geometric.lineRotate(line, 270, line[0])), [
      [-1, -1],
      [1, -3],
    ]);
    assert.deepEqual(round(geometric.lineRotate(line, 270, line[1])), [
      [-1, 3],
      [1, 1],
    ]);

    assert.deepEqual(round(geometric.lineRotate(line, 360)), line);
    assert.deepEqual(round(geometric.lineRotate(line, 360, midpoint)), line);
    assert.deepEqual(round(geometric.lineRotate(line, 360, line[0])), line);
    assert.deepEqual(round(geometric.lineRotate(line, 360, line[1])), line);
  });
});

function round(line) {
  return line.map((d) => d.map(Math.round));
}

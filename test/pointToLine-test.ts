import { strict as assert } from "assert";
import * as geometric from "../build/geometric.js";
import type { Line, Point } from "../types/common";

describe("pointToLine", () => {
  it("returns the closest point on the line segment when the point is perpendicular to the segment", () => {
    const line: Line = [[0, 0], [10, 0]];
    const point: Point = [5, 5];
    assert.deepEqual(geometric.pointToLine(line, point), [5, 0]);
  });

  it("returns the closest point on the line segment when the point is on the segment", () => {
    const line: Line = [[0, 0], [10, 10]];
    const point: Point = [5, 0];
    assert.deepEqual(geometric.pointToLine(line, point), [2.5, 2.5]);
  });

  it("returns the closest endpoint when the point is outside the segment bounds", () => {
    const line: Line = [[0, 0], [10, 0]];
    const point: Point = [15, 5];
    assert.deepEqual(geometric.pointToLine(line, point), [10, 0]);
  });

  it("returns the start point when the segment is degenerate (a single point)", () => {
    const line: Line = [[0, 0], [0, 0]];
    const point: Point = [5, 5];
    assert.deepEqual(geometric.pointToLine(line, point), [0, 0]);
  });

  it("handles large coordinates correctly", () => {
    const line: Line = [[1e9, 1e9], [1e9 + 10, 1e9 + 10]];
    const point: Point = [1e9 + 5, 1e9];
    assert.deepEqual(geometric.pointToLine(line, point), [1e9 + 2.5, 1e9 + 2.5]);
  });

  it("handles negative coordinates correctly", () => {
    const line: Line = [[-10, -10], [-20, -20]];
    const point: Point = [-15, -5];
    assert.deepEqual(geometric.pointToLine(line, point), [-10, -10]);
  });

  it("returns the correct closest point when the line segment is diagonal", () => {
    const line: Line = [[0, 0], [10, 10]];
    const point: Point = [0, 10];
    assert.deepEqual(geometric.pointToLine(line, point), [5, 5]);
  });

  it("handles points exactly at the segment's start point", () => {
    const line: Line = [[0, 0], [10, 10]];
    const point: Point = [0, 0];
    assert.deepEqual(geometric.pointToLine(line, point), [0, 0]);
  });

  it("handles points exactly at the segment's end point", () => {
    const line: Line = [[0, 0], [10, 10]];
    const point: Point = [10, 10];
    assert.deepEqual(geometric.pointToLine(line, point), [10, 10]);
  });
});

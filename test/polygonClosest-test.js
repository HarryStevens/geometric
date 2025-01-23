import { strict as assert } from "assert";
import * as geometric from "../build/geometric.js";

describe("polygonClosest", () => {
  it("returns the closest point on the polygon when the point is outside the polygon", () => {
    const polygon = geometric.polygonRegular(8, 5000, [100, 100]);
    const point = [10, 10];
    assert.deepEqual(geometric.polygonClosest(polygon, point), [72.53289716330471, 72.53289716330475]);
  });

  it("returns the closest point on the polygon when the point is inside the polygon", () => {
    const polygon = geometric.polygonRegular(8, 5000, [100, 100]);
    const point = [90, 90];
    assert.deepEqual(geometric.polygonClosest(polygon, point), [72.53289716330474, 72.53289716330472]);
  });

  it("returns the exact point if the point lies on the polygon's perimeter", () => {
    const polygon = [[10, 10], [50, 10], [50, 50], [10, 50]];
    const point = [30, 10];
    assert.deepEqual(geometric.polygonClosest(polygon, point), [30, 10]);
  });

  it("handles polygons where the closest point is on a vertex", () => {
    const polygon = [[10, 10], [50, 10], [50, 50], [10, 50]];
    const point = [10, 10];
    assert.deepEqual(geometric.polygonClosest(polygon, point), [10, 10]);
  });

  it("handles degenerate polygons (single point)", () => {
    const polygon = [[0, 0]];
    const point = [5, 5];
    assert.deepEqual(geometric.polygonClosest(polygon, point), [0, 0]);
  });

  it("handles degenerate polygons (line segment)", () => {
    const polygon = [[10, 10], [30, 10]];
    const point = [20, 100];
    assert.deepEqual(geometric.polygonClosest(polygon, point), [20, 10]);
  });

  it("handles concave polygons correctly", () => {
    const polygon = [[0, 0], [100, 0], [100, 100], [50, 50], [0, 100]];
    const point = [120, 50];
    assert.deepEqual(geometric.polygonClosest(polygon, point), [100, 50]);
  });

  it("handles large coordinates correctly", () => {
    const polygon = [[1e9, 1e9], [1e9 + 10, 1e9], [1e9 + 10, 1e9 + 10], [1e9, 1e9 + 10]];
    const point = [1e9 + 5, 1e9 - 5];
    assert.deepEqual(geometric.polygonClosest(polygon, point), [1e9 + 5, 1e9]);
  });

  it("handles negative coordinates correctly", () => {
    const polygon = [[-10, -10], [-20, -10], [-20, -20], [-10, -20]];
    const point = [-15, -5];
    assert.deepEqual(geometric.polygonClosest(polygon, point), [-15, -10]);
  });


  it("handles polygons with many vertices", () => {
    const polygon = geometric.polygonRegular(100, 2000, [100, 100]);
    const point = [120, 50];
    assert.deepEqual(geometric.polygonClosest(polygon, point), [109.46275085086263, 76.61405335059523]);
  });
});

import assertApproximatelyEqual from "./utils/assertApproximatelyEqual.js";
import geometric from "../build/geometric.js";
import type { Line } from "../types/common";

describe("polygonInterpolate", () => {
  it("returns points along a polygon", () => {
    const precision = 5;

    for (let sides = 3; sides <= 12; sides++) {
      for (let area = 10; area <= 100; area += 10) {
        const polygon = geometric.polygonRegular(sides, area);
        const interpolator = geometric.polygonInterpolate(polygon);
        for (let t = 0; t <= 1; t += 1 / (sides * 2)) {
          const [ix, iy] = interpolator(t);
          const i = +(t * sides).toFixed(1);

          let vx, vy;
          if (Number.isInteger(i)) {
            [vx, vy] = polygon[i === sides ? 0 : i];
          } else {
            const line: Line = [polygon[Math.floor(i)], polygon[Math.ceil(i)] || polygon[0]];
            const midpoint = geometric.lineMidpoint(line);
            [vx, vy] = midpoint;
          }

          assertApproximatelyEqual(+ix.toFixed(precision), +vx.toFixed(precision));
          assertApproximatelyEqual(+iy.toFixed(precision), +vy.toFixed(precision));
        }
      }
    }
  });
});

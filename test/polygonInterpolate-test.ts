import { strict as assert } from "assert";
import assertApproximatelyEqual from "./utils/assertApproximatelyEqual.js";
import geometric from "../build/geometric.js";
import type { Line, Polygon } from "../types/common";

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

  it("clamps t to [0, 1] by default but allows unclamping", () => {
    const polygon: Polygon = [[109,101],[104,136],[96,195],[105,239],[157,403],[215,420],[335,412],[379,368],[402,340],[398,260],[383,194],[343,89],[109,101]];
    const interpolatorClamped = geometric.polygonInterpolate(polygon);
    const interpolatorUnclamped = geometric.polygonInterpolate(polygon, false);

    assert.deepEqual(interpolatorClamped(0), polygon[0]);
    assert.deepEqual(interpolatorClamped(-0.1), polygon[0]);
    assert.deepEqual(interpolatorClamped(-1), polygon[0]);
    assert.deepEqual(interpolatorClamped(1), polygon[polygon.length - 1]);
    assert.deepEqual(interpolatorClamped(1.1), polygon[polygon.length - 1]);
    assert.deepEqual(interpolatorClamped(2), polygon[polygon.length - 1]);

    assert.deepEqual(interpolatorUnclamped(0), polygon[0]);
    assert.deepEqual(interpolatorUnclamped(-0.1), [217.40469670189447, 95.44078478451823]);
    assert.deepEqual(interpolatorUnclamped(-1), polygon[0]);
    assert.deepEqual(interpolatorUnclamped(1), polygon[polygon.length - 1]);
    assert.deepEqual(interpolatorUnclamped(1.1), [98.73579046679185, 208.37497561542685]);
    assert.deepEqual(interpolatorUnclamped(2), polygon[polygon.length - 1]);
  });
});

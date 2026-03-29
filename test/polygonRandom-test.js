import assertApproximatelyEqual from "./utils/assertApproximatelyEqual.js";
import * as geometric from "../build/geometric.js";

describe("polygonRandom", () => {
  it("returns a random polygon with the expected number of vertices, area, and centroid", () => {
    for (let sides = 3; sides <= 12; sides++) {
      for (let x = 0; x <= 5; x++) {
        for (let y = 0; y <= 5; y++) {
          for (let area = 10; area <= 50; area += 10) {
            const polygon = geometric.polygonRandom(sides, area, [x, y]);

            assertApproximatelyEqual(polygon.length, sides);
            assertApproximatelyEqual(
              Math.round(geometric.polygonArea(polygon)),
              area,
            );

            const [cx, cy] = geometric.polygonCentroid(polygon);
            assertApproximatelyEqual(Math.round(cx), x);
            assertApproximatelyEqual(Math.round(cy), y);
          }
        }
      }
    }
  });
});

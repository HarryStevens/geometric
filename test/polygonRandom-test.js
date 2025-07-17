const tape = require("tape"),
      geometric = require("../");

tape("polygonRandom() returns a random polygon with the expected number of vertices, area, and centroid", (test) => {
  for (let sides = 3; sides <= 12; sides++){
    for (let x = 0; x <= 5; x++){
      for (let y = 0; y <= 5; y++){
        for (let area = 10; area <= 50; area += 10){
          const polygon = geometric.polygonRandom(sides, area, [x, y]);
          
          test.equal(polygon.length, sides);
          test.equal(Math.round(geometric.polygonArea(polygon)), area)

          const [cx, cy] = geometric.polygonCentroid(polygon);
          test.equal(Math.round(cx), x);
          test.equal(Math.round(cy), y);
        }
      }
    }
  }

  test.end();
});
const tape = require("tape"),
      geometric = require("../");

tape("polygonTranslate(polygon, angle, distance) translates a polygon by an angle in degrees and distance.", function(test) {
  const myPolygon = [[100, 100], [150, 100], [125, 125], [150, 150], [100, 150]];

  const newPolygon = geometric.polygonTranslate(myPolygon, 90, 100);

  test.equal(newPolygon[0][0], 100);
  test.equal(newPolygon[0][1], 200);

  test.equal(newPolygon[1][0], 150);
  test.equal(newPolygon[1][1], 200);
  
  test.equal(newPolygon[2][0], 125);
  test.equal(newPolygon[2][1], 225);

  test.equal(newPolygon[3][0], 150);
  test.equal(newPolygon[3][1], 250);

  test.equal(newPolygon[4][0], 100);
  test.equal(newPolygon[4][1], 250);

  test.end();
});
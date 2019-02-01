var tape = require("tape"),
    geometric = require("../");

tape("polygonRotate(polygon, angle, origin) rotates a polygon by an angle in degrees around an origin", function(test) {
  var myPolygon = [[100, 100], [150, 100], [125, 125], [150, 150], [100, 150]];
  var myOrigin = [200, 200];

  var by45 = geometric.polygonRotate(myPolygon, 45, myOrigin);

  test.equal(by45[0][0], 200);
  test.equal(Math.round(by45[0][1]), 59);

  test.equal(Math.round(by45[1][0]), 235);
  test.equal(Math.round(by45[1][1]), 94);
  
  test.equal(by45[2][0], 200);
  test.equal(Math.round(by45[2][1]), 94);

  test.equal(by45[3][0], 200);
  test.equal(Math.round(by45[3][1]), 129);

  test.equal(Math.round(by45[4][0]), 165);
  test.equal(Math.round(by45[4][1]), 94);

  test.end();
});
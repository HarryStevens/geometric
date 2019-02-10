var tape = require("tape"),
    geometric = require("../");

tape("polygonBounds(polygon) calculates the bounds a polygon", function(test) {
  var polygon = [[110, 40], [210, 10], [310, 40], [360, 140], [310, 240], [210, 270], [110, 240], [60, 140]];
  var bounds = geometric.polygonBounds(polygon);
  
  test.equal(bounds[0][0], 60);
  test.equal(bounds[0][1], 10);
  test.equal(bounds[1][0], 360);
  test.equal(bounds[1][1], 10);
  test.equal(bounds[2][0], 360);
  test.equal(bounds[2][1], 270);
  test.equal(bounds[3][0], 60);
  test.equal(bounds[3][1], 270);
  test.end();
});
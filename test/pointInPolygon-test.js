const tape = require("tape"),
      geometric = require("../");

tape("pointInPolygon(point, vertices) determines whether a point is in a polygon", function(test) {
  const polygon = [[0, 0], [2, 0], [2, 2], [0, 2]];
  test.equal(geometric.pointInPolygon([1, 1], polygon), true);
  test.equal(geometric.pointInPolygon([3, 3], polygon), false);
  test.end();
});
const tape = require("tape"),
    geometric = require("../"),
    polygon = [[10, 10], [50, 10], [50, 50], [10, 50]];

tape("pointOnPolygon(point, polygon) determines whether a point is located on one of the edges of a polygon", function(test) {
  test.equal(geometric.pointOnPolygon([30, 10], polygon), true);
  test.equal(geometric.pointOnPolygon([50, 30], polygon), true);
  test.equal(geometric.pointOnPolygon([30, 50], polygon), true);
  test.equal(geometric.pointOnPolygon([10, 30], polygon), true);
  test.equal(geometric.pointOnPolygon([30, 30], polygon), false);
  test.equal(geometric.pointOnPolygon([30, 70], polygon), false);
  test.end();
});
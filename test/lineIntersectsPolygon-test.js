var tape = require("tape"),
    geometric = require("../");

tape("lineIntersectsPolygon(line, polygon) determines whether a line intersects a polygon", function(test) {
  var polygon = [[5, 3], [10, 3], [10, 8], [5, 8]],
      lineA = [[4, 6], [8, 2]],
      lineB = [[4, 6], [11, 6]],
      lineC = [[4, 9], [11, 9]];

  test.equal(geometric.lineIntersectsPolygon(lineA, polygon), true);
  test.equal(geometric.lineIntersectsPolygon(lineB, polygon), true);
  test.equal(geometric.lineIntersectsPolygon(lineC, polygon), false);
  test.end();
});
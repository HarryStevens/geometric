var tape = require("tape"),
    geometric = require("../");

tape("lineIntersectsPolygon(line, polygon) determines whether a line intersects a polygon", function(test) {
  const polygon = [[5, 3], [10, 3], [10, 8], [5, 8]],
        lineA = [[4, 6], [8, 2]],
        lineB = [[4, 6], [11, 6]],
        lineC = [[4, 9], [11, 9]];

  test.equal(geometric.lineIntersectsPolygon(lineA, polygon), true);
  test.equal(geometric.lineIntersectsPolygon(lineB, polygon), true);
  test.equal(geometric.lineIntersectsPolygon(lineC, polygon), false);
  test.end();
});

tape("lineIntersectsPolygon(line, polygon) should return true even if the line is only collinear with one of the polygon's segments", function(test) {
  const polygon = [[388, 150], [458, 150], [458, 110], [478, 53], [486, 50], [488, 20], [490, 50], [498, 53], [518, 110], [518, 150], [588, 150], [588, 270], [388, 270]],
      line = [[98, 150], [878, 150]];

  test.equal(geometric.lineIntersectsPolygon(line, polygon), true);
  test.end();
});
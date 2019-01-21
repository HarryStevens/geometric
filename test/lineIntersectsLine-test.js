var tape = require("tape"),
    geometric = require("../");

tape("lineIntersectsLine(lineA, lineB) determines whether lineA intersects lineB", function(test) {
  var lineA = [[1, 4], [3, 4]],
      lineB = [[2, 1], [2, 7]],
      lineC = [[1, 8], [3, 8]];

  test.equal(geometric.lineIntersectsLine(lineA, lineB), true);
  test.equal(geometric.lineIntersectsLine(lineA, lineC), false);
  test.equal(geometric.lineIntersectsLine(lineB, lineC), false);
  test.end();
});
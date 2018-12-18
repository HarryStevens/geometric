var tape = require("tape"),
    geometric = require("../"),
    line = [[1, 0], [1, 2]];

tape("pointLeftOfLine(point, line) determines whether a point is to the left of a line", function(test) {
  test.equal(geometric.pointLeftOfLine([0, 1], line), true);
  test.equal(geometric.pointLeftOfLine([1, 1], line), false);
  test.equal(geometric.pointLeftOfLine([2, 1], line), false);
  test.equal(geometric.pointLeftOfLine([0, 1], line.reverse()), true);
  test.equal(geometric.pointLeftOfLine([1, 1], line.reverse()), false);
  test.equal(geometric.pointLeftOfLine([2, 1], line.reverse()), false);
  test.end();
});

tape("pointRightOfLine(point, line) determines whether a point is to the right of a line", function(test) {
  test.equal(geometric.pointRightOfLine([0, 1], line), false);
  test.equal(geometric.pointRightOfLine([1, 1], line), false);
  test.equal(geometric.pointRightOfLine([2, 1], line), true);
  test.equal(geometric.pointRightOfLine([0, 1], line.reverse()), false);
  test.equal(geometric.pointRightOfLine([1, 1], line.reverse()), false);
  test.equal(geometric.pointRightOfLine([2, 1], line.reverse()), true);

  test.end();
});

tape("pointOnLine(point, line) determines whether a point is collinear with a line", function(test) {
  test.equal(geometric.pointOnLine([0, 1], line), false);
  test.equal(geometric.pointOnLine([1, 1], line), true);
  test.equal(geometric.pointOnLine([2, 1], line), false);
  test.end();
});
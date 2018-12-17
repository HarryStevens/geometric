var tape = require("tape"),
    geometric = require("../");

tape("pointLeftOfLine(point, line) determines whether a point is to the left of a line", function(test) {
  test.equal(geometric.pointLeftOfLine([0, 1], [[1, 0], [1, 2]]), true);
  test.equal(geometric.pointLeftOfLine([1, 1], [[1, 0], [1, 2]]), false);
  test.equal(geometric.pointLeftOfLine([2, 1], [[1, 0], [1, 2]]), false);
  test.end();
});

tape("pointRightOfLine(point, line) determines whether a point is to the left of a line", function(test) {
  test.equal(geometric.pointRightOfLine([0, 1], [[1, 0], [1, 2]]), false);
  test.equal(geometric.pointRightOfLine([1, 1], [[1, 0], [1, 2]]), false);
  test.equal(geometric.pointRightOfLine([2, 1], [[1, 0], [1, 2]]), true);
  test.end();
});

tape("pointOnLine(point, line) determines whether a point is to the left of a line", function(test) {
  test.equal(geometric.pointOnLine([0, 1], [[1, 0], [1, 2]]), false);
  test.equal(geometric.pointOnLine([1, 1], [[1, 0], [1, 2]]), true);
  test.equal(geometric.pointOnLine([2, 1], [[1, 0], [1, 2]]), false);
  test.end();
});
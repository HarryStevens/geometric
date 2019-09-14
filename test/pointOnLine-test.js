var tape = require("tape"),
    geometric = require("../"),
    line = [[1, 0], [1, 2]];

tape("pointLeftofLine(point, line) determines whether a point is to the left of a line", function(test) {
  test.equal(geometric.pointLeftofLine([0, 1], line), true);
  test.equal(geometric.pointLeftofLine([1, 1], line), false);
  test.equal(geometric.pointLeftofLine([2, 1], line), false);
  test.equal(geometric.pointLeftofLine([0, 1], line.reverse()), true);
  test.equal(geometric.pointLeftofLine([1, 1], line.reverse()), false);
  test.equal(geometric.pointLeftofLine([2, 1], line.reverse()), false);
  test.end();
});

tape("pointRightofLine(point, line) determines whether a point is to the right of a line", function(test) {
  test.equal(geometric.pointRightofLine([0, 1], line), false);
  test.equal(geometric.pointRightofLine([1, 1], line), false);
  test.equal(geometric.pointRightofLine([2, 1], line), true);
  test.equal(geometric.pointRightofLine([0, 1], line.reverse()), false);
  test.equal(geometric.pointRightofLine([1, 1], line.reverse()), false);
  test.equal(geometric.pointRightofLine([2, 1], line.reverse()), true);

  test.end();
});

tape("pointOnLine(point, line) determines whether a point is collinear with a line and is also on the line segment", function(test) {
  test.equal(geometric.pointOnLine([0, 1], line), false);
  test.equal(geometric.pointOnLine([1, 1], line), true);
  test.equal(geometric.pointOnLine([2, 1], line), false);

  // The point cannot be located outside of the line segment
  test.equal(geometric.pointOnLine([1, 100], line), false);
  
  test.end();
});

tape("pointWithLine(point, line) determines whether a point is collinear with a line", function(test) {
  test.equal(geometric.pointWithLine([0, 1], line), false);
  test.equal(geometric.pointWithLine([1, 1], line), true);
  test.equal(geometric.pointWithLine([2, 1], line), false);

  // The point can be located outside of the line segment
  test.equal(geometric.pointWithLine([1, 100], line), true);

  test.end();
});
var tape = require("tape"),
    geometric = require("../");

tape("convexHull(points) calculates the convex hull of a set of points", function(test) {
  var vertices = [[0, 0], [0, 2], [2, 2], [2, 0], [1, 1]];
  var hull = geometric.convexHull(vertices);
  test.equal(hull.length, 4);
  test.equal(hull[0][0], 0);
  test.equal(hull[0][1], 0);
  test.equal(hull[1][0], 2);
  test.equal(hull[1][1], 0);
  test.equal(hull[2][0], 2);
  test.equal(hull[2][1], 2);
  test.equal(hull[3][0], 0);
  test.equal(hull[3][1], 2);
  var nullHull = geometric.convexHull([[0, 0], [0, 1]]);
  test.equal(nullHull, null);
  test.end();
});
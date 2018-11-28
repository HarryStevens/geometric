var tape = require("tape"),
    geometric = require("../");

tape("angleRadians(a, b) calculates the angle between two points, in radians", function(test) {
  test.equal(geometric.angleRadians([0, 0], [0, 1]), Math.PI / 2);
  test.equal(geometric.angleRadians([0, 0], [0, -1]), Math.PI / -2);
  test.equal(geometric.angleRadians([0, 0], [1, 0]), 0);
  test.equal(geometric.angleRadians([0, 0], [-1, 0]), Math.PI);
  test.equal(geometric.angleRadians([0, 0], [1, 1]), Math.PI / 4);
  test.end();
});
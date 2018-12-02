var tape = require("tape"),
    geometric = require("../");

tape("rotateDegrees(p, a, o) rotates a point (p) by an angle in degrees (a) around an origin (o)", function(test) {
  test.equal(geometric.rotateDegrees([1, 1], 90).map(d => Math.round(d))[0], -1);
  test.equal(geometric.rotateDegrees([1, 1], 90)[1], 1);
  test.equal(geometric.rotateDegrees([1, 1], 180).map(d => Math.round(d))[0], -1);
  test.equal(geometric.rotateDegrees([1, 1], 180).map(d => Math.round(d))[1], -1);
  test.equal(geometric.rotateDegrees([1, 1], 90, [2, 2])[0], 3);
  test.equal(geometric.rotateDegrees([1, 1], 90, [2, 2])[1], 1);
  test.equal(geometric.rotateDegrees([1, 1], 180, [2, 2])[0], 3);
  test.equal(geometric.rotateDegrees([1, 1], 180, [2, 2])[1], 3);
  test.end();
});
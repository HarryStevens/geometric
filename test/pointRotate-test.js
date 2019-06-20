var tape = require("tape"),
    geometric = require("../");

tape("pointRotate(point, angle, origin) rotates a point by an angle in degrees around an origin", function(test) {
  test.equal(geometric.pointRotate([1, 1], 90).map(d => Math.round(d))[0], -1);
  test.equal(geometric.pointRotate([1, 1], 90)[1], 1);
  test.equal(geometric.pointRotate([1, 1], 180).map(d => Math.round(d))[0], -1);
  test.equal(geometric.pointRotate([1, 1], 180).map(d => Math.round(d))[1], -1);
  test.equal(geometric.pointRotate([1, 1], 180, [0, 0]).map(d => Math.round(d))[0], -1);
  test.equal(geometric.pointRotate([1, 1], 180, [0, 0]).map(d => Math.round(d))[1], -1);
  test.equal(geometric.pointRotate([1, 1], 90, [2, 2])[0], 3);
  test.equal(geometric.pointRotate([1, 1], 90, [2, 2])[1], 1);
  test.equal(geometric.pointRotate([1, 1], 180, [2, 2])[0], 3);
  test.equal(geometric.pointRotate([1, 1], 180, [2, 2])[1], 3);
  test.end();
});
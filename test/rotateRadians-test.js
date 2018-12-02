var tape = require("tape"),
    geometric = require("../");

tape("rotateRadians(p, a, o) rotates a point (p) by an angle in radians (a) around an origin (o)", function(test) {
  test.equal(geometric.rotateRadians([1, 1], Math.PI / 2).map(d => Math.round(d))[0], -1);
  test.equal(geometric.rotateRadians([1, 1], Math.PI / 2)[1], 1);
  test.equal(geometric.rotateRadians([1, 1], Math.PI).map(d => Math.round(d))[0], -1);
  test.equal(geometric.rotateRadians([1, 1], Math.PI).map(d => Math.round(d))[1], -1);
  test.equal(geometric.rotateRadians([1, 1], Math.PI / 2, [2, 2])[0], 3);
  test.equal(geometric.rotateRadians([1, 1], Math.PI / 2, [2, 2])[1], 1);
  test.equal(geometric.rotateRadians([1, 1], Math.PI, [2, 2])[0], 3);
  test.equal(geometric.rotateRadians([1, 1], Math.PI, [2, 2])[1], 3);
  test.end();
});
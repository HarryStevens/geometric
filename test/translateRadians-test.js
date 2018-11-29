var tape = require("tape"),
    geometric = require("../");

tape("translateRadians(p, a, d) translates a point (p) by an angle in radians (a) and distance (d)", function(test) {
  test.equal(geometric.translateRadians([0, 0], 0, 1)[0], 1);
  test.equal(geometric.translateRadians([0, 0], 0, 1)[1], 0);
  
  test.equal(geometric.translateRadians([0, 0], Math.PI, 1).map(d => Math.round(d))[0], -1);
  test.equal(geometric.translateRadians([0, 0], Math.PI, 1).map(d => Math.round(d))[1], 0);

  test.equal(geometric.translateRadians([0, 0], Math.PI / 2, 1).map(d => Math.round(d))[0], 0);
  test.equal(geometric.translateRadians([0, 0], Math.PI / 2, 1).map(d => Math.round(d))[1], 1);

  test.end();
});
var tape = require("tape"),
    geometric = require("../");

tape("translateDegrees(p, a, d) translates a point (p) by an angle in degrees (a) and distance (d)", function(test) {
  test.equal(geometric.translateDegrees([0, 0], 0, 1)[0], 1);
  test.equal(geometric.translateDegrees([0, 0], 0, 1)[1], 0);
  
  test.equal(geometric.translateDegrees([0, 0], 90, 1).map(d => Math.round(d))[0], 0);
  test.equal(geometric.translateDegrees([0, 0], 90, 1).map(d => Math.round(d))[1], 1);

  test.equal(geometric.translateDegrees([0, 0], 180, 1).map(d => Math.round(d))[0], -1);
  test.equal(geometric.translateDegrees([0, 0], 180, 1).map(d => Math.round(d))[1], 0);

  test.equal(geometric.translateDegrees([0, 0], 270, 1).map(d => Math.round(d))[0], 0);
  test.equal(geometric.translateDegrees([0, 0], 270, 1).map(d => Math.round(d))[1], -1);

  test.equal(geometric.translateDegrees([0, 0], 360, 1).map(d => Math.round(d))[0], 1);
  test.equal(geometric.translateDegrees([0, 0], 360, 1).map(d => Math.round(d))[1], 0);

  test.end();
});
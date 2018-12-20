var tape = require("tape"),
    geometric = require("../");

tape("radiansToDegrees(angle) converts an angle from radians to degrees", function(test) {
  test.equal(geometric.radiansToDegrees(Math.PI), 180);
  test.equal(geometric.radiansToDegrees(Math.PI * 2), 360);
  test.equal(geometric.radiansToDegrees(0), 0);
  test.end();
});
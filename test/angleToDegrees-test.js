const tape = require("tape"),
      geometric = require("../");

tape("angleToDegrees(angle) converts an angle from radians to degrees", function(test) {
  test.equal(geometric.angleToDegrees(Math.PI), 180);
  test.equal(geometric.angleToDegrees(Math.PI * 2), 360);
  test.equal(geometric.angleToDegrees(0), 0);
  test.end();
});
const tape = require("tape"),
      geometric = require("../");

tape("angleToRadians(angle) converts an angle from degrees to radians", function(test) {
  test.equal(geometric.angleToRadians(180).toFixed(3), (Math.PI).toFixed(3));
  test.equal(geometric.angleToRadians(360).toFixed(3), (Math.PI * 2).toFixed(3));
  test.equal(geometric.angleToRadians(0), 0);
  test.end();
});
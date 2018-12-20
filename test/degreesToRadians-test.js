var tape = require("tape"),
    geometric = require("../");

tape("degreesToRadians(angle) converts an angle from degrees to radians", function(test) {
  test.equal(geometric.degreesToRadians(180).toFixed(3), (Math.PI).toFixed(3));
  test.equal(geometric.degreesToRadians(360).toFixed(3), (Math.PI * 2).toFixed(3));
  test.equal(geometric.degreesToRadians(0), 0);
  test.end();
});
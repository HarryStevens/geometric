var tape = require("tape"),
    geometric = require("../");

tape("angleDegrees(a, b) calculates the angle between two points", function(test) {
  test.equal(geometric.angleDegrees([0, 0], [0, 1]), 90);
  test.equal(geometric.angleDegrees([0, 0], [0, -1]), -90);
  test.equal(geometric.angleDegrees([0, 0], [1, 0]), 0);
  test.equal(geometric.angleDegrees([0, 0], [-1, 0]), 180);
  test.equal(geometric.angleDegrees([0, 0], [1, 1]), 45);
  test.equal(geometric.angleDegrees([0, 0], [-1, -1]), -135);
  test.end();
});
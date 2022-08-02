const tape = require("tape"),
      geometric = require("../");

tape("lineAngle(line) calculates the angle of a line, in degrees", function(test) {
  test.equal(geometric.lineAngle([[0, 0], [0, 1]]), 90);
  test.equal(geometric.lineAngle([[0, 0], [0, -1]]), -90);
  test.equal(geometric.lineAngle([[0, 0], [1, 0]]), 0);
  test.equal(geometric.lineAngle([[0, 0], [-1, 0]]), 180);
  test.equal(geometric.lineAngle([[0, 0], [1, 1]]), 45);
  test.equal(geometric.lineAngle([[0, 0], [-1, -1]]), -135);
  test.end();
});
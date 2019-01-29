var tape = require("tape"),
    geometric = require("../");

tape("angleReflect(incidenceAngle, surfaceAngle) returns the angle of reflection.", function(test) {
  test.equal(geometric.angleReflect(0, 90), 180);
  test.equal(geometric.angleReflect(0, 45), 90);
  test.equal(geometric.angleReflect(180, 90), 0);
  test.equal(geometric.angleReflect(180, 45), 270);
  test.equal(geometric.angleReflect(45, 0), 315);
  test.equal(geometric.angleReflect(45, 90), 135);
  test.equal(geometric.angleReflect(45, 180), 315);
  test.equal(geometric.angleReflect(45, 270), 135);
  test.equal(geometric.angleReflect(45, 360), 315);
  test.end();
});
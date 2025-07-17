const tape = require("tape"),
      geometric = require("../");

tape("polygonMean(p) calculates the arithmetic mean of a polygon's vertices", function(test) {
  const mc0 = geometric.polygonMean([[0, 0], [1, 0], [1, 1], [0, 1]]);
  const mc1 = geometric.polygonMean([[0, 0], [2, 0], [2, 2], [0, 2]]);
  test.equal(mc0[0], 0.5);
  test.equal(mc0[1], 0.5);
  test.equal(mc1[0], 1);
  test.equal(mc1[1], 1);
  test.end();
});
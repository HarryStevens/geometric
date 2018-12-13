var tape = require("tape"),
    geometric = require("../");

tape("meanCenter(p) calculates the arithmetic mean of a polygon's vertices", function(test) {
  var mc0 = geometric.meanCenter([[0, 0], [1, 0], [1, 1], [0, 1]]);
  var mc1 = geometric.meanCenter([[0, 0], [2, 0], [2, 2], [0, 2]]);
  test.equal(mc0[0], 0.5);
  test.equal(mc0[1], 0.5);
  test.equal(mc1[0], 1);
  test.equal(mc1[1], 1);
  test.end();
});
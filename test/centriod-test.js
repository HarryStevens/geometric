var tape = require("tape"),
    geometric = require("../");

tape("centroid(p) calculates the weighted centroid of a polygon", function(test) {
  var mc0 = geometric.centroid([[0, 0], [1, 0], [1, 1], [0, 1]]);
  var mc1 = geometric.centroid([[0, 0], [2, 0], [2, 2], [0, 2]]);
  test.equal(mc0[0], 0.5);
  test.equal(mc0[1], 0.5);
  test.equal(mc1[0], 1);
  test.equal(mc1[1], 1);
  test.end();
});
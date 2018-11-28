var tape = require("tape"),
    geometric = require("../");

tape("midpoint(a, b) calculates the midpoint between two points", function(test) {
  test.equal(geometric.midpoint([0, 0], [0, 1])[0], 0);
  test.equal(geometric.midpoint([0, 0], [0, 1])[1], .5);
  test.equal(geometric.midpoint([0, 0], [0, -1])[0], 0);
  test.equal(geometric.midpoint([0, 0], [0, -1])[1], -.5);
  test.equal(geometric.midpoint([1, 0], [1, 0])[0], 1);
  test.equal(geometric.midpoint([1, 0], [1, 0])[1], 0);
  test.equal(geometric.midpoint([1, 0], [-1, 0])[0], 0);
  test.equal(geometric.midpoint([1, 0], [-1, 0])[1], 0);
  test.end();
});
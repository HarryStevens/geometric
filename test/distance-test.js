var tape = require("tape"),
    geometric = require("../");

tape("distance(a, b) calculates the distance between two points", function(test) {
  test.equal(geometric.distance([0, 0], [0, 1]), 1);
  test.equal(geometric.distance([0, 0], [0, -1]), 1);
  test.equal(geometric.distance([1, 0], [1, 0]), 0);
  test.equal(geometric.distance([1, 0], [-1, 0]), 2);
  test.end();
});
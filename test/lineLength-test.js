var tape = require("tape"),
    geometric = require("../");

tape("lineLength(line) calculates the length of a line segment", function(test) {
  test.equal(geometric.lineLength([[0, 0], [0, 1]]), 1);
  test.equal(geometric.lineLength([[0, 0], [0, -1]]), 1);
  test.equal(geometric.lineLength([[1, 0], [1, 0]]), 0);
  test.equal(geometric.lineLength([[1, 0], [-1, 0]]), 2);
  test.end();
});
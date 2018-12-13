var tape = require("tape"),
    geometric = require("../");

tape("area(p) calculates the area of a polygon", function(test) {
  test.equal(geometric.area([[0, 0], [1, 0], [1, 1], [0, 1]]), 1);
  test.equal(geometric.area([[0, 0], [2, 0], [2, 2], [0, 2]]), 4);
  test.equal(geometric.area([[0, 0], [3, 0], [3, 3], [0, 3]]), 9);
  test.end();
});
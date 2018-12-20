var tape = require("tape"),
    geometric = require("../");

tape("polygonArea(polygon) calculates the area of a polygon", function(test) {
  test.equal(geometric.polygonArea([[0, 0], [1, 0], [1, 1], [0, 1]]), 1);
  test.equal(geometric.polygonArea([[0, 0], [2, 0], [2, 2], [0, 2]]), 4);
  test.equal(geometric.polygonArea([[0, 0], [3, 0], [3, 3], [0, 3]]), 9);
  test.equal(geometric.polygonArea([[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]), 1);
  test.equal(geometric.polygonArea([[0, 0], [2, 0], [2, 2], [0, 2], [0, 0]]), 4);
  test.equal(geometric.polygonArea([[0, 0], [3, 0], [3, 3], [0, 3], [0, 0]]), 9);
  test.end();
});
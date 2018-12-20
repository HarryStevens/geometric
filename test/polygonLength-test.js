var tape = require("tape"),
    geometric = require("../");

tape("polygonLength(polygon) calculates the length of a polygon's perimeter", function(test) {
  test.equal(geometric.polygonLength([[0, 0], [1, 0], [1, 1], [0, 1]]), 4);
  test.equal(geometric.polygonLength([[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]), 4);
  test.end();
});
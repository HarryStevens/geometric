const tape = require("tape"),
      geometric = require("../");

tape("polygonLength(polygon) calculates the length of a polygon's perimeter", function(test) {
  test.equal(geometric.polygonLength([[0, 0], [1, 0], [1, 1], [0, 1]]), 4);
  test.equal(geometric.polygonLength([[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]), 4);
  test.end();
});

tape("polygonLength(polygon) returns 0 if the polygon has 0 or 1 points", function(test) {
  test.equal(geometric.polygonLength([]), 0);
  test.equal(geometric.polygonLength([[0, 0]]), 0);
  test.end();
});
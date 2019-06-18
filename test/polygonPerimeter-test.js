var tape = require("tape"),
    geometric = require("../");

tape("polygonPerimeter(vertices) calculates the perimeter of a polygon", function(test) {
  test.equal(geometric.polygonPerimeter([[0, 0], [1, 0], [1, 1], [1, 0]]), 4);
  test.end();
});
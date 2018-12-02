var tape = require("tape"),
    geometric = require("../");

tape("polygonInPolygon(verticesA, verticesB) determines whether a polygon is contained by another polygon", function(test) {
  var polygon = [[0, 0], [2, 0], [2, 2], [0, 2]];
  test.equal(geometric.polygonInPolygon([[.5, .5], [1.5, .5], [1.5, 1.5], [.5, 1.5]], polygon), true);
  test.equal(geometric.polygonInPolygon([[.5, .5], [2.5, .5], [1.5, 1.5], [.5, 1.5]], polygon), false);
  test.equal(geometric.polygonInPolygon([[3, 3], [3, 4], [4, 4]], polygon), false);
  test.end();
});
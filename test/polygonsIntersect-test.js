var tape = require("tape"),
    geometric = require("../");

tape("polygonsIntersect(verticesA, verticesB) determines whether two polygons intersect but neither contains the other", function(test) {
  var polygon = [[0, 0], [2, 0], [2, 2], [0, 2]];
  test.equal(geometric.polygonsIntersect([[.5, .5], [1.5, .5], [1.5, 1.5], [.5, 1.5]], polygon), false);
  test.equal(geometric.polygonsIntersect([[.5, .5], [2.5, .5], [2.5, 2.5], [.5, 2.5]], polygon), true);
  test.equal(geometric.polygonsIntersect([[3, 3], [3, 4], [4, 4]], polygon), false);
  test.end();
});
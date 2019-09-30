var tape = require("tape"),
    geometric = require("../");

tape("polygonBounds(polygon) returns null if the polygon has fewer than 3 points", function(test) {
  test.equal(geometric.polygonBounds([]), null);
  test.equal(geometric.polygonBounds([[0, 1]]), null);
  test.equal(geometric.polygonBounds([[0, 1], [1, 2]]), null);
  test.deepEqual(geometric.polygonBounds([[0, 1], [1, 2], [0, 3]]), [[0, 1], [1, 3]]);
  test.end();
});

tape("polygonBounds(polygon) calculates the bounds a polygon", function(test) {
  var polygon = [[110, 40], [210, 10], [310, 40], [360, 140], [310, 240], [210, 270], [110, 240], [60, 140]];
  var bounds = geometric.polygonBounds(polygon);
  
  test.equal(bounds[0][0], 60);
  test.equal(bounds[0][1], 10);
  test.equal(bounds[1][0], 360);
  test.equal(bounds[1][1], 270);
  test.end();
});

tape("polygonBounds(polygon) ignores null values", function(test) {
  test.deepEqual(geometric.polygonBounds([[null, 5], [0, 1], [1, 2], [0, 3]]), [[0, 1], [1, 3]]);
  test.deepEqual(geometric.polygonBounds([[undefined, 5], [0, 1], [1, 2], [0, 3]]), [[0, 1], [1, 3]]);
  test.deepEqual(geometric.polygonBounds([[NaN, 5], [0, 1], [1, 2], [0, 3]]), [[0, 1], [1, 3]]);
  test.deepEqual(geometric.polygonBounds([[5, Infinity], [0, 1], [1, 2], [0, 3]]), [[0, 1], [1, 3]]);
  test.end();
});
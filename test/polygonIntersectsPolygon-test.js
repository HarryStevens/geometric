const tape = require("tape"),
    geometric = require("../");

tape("polygonIntersectsPolygon(polygonA, polygonB) determines whether two polygons intersect but neither contains the other", function(test) {
  const polygon = [[0, 0], [2, 0], [2, 2], [0, 2]];
  test.equal(geometric.polygonIntersectsPolygon([[.5, .5], [1.5, .5], [1.5, 1.5], [.5, 1.5]], polygon), false);
  test.equal(geometric.polygonIntersectsPolygon([[.5, .5], [2.5, .5], [2.5, 2.5], [.5, 2.5]], polygon), true);
  test.equal(geometric.polygonIntersectsPolygon([[3, 3], [3, 4], [4, 4]], polygon), false);

  // Test cases where lines overlap but no points are inside
  const polygonA = [[5, 3], [10, 3], [10, 8], [5, 8]],
        polygonB = [[4, 6], [8, 2], [11, 6]],
        polygonC = [[4, 6], [11, 6], [11, 9], [4, 9]];
  test.equal(geometric.polygonIntersectsPolygon(polygonA, polygonB), true);
  test.equal(geometric.polygonIntersectsPolygon(polygonB, polygonA), true);
  test.equal(geometric.polygonIntersectsPolygon(polygonA, polygonC), true);
  test.equal(geometric.polygonIntersectsPolygon(polygonC, polygonA), true);
  
  test.end();
});

tape("If polygonA in polygonIntersectsPolygon is forced closed, polygonA will not be altered", test => {
  const openPolygon = [[0, 0], [1, 0], [1, 1]],
        clonedBefore = openPolygon.slice();
  geometric.polygonIntersectsPolygon(openPolygon, [[10, 0], [11, 0], [11, 11]]);
  test.deepEqual(clonedBefore, openPolygon);

  test.end();
});

tape("polygonIntersectsPolygon(polygonA, polygonB) returns true if overlapping rectangles share two edges", test => {
  const a = [[562.6875, 304.4375], [601.09375, 304.4375], [601.09375, 322.9375], [562.6875, 322.9375]],
        b = [[562.6875, 298.4375], [601.09375, 298.4375], [601.09375, 316.9375], [562.6875, 316.9375]];

  test.equal(geometric.polygonIntersectsPolygon(a, b), true);

  test.end();
});

tape("polygonIntersectsPolygon(polygonA, polygonB) detects intersections in special cases", test => {
  // One of the polygons just has two points. See https://github.com/HarryStevens/geometric/issues/13
  const a = [[180, 140], [180, 205]],
        b = [[160, 180], [170, 181.72], [180, 187.64], [185, 193.41]];

  test.equal(geometric.polygonIntersectsPolygon(a, b), true);

  test.end();
});

// https://github.com/HarryStevens/geometric/issues/29
tape("polygonIntersectsPolygon(polygonA, polygonB) returns false in open U configuration", test => {
  const a = [[3, 3], [3, 4], [4, 4], [4, 3]],
        b = [[1, 1], [1, 4], [2, 4], [2, 2], [5, 2], [5, 4], [6, 4], [6, 1]];

  test.equal(geometric.polygonIntersectsPolygon(a, b), false);

  test.end();
});
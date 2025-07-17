const tape = require("tape"),
      geometric = require("../");

tape("polygonInPolygon(polygonA, polygonB) determines whether a polygon is contained by another polygon", function(test) {
  const polygon = [[0, 0], [2, 0], [2, 2], [0, 2]];
  test.equal(geometric.polygonInPolygon([[.5, .5], [1.5, .5], [1.5, 1.5], [.5, 1.5]], polygon), true);
  test.equal(geometric.polygonInPolygon([[.5, .5], [2.5, .5], [1.5, 1.5], [.5, 1.5]], polygon), false);
  test.equal(geometric.polygonInPolygon([[3, 3], [3, 4], [4, 4]], polygon), false);

  test.end();
});

tape("polygonInPolygon(polygonA, polygonB) returns false if all of polygonA's vertices fall inside polygonB but one of its lines intersects polygonB", function(test) {
  const polygonA = [[435, 223], [503, 223], [524, 158], [469, 118], [414, 158]];
  const polygonB = [[388, 150], [458, 150], [458, 110], [478, 53], [486, 50], [488, 20], [490, 50], [498, 53], [518, 110], [518, 150], [588, 150], [588, 270], [388, 270], [388, 150]];
  test.equal(geometric.polygonInPolygon(polygonA, polygonB), false);
  
  test.end();
});

tape("If polygonA in polygonInPolygon is forced closed, polygonA will not be altered", test => {
  const openPolygon = [[0, 0], [1, 0], [1, 1]];
  const clonedBefore = openPolygon.slice();
  geometric.polygonInPolygon(openPolygon, [[10, 0], [11, 0], [11, 11]]);
  test.deepEqual(clonedBefore, openPolygon);

  test.end();
});
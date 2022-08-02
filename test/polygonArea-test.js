const tape = require("tape"),
      geometric = require("../");

tape("polygonArea(polygon) calculates the area of a polygon", test => {
  test.equal(geometric.polygonArea([[0, 0], [1, 0], [1, 1], [0, 1]]), 1);
  test.equal(geometric.polygonArea([[0, 0], [2, 0], [2, 2], [0, 2]]), 4);
  test.equal(geometric.polygonArea([[0, 0], [3, 0], [3, 3], [0, 3]]), 9);
  test.equal(geometric.polygonArea([[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]), 1);
  test.equal(geometric.polygonArea([[0, 0], [2, 0], [2, 2], [0, 2], [0, 0]]), 4);
  test.equal(geometric.polygonArea([[0, 0], [3, 0], [3, 3], [0, 3], [0, 0]]), 9);
  test.end();
});

tape("If the polygon's winding order is counter-clockwise and signed is set to true, returns a negative area", test => {
  const p = [[119, 87], [61, 150], [131, 197], [206, 135]];
  test.equal(geometric.polygonArea(p, true), -8065);
  test.equal(geometric.polygonArea(p, false), 8065);
  test.equal(geometric.polygonArea(p), 8065);
  test.end();
});


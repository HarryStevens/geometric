const tape = require("tape"),
      geometric = require("../");

tape("lineIntersectsLine(lineA, lineB) determines whether lineA intersects lineB", test => {
  const lineA = [[1, 4], [3, 4]],
        lineB = [[2, 1], [2, 7]],
        lineC = [[1, 8], [3, 8]];

  test.equal(geometric.lineIntersectsLine(lineA, lineB), true);
  test.equal(geometric.lineIntersectsLine(lineA, lineC), false);
  test.equal(geometric.lineIntersectsLine(lineB, lineC), false);
  test.end();
});

// See https://github.com/HarryStevens/geometric/issues/10
tape("lineIntersectsLine(lineA, lineB) returns true if lineA and lineB share an endpoint", test => {
  const line1 = [
    [50.054358, 8.693184],
    [50.055604, 8.685873]
  ];
  const line2 = [
    [50.054228, 8.69338],
    [50.054358, 8.693184]
  ];

  test.equal(geometric.lineIntersectsLine(line1, line2), true);
  test.equal(geometric.lineIntersectsLine(line2, line1), true);
  test.end();
});
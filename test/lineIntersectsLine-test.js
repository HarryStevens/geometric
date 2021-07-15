const tape = require("tape"),
      geometric = require("../");

tape("lineIntersectsLine(lineA, lineB) determines whether lineA intersects lineB", test => {
  const lineA = [[1, 4], [3, 4]],
        lineB = [[2, 1], [2, 7]],
        lineC = [[1, 8], [3, 8]],
        lineD = [[1, 8], [3, 8]],
        lineE = [[1, 9], [3, 9]],
        lineF = [[1, 2], [3, 4]],
        lineG = [[0, 1], [2, 3]];

  test.equal(geometric.lineIntersectsLine(lineA, lineB), true);
  test.equal(geometric.lineIntersectsLine(lineA, lineC), false);
  test.equal(geometric.lineIntersectsLine(lineB, lineC), false);
  // Same lines
  test.equal(geometric.lineIntersectsLine(lineC, lineD), true);
  // Parallel lines not crossing
  test.equal(geometric.lineIntersectsLine(lineE, lineD), false);
  // Parallel lines overlapping
  test.equal(geometric.lineIntersectsLine(lineF, lineG), true);
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

tape("lineIntersectsLine(lineA, lineB) returns true if one of lineA and lineB points is on the other line", test => {
  const line1 = [
    [0, 0],
    [1, 0]
  ];
  const line2 = [
    [0.5, -1],
    [0.5, 0]
  ];

  test.equal(geometric.lineIntersectsLine(line1, line2), true);
  test.equal(geometric.lineIntersectsLine(line2, line1), true);
  test.end();
});
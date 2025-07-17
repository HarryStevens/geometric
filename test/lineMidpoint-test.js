const tape = require("tape"),
      geometric = require("../");

tape("lineMidpoint(line) calculates the midpoint of a line segment", function(test) {
  test.equal(geometric.lineMidpoint([[0, 0], [0, 1]])[0], 0);
  test.equal(geometric.lineMidpoint([[0, 0], [0, 1]])[1], .5);
  test.equal(geometric.lineMidpoint([[0, 0], [0, -1]])[0], 0);
  test.equal(geometric.lineMidpoint([[0, 0], [0, -1]])[1], -.5);
  test.equal(geometric.lineMidpoint([[1, 0], [1, 0]])[0], 1);
  test.equal(geometric.lineMidpoint([[1, 0], [1, 0]])[1], 0);
  test.equal(geometric.lineMidpoint([[1, 0], [-1, 0]])[0], 0);
  test.equal(geometric.lineMidpoint([[1, 0], [-1, 0]])[1], 0);
  test.end();
});
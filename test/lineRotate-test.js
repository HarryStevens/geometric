const tape = require("tape"),
      geometric = require("../");

tape("lineRotate(line, angle, origin) rotates a line by an angle in degrees around an origin, where the origin defaults to the midpoint", test => {
  const line = [[-1, -1], [1, 1]];
  const midpoint = geometric.lineMidpoint(line);
  const interpolator = geometric.polygonInterpolate(line);

  test.deepEqual(geometric.lineRotate(line, 0), line);
  test.deepEqual(geometric.lineRotate(line, 0, midpoint), line);
  
  test.deepEqual(round(geometric.lineRotate(line, 90)), [[1, -1], [-1, 1]]);
  test.deepEqual(round(geometric.lineRotate(line, 90, midpoint)), [[1, -1], [-1, 1]]);
  test.deepEqual(round(geometric.lineRotate(line, 90, line[0])), [[-1, -1], [-3, 1]]);
  test.deepEqual(round(geometric.lineRotate(line, 90, line[1])), [[3, -1], [1, 1]]);

  test.deepEqual(round(geometric.lineRotate(line, 180)), [[1, 1], [-1, -1]]);
  test.deepEqual(round(geometric.lineRotate(line, 180, midpoint)), [[1, 1], [-1, -1]]);
  test.deepEqual(round(geometric.lineRotate(line, 180, line[0])), [[-1, -1], [-3, -3]]);
  test.deepEqual(round(geometric.lineRotate(line, 180, line[1])), [[3, 3], [1, 1]]);

  test.deepEqual(round(geometric.lineRotate(line, 270)), [[-1, 1], [1, -1]]);
  test.deepEqual(round(geometric.lineRotate(line, 270, midpoint)), [[-1, 1], [1, -1]]);
  test.deepEqual(round(geometric.lineRotate(line, 270, line[0])), [[-1, -1], [1, -3]]);
  test.deepEqual(round(geometric.lineRotate(line, 270, line[1])), [[-1, 3], [1, 1]]);

  test.deepEqual(round(geometric.lineRotate(line, 360)), line);
  test.deepEqual(round(geometric.lineRotate(line, 360, midpoint)), line);
  test.deepEqual(round(geometric.lineRotate(line, 360, line[0])), line);
  test.deepEqual(round(geometric.lineRotate(line, 360, line[1])), line);

  test.end();
});

function round(line){
  return line.map(d => d.map(Math.round));
}
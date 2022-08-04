const tape = require("tape"),
      geometric = require("../");

tape("lineTranslate(line, angle, distance) translates a line by an angle in degrees and a distance", test => {
  const line = [[-1, -1], [1, 1]];
  
  test.deepEqual(geometric.lineTranslate(line), line);
  test.deepEqual(geometric.lineTranslate(line, 0), line);
  test.deepEqual(geometric.lineTranslate(line, 0, 0), line);

  test.deepEqual(geometric.lineTranslate(line, 0, 1), [[0, -1], [2, 1]]);
  test.deepEqual(geometric.lineTranslate(line, 0, -1), [[-2, -1], [0, 1]]);

  test.deepEqual(round(geometric.lineTranslate(line, 90, 1)), [[-1, 0], [1, 2]]);
  test.deepEqual(round(geometric.lineTranslate(line, 90, -1)), [[-1, -2], [1, 0]]);

  test.deepEqual(round(geometric.lineTranslate(line, 180, 1)), [[-2, -1], [0, 1]]);
  test.deepEqual(round(geometric.lineTranslate(line, 180, -1)), [[0, -1], [2, 1]]);

  test.deepEqual(round(geometric.lineTranslate(line, 270, 1)), [[-1, -2], [1, 0]]);
  test.deepEqual(round(geometric.lineTranslate(line, 270, -1)), [[-1, 0], [1, 2]]);

  test.deepEqual(round(geometric.lineTranslate(line, 360, 1)), [[0, -1], [2, 1]]);
  test.deepEqual(round(geometric.lineTranslate(line, 360, -1)), [[-2, -1], [0, 1]]);

  test.end();
});

function round(line){
  return line.map(d => d.map(Math.round));
}
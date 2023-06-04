const tape = require("tape");
const geometric = require("../");
const round = require("./utils/roundArray");
      

tape("lineInterpolate(line) returns points along a line", test => {
  const line = [[236, 0], [708, 190]];
  const interpolator = geometric.lineInterpolate(line);
  test.deepEqual(round(interpolator(0), 1), line[0]);
  test.deepEqual(round(interpolator(1), 1), line[1]);
  test.deepEqual(round(interpolator(.1), 1), [283.2, 19]);
  test.deepEqual(round(interpolator(.2), 1), [330.4, 38]);
  test.deepEqual(round(interpolator(.3), 1), [377.6, 57]);
  test.deepEqual(round(interpolator(.4), 1), [424.8, 76]);
  test.deepEqual(round(interpolator(.5), 1), [472, 95]);
  test.deepEqual(round(interpolator(.6), 1), [519.2, 114]);
  test.deepEqual(round(interpolator(.7), 1), [566.4, 133]);
  test.deepEqual(round(interpolator(.8), 1), [613.6, 152]);
  test.deepEqual(round(interpolator(.9), 1), [660.8, 171]);
  test.end();
});

tape("lineInterpolate(line) returns points outside the line segment if clamp is false", test => {
  const line = [[236, 0], [708, 190]];
  const interpolator = geometric.lineInterpolate(line);
  test.deepEqual(round(interpolator(-0.1), 1), [188.8, -19]);
  test.deepEqual(round(interpolator(1.1), 1), [755.2, 209]);
  test.end();
});

tape("lineInterpolate(line) returns points inside the line segment if clamp is true", test => {
  const line = [[236, 0], [708, 190]];
  const interpolator = geometric.lineInterpolate(line, true);
  test.deepEqual(interpolator(-0.1), line[0]);
  test.deepEqual(interpolator(1.1), line[1]);
  test.end();
});
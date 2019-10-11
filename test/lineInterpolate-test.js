const tape = require("tape"),
    geometric = require("../");

tape("lineInterpolate(line) returns points along a line", test => {
  const line = [[236, 0], [708, 190]];
  const interpolator = geometric.lineInterpolate(line);
  test.deepEqual(interpolator(0), line[0]);
  test.deepEqual(interpolator(1), line[1]);
  test.deepEqual(interpolator(.1), [283.2, 19]);
  test.deepEqual(interpolator(.2), [330.4, 38]);
  test.deepEqual(interpolator(.3), [377.6, 56.99999999999999]);
  test.deepEqual(interpolator(.4), [424.8, 76]);
  test.deepEqual(interpolator(.5), [472, 94.99999999999999]);
  test.deepEqual(interpolator(.6), [519.2, 113.99999999999999]);
  test.deepEqual(interpolator(.7), [566.4, 132.99999999999997]);
  test.deepEqual(interpolator(.8), [613.6, 152]);
  test.deepEqual(interpolator(.9), [660.8, 171]);
  test.end();
});
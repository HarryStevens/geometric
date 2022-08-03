const tape = require("tape"),
      geometric = require("../");

tape("polygonWind(polygon) sets the winding order of a polygon", test => {
  const polygon = [
    [58, 58],
    [123, 27],
    [233, 86],
    [244, 159],
    [192, 250],
    [110, 278],
    [60, 237],
    [30, 159],
    [19, 101]
  ];
  const isClockwise = geometric.polygonArea(polygon, true) > 0;
  
  const reversed = polygon.slice().reverse(),
        wound = geometric.polygonWind(polygon),
        ccw = geometric.polygonWind(polygon, "ccw"),
        cw = geometric.polygonWind(polygon, "cw"),
        clockwise = geometric.polygonWind(polygon, "clockwise");

  test.equal(isClockwise, true);
  test.deepEqual(wound, reversed);
  test.deepEqual(ccw, reversed);
  test.deepEqual(cw, polygon);
  test.deepEqual(clockwise, polygon);
  
  test.end();
});

tape("polygonWind(polygon) returns null if the polygon has fewer than three points", test => {
  test.equal(geometric.polygonWind([]), null);
  test.equal(geometric.polygonWind([[0, 1]]), null);
  test.equal(geometric.polygonWind([[0, 1], [1, 2]]), null);

  test.end();
});
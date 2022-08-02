const tape = require("tape"),
      geometric = require("../");

tape("polygonScaleY(polygon, scaleFactor, origin) scales a polygon's y-coordinates by a scale factor from an origin point.", function(test) {
  const polygon = [[738.5, 168.5], [838.5, 138.5], [938.5, 168.5], [988.5, 268.5], [938.5, 368.5], [838.5, 398.5], [738.5, 368.5], [688.5, 268.5]];
  const polygonDoubled = geometric.polygonScaleY(polygon, 2);

  test.equal(polygonDoubled[0][0], polygon[0][0]);
  test.equal(Math.round(polygonDoubled[0][1]), 68);
  
  test.equal(polygonDoubled[1][0], polygon[1][0]);
  test.equal(polygonDoubled[1][1], 8.5);

  test.equal(polygonDoubled[2][0], polygon[2][0]);
  test.equal(polygonDoubled[2][1], 68.5);
  
  test.equal(polygonDoubled[3][0], polygon[3][0]);
  test.equal(polygonDoubled[3][1], 268.5);

  test.equal(polygonDoubled[4][0], polygon[4][0]);
  test.equal(polygonDoubled[4][1], 468.5);

  test.equal(polygonDoubled[5][0], polygon[5][0]);
  test.equal(polygonDoubled[5][1], 528.5);

  test.equal(polygonDoubled[6][0], polygon[6][0]);
  test.equal(polygonDoubled[6][1], 468.5);

  test.equal(polygonDoubled[7][0], polygon[7][0]);
  test.equal(Math.round(polygonDoubled[7][1]), 269);

  test.end();
});
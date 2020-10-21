var tape = require("tape"),
    geometric = require("../");

tape("polygonScaleX(polygon, scaleFactor, origin) scales a polygon's x-coordinates by a scale factor from an origin point.", function(test) {
  var polygon = [[738.5, 168.5], [838.5, 138.5], [938.5, 168.5], [988.5, 268.5], [938.5, 368.5], [838.5, 398.5], [738.5, 368.5], [688.5, 268.5]];
  var polygonDoubled = geometric.polygonScaleX(polygon, 2);

  test.equal(polygonDoubled[0][0], 638.5);
  test.equal(polygonDoubled[0][1], polygon[0][1]);
  
  test.equal(polygonDoubled[1][0], 838.5);
  test.equal(polygonDoubled[1][1], polygon[1][1]);

  test.equal(polygonDoubled[2][0], 1038.5);
  test.equal(polygonDoubled[2][1], polygon[2][1]);
  
  test.equal(polygonDoubled[3][0], 1138.5);
  test.equal(polygonDoubled[3][1], polygon[3][1]);

  test.equal(polygonDoubled[4][0], 1038.5);
  test.equal(polygonDoubled[4][1], polygon[4][1]);

  test.equal(polygonDoubled[5][0], 838.5);
  test.equal(polygonDoubled[5][1], polygon[5][1]);

  test.equal(polygonDoubled[6][0], 638.5);
  test.equal(polygonDoubled[6][1], polygon[6][1]);

  test.equal(polygonDoubled[7][0], 538.5);
  test.equal(polygonDoubled[7][1], polygon[7][1]);

  test.end();
});
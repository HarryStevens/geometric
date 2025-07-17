const tape = require("tape"),
      geometric = require("../");

tape("polygonScaleArea(polygon, scaleFactor, origin) scales a polygon by a scale factor from an origin point. The returned polygon's area is equal to the input polygon's area multiplied by the scale factor.", function(test) {
  const polygon = [[738.5, 168.5], [838.5, 138.5], [938.5, 168.5], [988.5, 268.5], [938.5, 368.5], [838.5, 398.5], [738.5, 368.5], [688.5, 268.5]];
  const a0 = geometric.polygonArea(polygon);

  for (let scale = 0; scale <= 10; scale += 0.01) {
    const scaled = geometric.polygonScaleArea(polygon, scale);
    const a1 = geometric.polygonArea(scaled);

    test.equal(+(a0 * scale).toFixed(5), +a1.toFixed(5))
  }

  test.end();
});
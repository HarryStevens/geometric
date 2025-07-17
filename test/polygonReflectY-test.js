const tape = require("tape"),
      geometric = require("../");

tape("polygonReflectY(p) reflects a polygon vertically", (test) => {
  const polygon = [[476,200],[546,200],[546,160],[566,103],[574,100],[576,70],[578,100],[586,103],[606,160],[606,200],[676,200],[676,320],[476,320]];

  test.deepEqual(geometric.polygonReflectY(polygon, 0), polygon);
  test.deepEqual(geometric.polygonReflectY(polygon, 1), [[476,190],[546,190],[546,230],[566,287],[574,290],[576,320],[578,290],[586,287],[606,230],[606,190],[676,190],[676,70],[476,70]]);
  test.deepEqual(geometric.polygonReflectY(polygon, 0.5), [[476,195],[546,195],[546,195],[566,195],[574,195],[576,195],[578,195],[586,195],[606,195],[606,195],[676,195],[676,195],[476,195]]);
  test.deepEqual(geometric.polygonReflectY(polygon, 0.25), [[476,197.5],[546,197.5],[546,177.5],[566,149],[574,147.5],[576,132.5],[578,147.5],[586,149],[606,177.5],[606,197.5],[676,197.5],[676,257.5],[476,257.5]]);
  test.deepEqual(geometric.polygonReflectY(polygon, 0.75), [[476,192.5],[546,192.5],[546,212.5],[566,241],[574,242.5],[576,257.5],[578,242.5],[586,241],[606,212.5],[606,192.5],[676,192.5],[676,132.5],[476,132.5]]);

  test.deepEqual(geometric.polygonReflectY(polygon, -1), polygon);
  test.deepEqual(geometric.polygonReflectY(polygon, 2), [[476,190],[546,190],[546,230],[566,287],[574,290],[576,320],[578,290],[586,287],[606,230],[606,190],[676,190],[676,70],[476,70]]);

  test.end();
});
const tape = require("tape"),
      geometric = require("../");

tape("polygonReflectX(p) reflects a polygon horizontally", (test) => {
  const polygon = [[506,200],[546,200],[546,160],[566,103],[574,100],[576,70],[578,100],[586,103],[606,160],[606,200],[676,200],[646,320],[476,320]];

  test.deepEqual(geometric.polygonReflectX(polygon, 0), polygon);
  test.deepEqual(geometric.polygonReflectX(polygon, 1), [[646,200],[606,200],[606,160],[586,103],[578,100],[576,70],[574,100],[566,103],[546,160],[546,200],[476,200],[506,320],[676,320]]);
  test.deepEqual(geometric.polygonReflectX(polygon, 0.5), [[576,200],[576,200],[576,160],[576,103],[576,100],[576,70],[576,100],[576,103],[576,160],[576,200],[576,200],[576,320],[576,320]]);
  test.deepEqual(geometric.polygonReflectX(polygon, 0.25), [[541,200],[561,200],[561,160],[571,103],[575,100],[576,70],[577,100],[581,103],[591,160],[591,200],[626,200],[611,320],[526,320]]);
  test.deepEqual(geometric.polygonReflectX(polygon, 0.75), [[611,200],[591,200],[591,160],[581,103],[577,100],[576,70],[575,100],[571,103],[561,160],[561,200],[526,200.00000000000003],[541,320],[626,320]]);

  test.deepEqual(geometric.polygonReflectX(polygon, -1), polygon);
  test.deepEqual(geometric.polygonReflectX(polygon, 2), [[646,200],[606,200],[606,160],[586,103],[578,100],[576,70],[574,100],[566,103],[546,160],[546,200],[476,200],[506,320],[676,320]]);

  test.end();
});
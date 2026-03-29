import { strict as assert } from "assert";
import * as geometric from "../build/geometric.js";

describe("polygonUnion", () => {
  it("returns a merged polygon when two polygons overlap", () => {
    const polygonA = [
      [0, 0],
      [2, 0],
      [2, 2],
      [0, 2],
    ];
    const polygonB = [
      [1, 1],
      [3, 1],
      [3, 3],
      [1, 3],
    ];

    assert.deepEqual(geometric.polygonUnion(polygonA, polygonB), [
      [0, 0],
      [2, 0],
      [2, 1],
      [3, 1],
      [3, 3],
      [1, 3],
      [1, 2],
      [0, 2],
    ]);
  });

  it("bridges disjoint polygons into one point array", () => {
    const polygonA = [
      [0, 0],
      [2, 0],
      [2, 2],
      [0, 2],
    ];
    const polygonB = [
      [4, 0],
      [6, 0],
      [6, 2],
      [4, 2],
    ];

    assert.deepEqual(geometric.polygonUnion(polygonA, polygonB), [
      [0, 0],
      [6, 0],
      [6, 2],
      [4, 2],
      [4, 0],
      [2, 0],
      [2, 2],
      [0, 2],
    ]);
  });
});

describe("polygonIntersection", () => {
  it("returns the shared area of two overlapping polygons", () => {
    const polygonA = [
      [0, 0],
      [2, 0],
      [2, 2],
      [0, 2],
    ];
    const polygonB = [
      [1, 1],
      [3, 1],
      [3, 3],
      [1, 3],
    ];

    assert.deepEqual(geometric.polygonIntersection(polygonA, polygonB), [
      [2, 1],
      [2, 2],
      [1, 2],
      [1, 1],
    ]);
  });

  it("returns null when polygons do not overlap", () => {
    const polygonA = [
      [0, 0],
      [2, 0],
      [2, 2],
      [0, 2],
    ];
    const polygonB = [
      [4, 0],
      [6, 0],
      [6, 2],
      [4, 2],
    ];

    assert.equal(geometric.polygonIntersection(polygonA, polygonB), null);
  });
});

describe("polygonDifference", () => {
  it("returns the portion of polygonA outside polygonB", () => {
    const polygonA = [
      [0, 0],
      [2, 0],
      [2, 2],
      [0, 2],
    ];
    const polygonB = [
      [1, 1],
      [3, 1],
      [3, 3],
      [1, 3],
    ];

    assert.deepEqual(geometric.polygonDifference(polygonA, polygonB), [
      [0, 0],
      [2, 0],
      [2, 1],
      [1, 1],
      [1, 2],
      [0, 2],
    ]);
  });

  it("bridges hole-like results into one point array", () => {
    const outer = [
      [0, 0],
      [6, 0],
      [6, 6],
      [0, 6],
    ];
    const inner = [
      [2, 2],
      [4, 2],
      [4, 4],
      [2, 4],
    ];

    assert.deepEqual(geometric.polygonDifference(outer, inner), [
      [0, 0],
      [2, 2],
      [2, 4],
      [4, 4],
      [4, 2],
      [2, 2],
      [0, 0],
      [6, 0],
      [6, 6],
      [0, 6],
    ]);
  });
});

describe("polygonXor", () => {
  it("returns the symmetric difference of two polygons", () => {
    const polygonA = [
      [0, 0],
      [2, 0],
      [2, 2],
      [0, 2],
    ];
    const polygonB = [
      [1, 1],
      [3, 1],
      [3, 3],
      [1, 3],
    ];

    assert.deepEqual(geometric.polygonXor(polygonA, polygonB), [
      [0, 0],
      [2, 0],
      [2, 1],
      [3, 1],
      [3, 3],
      [1, 3],
      [1, 2],
      [2, 2],
      [2, 1],
      [1, 1],
      [1, 2],
      [0, 2],
    ]);
  });

  it("bridges disjoint polygons into one point array", () => {
    const polygonA = [
      [0, 0],
      [2, 0],
      [2, 2],
      [0, 2],
    ];
    const polygonB = [
      [4, 0],
      [6, 0],
      [6, 2],
      [4, 2],
    ];

    assert.deepEqual(geometric.polygonXor(polygonA, polygonB), [
      [0, 0],
      [6, 0],
      [6, 2],
      [4, 2],
      [4, 0],
      [2, 0],
      [2, 2],
      [0, 2],
    ]);
  });
});

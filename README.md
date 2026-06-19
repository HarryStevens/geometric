# Geometric.js

<p>
  <a href="https://harryjstevens.com/geometric/">
    <img src="img/logo.svg" alt="Geometric.js logo" width="256" />
  </a>
</p>

[![CI](https://github.com/HarryStevens/geometric/actions/workflows/ci.yml/badge.svg)](https://github.com/HarryStevens/geometric/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/geometric.svg)](https://www.npmjs.com/package/geometric)
[![npm downloads](https://img.shields.io/npm/dw/geometric.svg)](https://www.npmjs.com/package/geometric)
[![license](https://img.shields.io/npm/l/geometric.svg)](LICENSE)

Geometric.js is a JavaScript library for working with points, lines, polygons, and angles. It uses plain JavaScript arrays for geometry primitives, includes TypeScript declarations for editor autocomplete and type checking, and works in modern browsers and Node.js.

Documentation and interactive examples are on the [Geometric.js website](https://harryjstevens.com/geometric/).

- [Getting Started](https://harryjstevens.com/geometric/getting-started/)
- [API Reference](https://harryjstevens.com/geometric/api/)
- [Examples](https://harryjstevens.com/geometric/examples/)

## Install

```sh
npm install geometric -S
```

```js
import * as geometric from "geometric";
```

## Why Geometric.js?

Geometric.js keeps geometry simple. A point is an `[x, y]` array, a line is an array of two points, and a polygon is an array of points.

```js
import { pointTranslate, lineRotate, polygonScale } from "geometric";

const point = [0, 0];
const line = [
  [0, 0],
  [10, 10],
];
const polygon = [
  [0, 0],
  [10, 0],
  [10, 10],
  [0, 10],
];

const translated = pointTranslate(point, 90, 10);
const rotated = lineRotate(line, 90);
const scaled = polygonScale(polygon, 2);
```

There are no custom classes to instantiate and no special data structures to learn. The values you pass into Geometric.js are the same values you can serialize, inspect, and draw to SVG or Canvas.

## Development

```sh
pnpm install
pnpm test
```

The test suite builds the package, runs runtime tests, and checks the TypeScript declarations.

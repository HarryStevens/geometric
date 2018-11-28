# geometric
A JavaScript library with geometric functions.

## Installation

### Web browser
In vanilla, a `geometric` global is exported. You can use the latest version from unpkg.
```html
<script src="https://unpkg.com/geometric@0.0.1/build/geometric.js"></script>
<script src="https://unpkg.com/geometric@0.0.1/build/geometric.min.js"></script>
```
If you'd rather host it yourself, download the latest release from the build directory.

## npm

```bash
npm i geometric -S
```
```js
var geometric = require("geometric");
```

## API

<a name="angleDegrees" href="#angleDegrees">#</a> geometric.<b>angleDegrees</b>(<em>a</em>, <em>b</em>)

Calculate the angle between two points. Takes two arguments, each of which is a point represented as an array of two numbers, where the first number is its x coordinate and the second number is its y coordinate.

```js
geometric.angleDegrees([0, 0], [1, 0]) // 0
geometric.angleDegrees([0, 0], [-1, 0]) // 180
geometric.angleDegrees([0, 0], [0, 1]) // 90
geometric.angleDegrees([0, 0], [0, -1]) // -90
geometric.angleDegrees([0, 0], [1, 1]) // 45
geometric.angleDegrees([0, 0], [-1, -1]) // -135
```
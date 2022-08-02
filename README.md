# Geometric.js
A JavaScript library for doing geometry. [![Build Status](https://travis-ci.org/HarryStevens/geometric.svg?branch=master)](https://travis-ci.org/HarryStevens/geometric)

[<img src="https://raw.githubusercontent.com/HarryStevens/geometric/master/img/angle-thumb.png" />](https://bl.ocks.org/HarryStevens/5fe49df19892c04dfb9883c217571409)
[<img src="https://raw.githubusercontent.com/HarryStevens/geometric/master/img/length-thumb.png" />](https://bl.ocks.org/HarryStevens/c4eddfb97535e8e01643325cb43175ff)
[<img src="https://raw.githubusercontent.com/HarryStevens/geometric/master/img/centroid-thumb.png" />](https://bl.ocks.org/HarryStevens/37287b23b345f394f8276dc87a9c2bc6)

## Installation

### Web browser
In vanilla, a `geometric` global is exported. You can use the latest version from unpkg.
```html
<script src="https://unpkg.com/geometric@2.3.1/build/geometric.js"></script>
<script src="https://unpkg.com/geometric@2.3.1/build/geometric.min.js"></script>
```
If you'd rather host it yourself, download the latest release from the [`build` directory](https://github.com/HarryStevens/geometric/tree/master/build).

### npm

```bash
npm i geometric -S
```
```js
const geometric = require("geometric");
```

## API

Geometric.js uses the geometric primitives <b>points</b>, <b>lines</b>, and <b>polygons</b>.
* [<b>Points</b>](#points) are represented as arrays of two numbers, such as [0, 0].
* [<b>Lines</b>](#lines) are represented as arrays of two points, such as [[0, 0], [1, 0]]. Because they have endpoints, these are technically [line <i>segments</i>](https://web.archive.org/web/20170829200252/https://www.mhschool.com/math/mathconnects/wa/assets/docs/394_397_wa_gr3_adllsn_onln.pdf), but Geometric.js refers to them as lines for simplicity's sake.
* [<b>Polygons</b>](#polygons) are represented as arrays of vertices, each of which is a point, such as [[0, 0], [1, 0], [1, 1], [0, 1]]. Polygons can be closed – the first and last vertex are the same – or open.
* There are also functions to [calculate relationships](#relationships) between these primitives.

You will also encounter <b>angles</b>, <b>areas</b>, <b>distances</b>, and <b>lengths</b>.
* [<b>Angles</b>](#angles) are represented as numbers, measured in degrees. Geometric.js also provides functions to convert angles from [degrees to radians](#angleToRadians) or [vice versa](#angleToDegrees).
* <b>Areas</b>, <b>distances</b>, and <b>lengths</b> are represented as numbers, measured in pixels.

<hr />

### <a name="points"></a>Points

<a name="pointRotate" href="#pointRotate">#</a> geometric.<b>pointRotate</b>(<i>point</i>, <i>angle</i>[, <i>origin</i>]) · [Source](https://github.com/HarryStevens/geometric/blob/master/src/points/pointRotate.js "Source"), [Example](https://observablehq.com/@harrystevens/geometric-pointrotate "Example")

Returns the coordinates resulting from rotating a <i>point</i> about an origin by an <i>angle</i> in degrees. If <i>origin</i> is not specified, the origin defaults to [0, 0].

<a name="pointTranslate" href="#pointTranslate">#</a> geometric.<b>pointTranslate</b>(<i>point</i>, <i>angle</i>, <i>distance</i>) · [Source](https://github.com/HarryStevens/geometric/blob/master/src/points/pointTranslate.js "Source"), [Example](https://observablehq.com/@harrystevens/geometric-pointtranslate "Example")

Returns the coordinates resulting from translating a <i>point</i> by an <i>angle</i> in degrees and a <i>distance</i>.

<hr />

### <a name="lines"></a>Lines

<a name="lineAngle" href="#lineAngle">#</a> geometric.<b>lineAngle</b>(<i>line</i>) · [Source](https://github.com/HarryStevens/geometric/blob/master/src/lines/lineAngle.js "Source"), [Example](https://observablehq.com/@harrystevens/geometric-lineangle "Example")

Returns the angle of a <i>line</i>, in degrees, with respect to the horizontal axis.

<a name="lineInterpolate" href="#lineInterpolate">#</a> geometric.<b>lineInterpolate</b>(<i>line</i>) · [Source](https://github.com/HarryStevens/geometric/blob/master/src/lines/lineInterpolate.js "Source"), [Example](https://observablehq.com/@harrystevens/geometric-lineinterpolate "Example")

Returns an interpolator function given a <i>line</i> [a, b]. The returned interpolator function takes a single argument <i>t</i>, where t is a number ranging from 0 to 1; a value of 0 returns a, while a value of 1 returns b. Intermediate values interpolate from a to b along the line segment.

<a name="lineLength" href="#lineLength">#</a> geometric.<b>lineLength</b>(<i>line</i>) · [Source](https://github.com/HarryStevens/geometric/blob/master/src/lines/lineLength.js "Source"), [Example](https://observablehq.com/@harrystevens/geometric-linelength "Example")

Returns the length of a <i>line</i>.

<a name="lineMidpoint" href="#lineMidpoint">#</a> geometric.<b>lineMidpoint</b>(<i>line</i>) · [Source](https://github.com/HarryStevens/geometric/blob/master/src/lines/lineMidpoint.js "Source"), [Example](https://observablehq.com/@harrystevens/geometric-linemidpoint "Example")

Returns the midpoint of a <i>line</i>.

<hr />

### <a name="polygons"></a>Polygons

<a name="polygonArea" href="#polygonArea">#</a> geometric.<b>polygonArea</b>(<i>polygon</i>[, <i>signed</i>]) · [Source](https://github.com/HarryStevens/geometric/blob/master/src/polygons/polygonArea.js "Source"), [Example](https://observablehq.com/@harrystevens/geometric-polygonarea "Example")

Returns the area of a <i>polygon</i>. You can pass a boolean indicating whether the returned area is <i>signed</i>, which defaults to false.

<a name="polygonBounds" href="#polygonBounds">#</a> geometric.<b>polygonBounds</b>(<i>polygon</i>) · [Source](https://github.com/HarryStevens/geometric/blob/master/src/polygons/polygonBounds.js "Source"), [Example](https://observablehq.com/@harrystevens/geometric-polygonbounds "Example")

Returns the bounds of a <i>polygon</i>, ignoring points with invalid values (null, undefined, NaN, Infinity). The returned bounds are represented as an array of two points, where the first point is the top-left corner and the second point is the bottom-right corner. For example:

```js
const rectangle = [[0, 0], [0, 1], [1, 1], [1, 0]];
const bounds = geometric.polygonBounds(rectangle); // [[0, 0], [1, 1]]
```

Returns null if the <i>polygon</i> has fewer than three points.

<a name="polygonCentroid" href="#polygonCentroid">#</a> geometric.<b>polygonCentroid</b>(<i>polygon</i>) · [Source](https://github.com/HarryStevens/geometric/blob/master/src/polygons/polygonCentroid.js "Source"), [Example](https://observablehq.com/@harrystevens/geometric-polygoncentroid-geometric-polygonmean "Example")

Returns the weighted centroid of a <i>polygon</i>. Not to be [confused](https://github.com/Turfjs/turf/issues/334) with a [mean center](#polygonMean).

<a name="polygonHull" href="#polygonHull">#</a> geometric.<b>polygonHull</b>(<i>points</i>) · [Source](https://github.com/HarryStevens/geometric/blob/master/src/polygons/polygonHull.js "Source"), [Example](https://observablehq.com/@harrystevens/geometric-polygonhull "Example")

Returns the [convex hull](https://en.wikipedia.org/wiki/Convex_hull), represented as a polygon, for an array of <i>points</i>. Returns null if the input array has fewer than three points. Uses [Andrew’s monotone chain algorithm](https://en.wikibooks.org/wiki/Algorithm_Implementation/Geometry/Convex_hull/Monotone_chain#JavaScript).

<a name="polygonLength" href="#polygonLength">#</a> geometric.<b>polygonLength</b>(<i>polygon</i>) · [Source](https://github.com/HarryStevens/geometric/blob/master/src/polygons/polygonLength.js "Source"), [Example](https://observablehq.com/@harrystevens/geometric-polygonlength "Example")

Returns the length of a <i>polygon</i>'s perimeter.

<a name="polygonMean" href="#polygonMean">#</a> geometric.<b>polygonMean</b>(<i>polygon</i>) · [Source](https://github.com/HarryStevens/geometric/blob/master/src/polygons/polygonMean.js "Source"), [Example](https://observablehq.com/@harrystevens/geometric-polygoncentroid-geometric-polygonmean "Example")

Returns the arithmetic mean of the vertices of a polygon. Keeps duplicate vertices, resulting in different values for open and closed polygons. Not to be [confused](https://github.com/Turfjs/turf/issues/334) with a [centroid](#polygonCentroid).

<a name="polygonRandom" href="#polygonRandom">#</a> geometric.<b>polygonRandom</b>([<i>sides</i>[, <i>area</i>[, <i>centroid</i>]]]) · [Source](https://github.com/HarryStevens/geometric/blob/master/src/polygons/polygonRandom.js "Source"), [Example](https://observablehq.com/@harrystevens/geometric-polygonrandom "Example")

Returns the vertices of a random convex polygon of the specified number of <i>sides</i>, <i>area</i>, and <i>centroid</i> coordinates. If <i>sides</i> is not specified, defaults to 3. If <i>area</i> is not specified, defaults to 100. If <i>centroid</i> is not specified, defaults to [0, 0]. Based on an algorithm by Pavel Valtr and an [implementation by Maneesh Agrawala](https://observablehq.com/@magrawala/random-convex-polygon).

<a name="polygonRegular" href="#polygonRegular">#</a> geometric.<b>polygonRegular</b>([<i>sides</i>[, <i>area</i>[, <i>center</i>]]]) · [Source](https://github.com/HarryStevens/geometric/blob/master/src/polygons/polygonRegular.js "Source"), [Example](https://observablehq.com/@harrystevens/geometric-polygonregular "Example")

Returns the vertices of a regular polygon of the specified number of <i>sides</i>, <i>area</i>, and <i>center</i> coordinates. If <i>sides</i> is not specified, defaults to 3. If <i>area</i> is not specified, defaults to 100. If <i>center</i> is not specified, defaults to [0, 0].

<a name="polygonRotate" href="#polygonRotate">#</a> geometric.<b>polygonRotate</b>(<i>polygon</i>, <i>angle</i>[, <i>origin</i>]) · [Source](https://github.com/HarryStevens/geometric/blob/master/src/polygons/polygonRotate.js "Source"), [Example](https://observablehq.com/@harrystevens/geometric-polygonrotate "Example")

Returns the vertices resulting from rotating a <i>polygon</i> about an origin by an <i>angle</i> in degrees. If <i>origin</i> is not specified, the origin defaults to [0, 0].

<a name="polygonScale" href="#polygonScale">#</a> geometric.<b>polygonScale</b>(<i>polygon</i>, <i>scaleFactor</i>[, <i>origin</i>]) · [Source](https://github.com/HarryStevens/geometric/blob/master/src/polygons/polygonScale.js "Source"), [Example](https://observablehq.com/@harrystevens/geometric-polygonscale "Example")

Returns the vertices resulting from scaling a <i>polygon</i> by a <i>scaleFactor</i> (where 1 is the polygon's current size) from an origin point. If <i>origin</i> is not specified, the origin defaults to the polygon's centroid.

The returned polygon's area is equal to the input polygon's area multiplied by the square of the <i>scaleFactor</i>. To scale the polygon's area by the <i>scaleFactor</i> itself, see <a href="#polygonScaleArea">geometric.polygonScaleArea</a>.

<a name="polygonScaleArea" href="#polygonScaleArea">#</a> geometric.<b>polygonScaleArea</b>(<i>polygon</i>, <i>scaleFactor</i>[, <i>origin</i>]) · [Source](https://github.com/HarryStevens/geometric/blob/master/src/polygons/polygonScaleArea.js "Source"), [Example](https://observablehq.com/@harrystevens/geometric-polygonscalearea "Example")

Returns the vertices resulting from scaling a <i>polygon</i> by a <i>scaleFactor</i> (where 1 is the polygon's current size) from an origin point. If <i>origin</i> is not specified, the origin defaults to the polygon's centroid.

The returned polygon's area is equal to the input polygon's area multiplied by the <i>scaleFactor</i>. To scale the polygon's area by the square of the <i>scaleFactor</i>, see <a href="#polygonScale">geometric.polygonScale</a>.

<a name="polygonScaleX" href="#polygonScaleX">#</a> geometric.<b>polygonScaleX</b>(<i>polygon</i>, <i>scaleFactor</i>[, <i>origin</i>]) · [Source](https://github.com/HarryStevens/geometric/blob/master/src/polygons/polygonScaleX.js "Source"), [Example](https://observablehq.com/@harrystevens/geometric-polygonscalex "Example")

Returns the vertices resulting from scaling the horizontal coordinates of a <i>polygon</i> by a <i>scaleFactor</i> (where 1 is the polygon's current size) from an origin point. The vertical coordinates remain unchanged. If <i>origin</i> is not specified, the origin defaults to the polygon's centroid.

<a name="polygonScaleY" href="#polygonScaleY">#</a> geometric.<b>polygonScaleY</b>(<i>polygon</i>, <i>scaleFactor</i>[, <i>origin</i>]) · [Source](https://github.com/HarryStevens/geometric/blob/master/src/polygons/polygonScaleY.js "Source"), [Example](https://observablehq.com/@harrystevens/geometric-polygonscaley "Example")

Returns the vertices resulting from scaling the vertical coordinates of a <i>polygon</i> by a <i>scaleFactor</i> (where 1 is the polygon's current size) from an origin point. The horizontal coordinates remain unchanged. If <i>origin</i> is not specified, the origin defaults to the polygon's centroid.

<a name="polygonTranslate" href="#polygonTranslate">#</a> geometric.<b>polygonTranslate</b>(<i>polygon</i>, <i>angle</i>, <i>distance</i>) · [Source](https://github.com/HarryStevens/geometric/blob/master/src/polygons/polygonTranslate.js "Source"), [Example](https://observablehq.com/@harrystevens/geometric-polygontranslate "Example")

Returns the vertices resulting from translating a <i>polygon</i> by an <i>angle</i> in degrees and a <i>distance</i>.

<hr />

### <a name="relationships"></a>Relationships

<a name="lineIntersectsLine" href="#lineIntersectsLine">#</a> geometric.<b>lineIntersectsLine</b>(<i>lineA</i>, <i>lineB</i>) · [Source](https://github.com/HarryStevens/geometric/blob/master/src/relationships/lineIntersectsLine.js "Source"), [Example](https://observablehq.com/@harrystevens/geometric-lineintersectsline "Example")

Returns a boolean representing whether <i>lineA</i> intersects <i>lineB</i>.

<a name="lineIntersectsPolygon" href="#lineIntersectsPolygon">#</a> geometric.<b>lineIntersectsPolygon</b>(<i>line</i>, <i>polygon</i>) · [Source](https://github.com/HarryStevens/geometric/blob/master/src/relationships/lineIntersectsPolygon.js "Source"), [Example](https://observablehq.com/@harrystevens/geometric-lineintersectspolygon "Example")

Returns a boolean representing whether a <i>line</i> intersects a <i>polygon</i>.

<a name="pointInPolygon" href="#pointInPolygon">#</a> geometric.<b>pointInPolygon</b>(<i>point</i>, <i>polygon</i>) · [Source](https://github.com/HarryStevens/geometric/blob/master/src/relationships/pointInPolygon.js "Source"), [Example](https://observablehq.com/@harrystevens/geometric-pointinpolygon "Example")

Returns a boolean representing whether a <i>point</i> is inside of a <i>polygon</i>. Uses [ray casting](https://en.wikipedia.org/wiki/Point_in_polygon#Ray_casting_algorithm).

<a name="pointOnPolygon" href="#pointOnPolygon">#</a> geometric.<b>pointOnPolygon</b>(<i>point</i>, <i>polygon</i>[, <i>epsilon</i>]) · [Source](https://github.com/HarryStevens/geometric/blob/master/src/relationships/pointOnPolygon.js "Source"), [Example](https://observablehq.com/@harrystevens/geometric-pointonpolygon "Example")

Returns a boolean representing whether a <i>point</i> is located on one of the edges of a <i>polygon</i>. An optional <i>epsilon</i> number, such as 1e-6, can be passed to reduce the precision with which the relationship is measured.

<a name="pointOnLine" href="#pointOnLine">#</a> geometric.<b>pointOnLine</b>(<i>point</i>, <i>line</i>[, <i>epsilon</i>]) · [Source](https://github.com/HarryStevens/geometric/blob/master/src/relationships/pointOnLine.js#L17 "Source"), [Example](https://observablehq.com/@harrystevens/geometric-pointonline-geometric-pointwithline "Example")

Returns a boolean representing whether a <i>point</i> is collinear with a <i>line</i> and is also located on the line segment. An optional <i>epsilon</i> number, such as 1e-6, can be passed to reduce the precision with which the relationship is measured. See also [pointWithLine](#pointWithLine).

[<img width="150" src="https://raw.githubusercontent.com/HarryStevens/geometric/master/img/point-on-with-line.png" />](https://observablehq.com/d/c463ce4b7cbcd048)

<a name="pointWithLine" href="#pointWithLine">#</a> geometric.<b>pointWithLine</b>(<i>point</i>, <i>line</i>[, <i>epsilon</i>]) · [Source](https://github.com/HarryStevens/geometric/blob/master/src/relationships/pointOnLine.js#L21 "Source"), [Example](https://observablehq.com/@harrystevens/geometric-pointonline-geometric-pointwithline "Example")

Returns a boolean representing whether a <i>point</i> is collinear with a <i>line</i>. An optional <i>epsilon</i> number, such as 1e-6, can be passed to reduce the precision with which the relationship is measured. See also [pointOnLine](#pointOnLine).

<a name="pointLeftofLine" href="#pointLeftofLine">#</a> geometric.<b>pointLeftofLine</b>(<i>point</i>, <i>line</i>) · [Source](https://github.com/HarryStevens/geometric/blob/master/src/relationships/pointOnLine.js#L9 "Source"), [Example](https://observablehq.com/@harrystevens/geometric-pointleftofline-geometric-pointrightofline-g "Example")

Returns a boolean representing whether a <i>point</i> is to the left of a <i>line</i>.

<a name="pointRightofLine" href="#pointRightofLine">#</a> geometric.<b>pointRightofLine</b>(<i>point</i>, <i>line</i>) · [Source](https://github.com/HarryStevens/geometric/blob/master/src/relationships/pointOnLine.js#L13 "Source"), [Example](https://observablehq.com/@harrystevens/geometric-pointleftofline-geometric-pointrightofline-g "Example")

Returns a boolean representing whether a <i>point</i> is to the right of a <i>line</i>.

<a name="polygonInPolygon" href="#polygonInPolygon">#</a> geometric.<b>polygonInPolygon</b>(<i>polygonA</i>, <i>polygonB</i>) · [Source](https://github.com/HarryStevens/geometric/blob/master/src/relationships/polygonInPolygon.js "Source"), [Example](https://observablehq.com/@harrystevens/geometric-polygoninpolygon "Example")

Returns a boolean representing whether <i>polygonA</i> is contained by <i>polygonB</i>.

<a name="polygonIntersectsPolygon" href="#polygonIntersectsPolygon">#</a> geometric.<b>polygonIntersectsPolygon</b>(<i>polygonA</i>, <i>polygonB</i>) · [Source](https://github.com/HarryStevens/geometric/blob/master/src/relationships/polygonIntersectsPolygon.js "Source"), [Example](https://observablehq.com/@harrystevens/geometric-polygonintersectspolygon "Example")

Returns a boolean representing whether <i>polygonA</i> intersects but is not contained by <i>polygonB</i>.

<hr />

### Angles

<a name="angleReflect" href="#angleReflect">#</a> geometric.<b>angleReflect</b>(<i>incidence</i>, <i>surface</i>) · [Source](https://github.com/HarryStevens/geometric/blob/master/src/angles/angleReflect.js "Source"), [Example](https://observablehq.com/@harrystevens/geometric-anglereflect "Example")

Returns the angle of reflection given a starting angle, also known as the angle of <i>incidence</i>, and the angle of the <i>surface</i> off of which it is reflected.

<a name="angleToDegrees" href="#angleToDegrees">#</a> geometric.<b>angleToDegrees</b>(<i>angle</i>) · [Source](https://github.com/HarryStevens/geometric/blob/master/src/angles/angleToDegrees.js "Source")

Returns the result of a converting an <i>angle</i> in radians to the same angle in degrees.

<a name="angleToRadians" href="#angleToRadians">#</a> geometric.<b>angleToRadians</b>(<i>angle</i>) · [Source](https://github.com/HarryStevens/geometric/blob/master/src/angles/angleToRadians.js "Source")

Returns the result of a converting an <i>angle</i> in degrees to the same angle in radians.

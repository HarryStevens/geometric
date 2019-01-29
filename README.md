# Geometric.js
A JavaScript library for doing geometry. [![Build Status](https://travis-ci.org/HarryStevens/geometric.svg?branch=master)](https://travis-ci.org/HarryStevens/geometric)

[<img src="https://raw.githubusercontent.com/HarryStevens/geometric/master/img/angle-thumb.png" />](https://bl.ocks.org/HarryStevens/5fe49df19892c04dfb9883c217571409)
[<img src="https://raw.githubusercontent.com/HarryStevens/geometric/master/img/length-thumb.png" />](https://bl.ocks.org/HarryStevens/c4eddfb97535e8e01643325cb43175ff)
[<img src="https://raw.githubusercontent.com/HarryStevens/geometric/master/img/centroid-thumb.png" />](https://bl.ocks.org/HarryStevens/37287b23b345f394f8276dc87a9c2bc6)

## Installation

### Web browser
In vanilla, a `geometric` global is exported. You can use the latest version from unpkg.
```html
<script src="https://unpkg.com/geometric@1.0.6/build/geometric.js"></script>
<script src="https://unpkg.com/geometric@1.0.6/build/geometric.min.js"></script>
```
If you'd rather host it yourself, download the latest release from the [`build` directory](https://github.com/HarryStevens/geometric/tree/master/build).

### npm

```bash
npm i geometric -S
```
```js
var geometric = require("geometric");
```

## API

Geometric.js uses the geometric primitives <b>points</b>, <b>lines</b>, and <b>polygons</b>.
* [<b>Points</b>](#points) are represented as arrays of two numbers, such as [0, 0].
* [<b>Lines</b>](#lines) are represented as arrays of two points, such as [[0, 0], [1, 0]]. Because they have endpoints, these are technically [line <em>segments</em>](https://www.mhschool.com/math/mathconnects/wa/assets/docs/394_397_wa_gr3_adllsn_onln.pdf), but Geometric.js refers to them as lines for simplicity's sake.
* [<b>Polygons</b>](#polygons) are represented as arrays of vertices, each of which is a point, such as [[0, 0], [1, 0], [1, 1], [0, 1]]. Polygons can be closed – the first and last vertex are the same – or open.
* There are also functions to [calculate relationships](#relationships) between these primitives.

You will also encounter <b>angles</b>, <b>areas</b>, <b>distances</b>, and <b>lengths</b>.
* [<b>Angles</b>](#angles) are represented as numbers, measured in degrees. Geometric.js also provides functions to convert angles from [degrees to radians](#degreesToRadians) or [vice versa](#radiansToDegrees).
* <b>Areas</b>, <b>distances</b>, and <b>lengths</b> are represented as numbers, measured in pixels.

<hr />

### <a name="points"></a>Points

<a name="pointRotate" href="#pointRotate">#</a> geometric.<b>pointRotate</b>(<em>point</em>, <em>angle</em>[, <em>origin</em>]) [<>](https://github.com/HarryStevens/geometric/blob/master/src/points/pointRotate.js "Source")

Returns the coordinates resulting from rotating a <em>point</em> about an origin by an <em>angle</em> in degrees. If <em>origin</em> is not specified, the origin defaults to [0, 0].

<a name="pointTranslate" href="#pointTranslate">#</a> geometric.<b>pointTranslate</b>(<em>point</em>, <em>angle</em>, <em>distance</em>) [<>](https://github.com/HarryStevens/geometric/blob/master/src/points/pointTranslate.js "Source")

Returns the coordinates resulting from translating a <em>point</em> by an <em>angle</em> in degrees and a <em>distance</em>.

<hr />

### <a name="lines"></a>Lines

<a name="lineAngle" href="#lineAngle">#</a> geometric.<b>lineAngle</b>(<em>pointA</em>, <em>pointB</em>) [<>](https://github.com/HarryStevens/geometric/blob/master/src/lines/lineAngle.js "Source")

Returns the angle of a <em>line</em> in degrees.

<a name="lineLength" href="#lineLength">#</a> geometric.<b>lineLength</b>(<em>line</em>) [<>](https://github.com/HarryStevens/geometric/blob/master/src/lines/lineLength.js "Source")

Returns the length of a <em>line</em>.

<a name="lineMidpoint" href="#lineMidpoint">#</a> geometric.<b>lineMidpoint</b>(<em>line</em>) [<>](https://github.com/HarryStevens/geometric/blob/master/src/lines/lineMidpoint.js "Source")

Returns the midpoint of a <em>line</em>.

<hr />

### <a name="polygons"></a>Polygons

<a name="polygonArea" href="#polygonArea">#</a> geometric.<b>polygonArea</b>(<em>polygon</em>) [<>](https://github.com/HarryStevens/geometric/blob/master/src/polygons/polygonArea.js "Source")

Returns the area of a <em>polygon</em>.

<a name="polygonCentroid" href="#polygonCentroid">#</a> geometric.<b>polygonCentroid</b>(<em>polygon</em>) [<>](https://github.com/HarryStevens/geometric/blob/master/src/polygons/polygonCentroid.js "Source")

Returns the weighted centroid of a <em>polygon</em>. Not to be [confused](https://github.com/Turfjs/turf/issues/334) with a [mean center](#polygonMean).

<a name="polygonHull" href="#polygonHull">#</a> geometric.<b>polygonHull</b>(<em>points</em>) [<>](https://github.com/HarryStevens/geometric/blob/master/src/polygons/polygonHull.js "Source")

Returns the [convex hull](https://en.wikipedia.org/wiki/Convex_hull), represented as a polygon, for an array of <em>points</em>. Returns null if the input array has fewer than three points. Uses [Andrew’s monotone chain algorithm](https://en.wikibooks.org/wiki/Algorithm_Implementation/Geometry/Convex_hull/Monotone_chain#JavaScript).

<a name="polygonLength" href="#polygonLength">#</a> geometric.<b>polygonLength</b>(<em>polygon</em>) [<>](https://github.com/HarryStevens/geometric/blob/master/src/polygons/polygonLength.js "Source")

Returns the length of a polygon's perimeter.

<a name="polygonMean" href="#polygonMean">#</a> geometric.<b>polygonMean</b>(<em>polygon</em>) [<>](https://github.com/HarryStevens/geometric/blob/master/src/polygons/polygonMean.js "Source")

Returns the arithmetic mean of the vertices of a polygon. Keeps duplicate vertices, resulting in different values for open and closed polygons. Not to be [confused](https://github.com/Turfjs/turf/issues/334) with a [centroid](#polygonCentroid).

<hr />

### <a name="points"></a>Relationships

<a name="lineIntersectsLine" href="#lineIntersectsLine">#</a> geometric.<b>lineIntersectsLine</b>(<em>lineA</em>, <em>lineB</em>) [<>](https://github.com/HarryStevens/geometric/blob/master/src/relationships/lineIntersectsLine.js "Source")

Returns a boolean representing whether <em>lineA</em> intersects <em>lineB</em>.

<a name="lineIntersectsPolygon" href="#lineIntersectsPolygon">#</a> geometric.<b>lineIntersectsPolygon</b>(<em>line</em>, <em>polygon</em>) [<>](https://github.com/HarryStevens/geometric/blob/master/src/relationships/lineIntersectsPolygon.js "Source")

Returns a boolean representing whether a <em>line</em> intersects a <em>polygon</em>.

<a name="pointInPolygon" href="#pointInPolygon">#</a> geometric.<b>pointInPolygon</b>(<em>point</em>, <em>polygon</em>) [<>](https://github.com/HarryStevens/geometric/blob/master/src/relationships/pointInPolygon.js "Source")

Returns a boolean representing whether a <em>point</em> is inside of a <em>polygon</em>. Uses [ray casting](https://en.wikipedia.org/wiki/Point_in_polygon#Ray_casting_algorithm).

<a name="pointLeftofLine" href="#pointLeftofLine">#</a> geometric.<b>pointLeftofLine</b>(<em>point</em>, <em>line</em>) [<>](https://github.com/HarryStevens/geometric/blob/master/src/relationships/pointOnLine.js#L8 "Source")

Returns a boolean representing whether a <em>point</em> is to the left of a <em>line</em>.

<a name="pointOnLine" href="#pointOnLine">#</a> geometric.<b>pointOnLine</b>(<em>point</em>, <em>line</em>) [<>](https://github.com/HarryStevens/geometric/blob/master/src/relationships/pointOnLine.js#L16 "Source")

Returns a boolean representing whether a <em>point</em> is collinear with a <em>line</em>.

<a name="pointRightofLine" href="#pointRightofLine">#</a> geometric.<b>pointRightofLine</b>(<em>point</em>, <em>line</em>) [<>](https://github.com/HarryStevens/geometric/blob/master/src/relationships/pointOnLine.js#L12 "Source")

Returns a boolean representing whether a <em>point</em> is to the right of a <em>line</em>.

<a name="polygonInPolygon" href="#polygonInPolygon">#</a> geometric.<b>polygonInPolygon</b>(<em>polygonA</em>, <em>polygonB</em>) [<>](https://github.com/HarryStevens/geometric/blob/master/src/relationships/polygonInPolygon.js "Source")

Returns a boolean representing whether <em>polygonA</em> is contained by <em>polygonB</em>.

<a name="polygonIntersectsPolygon" href="#polygonIntersectsPolygon">#</a> geometric.<b>polygonIntersectsPolygon</b>(<em>polygonA</em>, <em>polygonB</em>) [<>](https://github.com/HarryStevens/geometric/blob/master/src/relationships/polygonIntersectsPolygon.js "Source")

Returns a boolean representing whether <em>polygonA</em> intersects but is not contained by <em>polygonB</em>.

<hr />

### Angles

<a name="angleReflect" href="#angleReflect">#</a> geometric.<b>angleReflect</b>(<em>incidenceAngle</em>, <em>surfaceAngle</em>) [<>](https://github.com/HarryStevens/geometric/blob/master/src/angles/angleReflect.js "Source")

Returns the angle of reflection given a starting angle, also known as the angle of incidence, and the angle of the surface of of which it is reflected.

<a name="degreesToRadians" href="#degreesToRadians">#</a> geometric.<b>degreesToRadians</b>(<em>angle</em>) [<>](https://github.com/HarryStevens/geometric/blob/master/src/utils/degreesToRadians.js "Source")

Returns the result of a converting an <em>angle</em> in degrees to the same angle in radians.

<a name="radiansToDegrees" href="#radiansToDegrees">#</a> geometric.<b>radiansToDegrees</b>(<em>angle</em>) [<>](https://github.com/HarryStevens/geometric/blob/master/src/utils/radiansToDegrees.js "Source")

Returns the result of a converting an <em>angle</em> in radians to the same angle in degrees.
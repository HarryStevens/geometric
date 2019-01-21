// https://github.com/HarryStevens/geometric#readme Version 1.0.2. Copyright 2019 Harry Stevens.
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.geometric = {})));
}(this, (function (exports) { 'use strict';

  // Calculates the angle of a line, in degrees.
  function lineAngle(line){
    return Math.atan2(line[1][1] - line[0][1], line[1][0] - line[0][0]) * 180 / Math.PI;
  }

  // Calculates the distance between the endpoints of a line segment.
  function lineLength(line){
    return Math.sqrt(Math.pow(line[1][0] - line[0][0], 2) + Math.pow(line[1][1] - line[0][1], 2));
  }

  // Calculates the midpoint of a line segment.
  function lineMidpoint(line){
    return [(line[0][0] + line[1][0]) / 2, (line[0][1] + line[1][1]) / 2];
  }

  // Rotates a point by an angle in degrees around an origin.
  function pointRotate(point, angle, origin){
    angle = angle / 180 * Math.PI;
    if (!origin || origin === [0, 0]){
      return rotate(point, angle);
    }

    else {
      // See: https://math.stackexchange.com/questions/1964905/rotation-around-non-zero-point
      var p0 = point.map(function(c, i){ return c - origin[i]; });
      var r = rotate(p0, angle);
      return r.map(function(c, i){ return c + origin[i]; });
    }
    
    function rotate(point, angle){
      // See: https://en.wikipedia.org/wiki/Cartesian_coordinate_system#Rotation
      return [(point[0] * Math.cos(angle)) - point[1] * Math.sin(angle), (point[0] * Math.sin(angle)) + point[1] * Math.cos(angle)];
    }
  }

  // Translates a point by an angle in degrees and distance
  function pointTranslate(point, angle, distance){
    angle = angle / 180 * Math.PI;
    return [point[0] + distance * Math.cos(angle), point[1] + distance * Math.sin(angle)];
  }

  // Calculates the area of a polygon.
  function polygonArea(vertices){
    var a = 0;

    for (var i = 0, l = vertices.length; i < l; i++) {
      var v0 = vertices[i],
          v1 = vertices[i === l - 1 ? 0 : i + 1];

      a += v0[0] * v1[1];
      a -= v1[0] * v0[1];
    }

    return Math.abs(a / 2);
  }

  // Calculates the weighted centroid a polygon.
  function polygonCentroid(vertices){
    var a = 0, x = 0, y = 0, l = vertices.length;

    for (var i = 0; i < l; i++) {
      var s = i === l - 1 ? 0 : i + 1,
          v0 = vertices[i],
          v1 = vertices[s],
          f = (v0[0] * v1[1]) - (v1[0] * v0[1]);

      a += f;
      x += (v0[0] + v1[0]) * f;
      y += (v0[1] + v1[1]) * f;
    }

    var d = a * 3;

    return [x / d, y / d];
  }

  // See https://en.wikibooks.org/wiki/Algorithm_Implementation/Geometry/Convex_hull/Monotone_chain#JavaScript
  // and https://math.stackexchange.com/questions/274712/calculate-on-which-side-of-a-straight-line-is-a-given-point-located
  function cross (a, b, o){
    return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])     
  }

  // Caclulates the convex hull of a set of points.
  // See https://en.wikibooks.org/wiki/Algorithm_Implementation/Geometry/Convex_hull/Monotone_chain#JavaScript
  function polygonHull(points){
    if (points.length < 3) { return null; }

    points.sort(function(a, b) {
      return a[0] === b[0] ? a[1] - b[1] : a[0] - b[0];
    });

    var lower = [];
    for (var i0 = 0; i0 < points.length; i0++) {
      while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], points[i0]) <= 0) {
         lower.pop();
      }
      lower.push(points[i0]);
    }

    var upper = [];
    for (var i1 = points.length - 1; i1 >= 0; i1--) {
      while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], points[i1]) <= 0) {
         upper.pop();
      }
      upper.push(points[i1]);
    }

    upper.pop();
    lower.pop();

    return lower.concat(upper);
  }

  // Calculates the length of a polygon's perimeter. See https://github.com/d3/d3-polygon/blob/master/src/length.js
  function polygonLength(vertices){
    var i = -1,
        n = vertices.length,
        b = vertices[n - 1],
        xa,
        ya,
        xb = b[0],
        yb = b[1],
        perimeter = 0;

    while (++i < n) {
      xa = xb;
      ya = yb;
      b = vertices[i];
      xb = b[0];
      yb = b[1];
      xa -= xb;
      ya -= yb;
      perimeter += Math.sqrt(xa * xa + ya * ya);
    }

    return perimeter;
  }

  // Calculates the arithmetic mean of a polygon's vertices.
  function polygonMean(vertices){
    var x = 0, y = 0, l = vertices.length;

    for (var i = 0; i < l; i++) {
      var v = vertices[i];        

      x += v[0];
      y += v[1];
    }

    return [x / l, y / l];
  }

  // Determines if lineA intersects lineB. 
  // See: https://stackoverflow.com/questions/9043805/test-if-two-lines-intersect-javascript-function/24392281#24392281
  // Returns a boolean.
  function lineIntersectsLine(lineA, lineB) {
    var a = lineA[0][0],
        b = lineA[0][1],
        c = lineA[1][0],
        d = lineA[1][1],
        p = lineB[0][0],
        q = lineB[0][1],
        r = lineB[1][0],
        s = lineB[1][1],
        det, gamma, lambda;

    det = (c - a) * (s - q) - (r - p) * (d - b);
    if (det === 0) {
      return false;
    } else {
      lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
      gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
      return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
    }
  }

  // Determines whether a point is inside of a polygon, represented as an array of vertices.
  // From https://github.com/substack/point-in-polygon/blob/master/index.js,
  // based on the ray-casting algorithm from https://web.archive.org/web/20180115151705/https://wrf.ecse.rpi.edu//Research/Short_Notes/pnpoly.html
  // Wikipedia: https://en.wikipedia.org/wiki/Point_in_polygon#Ray_casting_algorithm
  // Returns a boolean.
  function pointInPolygon(point, vertices) {
    var x = point[0], y = point[1];
    
    var inside = false;
    for (var i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
      var xi = vertices[i][0], yi = vertices[i][1];
      var xj = vertices[j][0], yj = vertices[j][1];
    
      if (((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) { inside = !inside; }
    }
    
    return inside;
  }

  // See https://math.stackexchange.com/questions/274712/calculate-on-which-side-of-a-straight-line-is-a-given-point-located
  function topPointFirst(line){
    return line[1][1] > line[0][1] ? line : [line[1], line[0]];
  }

  function pointLeftofLine(point, line){
    var t = topPointFirst(line);
    return cross(point, t[1], t[0]) < 0;
  }
  function pointRightofLine(point, line){
    var t = topPointFirst(line);
    return cross(point, t[1], t[0]) > 0;
  }
  function pointOnLine(point, line){
    return cross(point, line[0], line[1]) === 0;
  }

  // Determines whether a polygon is contained by another polygon.
  // Polygons are represented as an array of vertices, each of which is an array of two numbers,
  // where the first number represents its x-coordinate and the second its y-coordinate.
  // Returns a boolean.
  function polygonInPolygon(verticesA, verticesB){
    return verticesA.every(function(p){ return pointInPolygon(p, verticesB); });
  }

  // Determines whether a polygon intersects but is not contained by another polygon.
  // Polygons are represented as an array of vertices, each of which is an array of two numbers,
  // where the first number represents its x-coordinate and the second its y-coordinate.
  // Returns a boolean.
  function polygonIntersectsPolygon(verticesA, verticesB){
    return verticesA.some(function(p){ return pointInPolygon(p, verticesB); }) &&
          !verticesA.every(function(p){ return pointInPolygon(p, verticesB); });
  }

  // Converts degrees to radians.
  function degreesToRadians(angle){
    return angle / 180 * Math.PI;
  }

  // Converts radians to degrees.
  function radiansToDegrees(angle){
    return angle * 180 / Math.PI;
  }

  exports.lineAngle = lineAngle;
  exports.lineLength = lineLength;
  exports.lineMidpoint = lineMidpoint;
  exports.pointRotate = pointRotate;
  exports.pointTranslate = pointTranslate;
  exports.polygonArea = polygonArea;
  exports.polygonCentroid = polygonCentroid;
  exports.polygonHull = polygonHull;
  exports.polygonLength = polygonLength;
  exports.polygonMean = polygonMean;
  exports.lineIntersectsLine = lineIntersectsLine;
  exports.pointInPolygon = pointInPolygon;
  exports.pointLeftofLine = pointLeftofLine;
  exports.pointRightofLine = pointRightofLine;
  exports.pointOnLine = pointOnLine;
  exports.polygonInPolygon = polygonInPolygon;
  exports.polygonIntersectsPolygon = polygonIntersectsPolygon;
  exports.degreesToRadians = degreesToRadians;
  exports.radiansToDegrees = radiansToDegrees;

  Object.defineProperty(exports, '__esModule', { value: true });

})));

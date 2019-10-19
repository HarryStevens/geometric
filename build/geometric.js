// https://github.com/HarryStevens/geometric#readme Version 2.2.0. Copyright 2019 Harry Stevens.
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.geometric = {})));
}(this, (function (exports) { 'use strict';

  // Converts radians to degrees.
  function angleToDegrees(angle) {
    return angle * 180 / Math.PI;
  }

  function lineAngle(line) {
    return angleToDegrees(Math.atan2(line[1][1] - line[0][1], line[1][0] - line[0][0]));
  }

  // Calculates the distance between the endpoints of a line segment.
  function lineLength(line) {
    return Math.sqrt(Math.pow(line[1][0] - line[0][0], 2) + Math.pow(line[1][1] - line[0][1], 2));
  }

  // Converts degrees to radians.
  function angleToRadians(angle) {
    return angle / 180 * Math.PI;
  }

  function pointTranslate(point, angle, distance) {
    var r = angleToRadians(angle);
    return [point[0] + distance * Math.cos(r), point[1] + distance * Math.sin(r)];
  }

  // The returned interpolator function takes a single argument t, where t is a number ranging from 0 to 1;
  // a value of 0 returns a, while a value of 1 returns b.
  // Intermediate values interpolate from start to end along the line segment.

  function lineInterpolate(line) {
    return function (t) {
      return t === 0 ? line[0] : t === 1 ? line[1] : pointTranslate(line[0], lineAngle(line), lineLength(line) * t);
    };
  }

  // Calculates the midpoint of a line segment.
  function lineMidpoint(line) {
    return [(line[0][0] + line[1][0]) / 2, (line[0][1] + line[1][1]) / 2];
  }

  function pointRotate(point, angle, origin) {
    var r = angleToRadians(angle);

    if (!origin || origin[0] === 0 && origin[1] === 0) {
      return rotate(point, r);
    } else {
      // See: https://math.stackexchange.com/questions/1964905/rotation-around-non-zero-point
      var p0 = point.map(function (c, i) {
        return c - origin[i];
      });
      var rotated = rotate(p0, r);
      return rotated.map(function (c, i) {
        return c + origin[i];
      });
    }

    function rotate(point, angle) {
      // See: https://en.wikipedia.org/wiki/Cartesian_coordinate_system#Rotation
      return [point[0] * Math.cos(angle) - point[1] * Math.sin(angle), point[0] * Math.sin(angle) + point[1] * Math.cos(angle)];
    }
  }

  // Calculates the area of a polygon.
  function polygonArea(vertices) {
    var signed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var a = 0;

    for (var i = 0, l = vertices.length; i < l; i++) {
      var v0 = vertices[i],
          v1 = vertices[i === l - 1 ? 0 : i + 1];
      a += v0[0] * v1[1];
      a -= v1[0] * v0[1];
    }

    return signed ? a / 2 : Math.abs(a / 2);
  }

  // Calculates the bounds of a polygon.
  function polygonBounds(polygon) {
    if (polygon.length < 3) {
      return null;
    }

    var xMin = Infinity,
        xMax = -Infinity,
        yMin = Infinity,
        yMax = -Infinity,
        found = false;

    for (var i = 0, l = polygon.length; i < l; i++) {
      var p = polygon[i],
          x = p[0],
          y = p[1];

      if (x != null && isFinite(x) && y != null && isFinite(y)) {
        found = true;
        if (x < xMin) xMin = x;
        if (x > xMax) xMax = x;
        if (y < yMin) yMin = y;
        if (y > yMax) yMax = y;
      }
    }

    return found ? [[xMin, yMin], [xMax, yMax]] : null;
  }

  // Calculates the weighted centroid a polygon.
  function polygonCentroid(vertices) {
    var a = 0,
        x = 0,
        y = 0,
        l = vertices.length;

    for (var i = 0; i < l; i++) {
      var s = i === l - 1 ? 0 : i + 1,
          v0 = vertices[i],
          v1 = vertices[s],
          f = v0[0] * v1[1] - v1[0] * v0[1];
      a += f;
      x += (v0[0] + v1[0]) * f;
      y += (v0[1] + v1[1]) * f;
    }

    var d = a * 3;
    return [x / d, y / d];
  }

  // See https://en.wikibooks.org/wiki/Algorithm_Implementation/Geometry/Convex_hull/Monotone_chain#JavaScript
  // and https://math.stackexchange.com/questions/274712/calculate-on-which-side-of-a-straight-line-is-a-given-point-located
  function cross(a, b, o) {
    return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  }

  // See https://en.wikibooks.org/wiki/Algorithm_Implementation/Geometry/Convex_hull/Monotone_chain#JavaScript

  function polygonHull(points) {
    if (points.length < 3) {
      return null;
    }

    var pointsCopy = points.slice().sort(function (a, b) {
      return a[0] === b[0] ? a[1] - b[1] : a[0] - b[0];
    });
    var lower = [];

    for (var i0 = 0; i0 < pointsCopy.length; i0++) {
      while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], pointsCopy[i0]) <= 0) {
        lower.pop();
      }

      lower.push(pointsCopy[i0]);
    }

    var upper = [];

    for (var i1 = pointsCopy.length - 1; i1 >= 0; i1--) {
      while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], pointsCopy[i1]) <= 0) {
        upper.pop();
      }

      upper.push(pointsCopy[i1]);
    }

    upper.pop();
    lower.pop();
    return lower.concat(upper);
  }

  // Calculates the length of a polygon's perimeter. See https://github.com/d3/d3-polygon/blob/master/src/length.js
  function polygonLength(vertices) {
    if (vertices.length === 0) {
      return 0;
    }

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
  function polygonMean(vertices) {
    var x = 0,
        y = 0,
        l = vertices.length;

    for (var i = 0; i < l; i++) {
      var v = vertices[i];
      x += v[0];
      y += v[1];
    }

    return [x / l, y / l];
  }

  function polygonTranslate(polygon, angle, distance) {
    var p = [];

    for (var i = 0, l = polygon.length; i < l; i++) {
      p[i] = pointTranslate(polygon[i], angle, distance);
    }

    return p;
  }

  function polygonRegular() {
    var sides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;
    var area = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
    var center = arguments.length > 2 ? arguments[2] : undefined;
    var polygon = [],
        point = [0, 0],
        sum = [0, 0],
        angle = 0;

    for (var i = 0; i < sides; i++) {
      polygon[i] = point;
      sum[0] += point[0];
      sum[1] += point[1];
      point = pointTranslate(point, angle, Math.sqrt(4 * area * Math.tan(Math.PI / sides) / sides)); // https://web.archive.org/web/20180404142713/http://keisan.casio.com/exec/system/1355985985

      angle -= 360 / sides;
    }

    if (center) {
      var line = [[sum[0] / sides, sum[1] / sides], center];
      polygon = polygonTranslate(polygon, lineAngle(line), lineLength(line));
    }

    return polygon;
  }

  function polygonRotate(polygon, angle, origin) {
    var p = [];

    for (var i = 0, l = polygon.length; i < l; i++) {
      p[i] = pointRotate(polygon[i], angle, origin);
    }

    return p;
  }

  // The origin defaults to the polygon's centroid.

  function polygonScale(polygon, scale, origin) {
    if (!origin) {
      origin = polygonCentroid(polygon);
    }

    var p = [];

    for (var i = 0, l = polygon.length; i < l; i++) {
      var v = polygon[i],
          d = lineLength([origin, v]),
          a = lineAngle([origin, v]);
      p[i] = pointTranslate(origin, a, d * scale);
    }

    return p;
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
        det,
        gamma,
        lambda;
    det = (c - a) * (s - q) - (r - p) * (d - b);

    if (det === 0) {
      return false;
    } else {
      lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
      gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
      return 0 < lambda && lambda < 1 && 0 < gamma && gamma < 1;
    }
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  // Closes a polygon if it's not closed already. Does not modify input polygon.
  function close(polygon) {
    return isClosed(polygon) ? polygon : [].concat(_toConsumableArray(polygon), [polygon[0]]);
  } // Tests whether a polygon is closed

  function isClosed(polygon) {
    return polygon[0] === polygon[polygon.length - 1];
  }

  function topPointFirst(line) {
    return line[1][1] > line[0][1] ? line : [line[1], line[0]];
  }

  function pointLeftofLine(point, line) {
    var t = topPointFirst(line);
    return cross(point, t[1], t[0]) < 0;
  }
  function pointRightofLine(point, line) {
    var t = topPointFirst(line);
    return cross(point, t[1], t[0]) > 0;
  }
  function pointOnLine(point, line) {
    var l = lineLength(line);
    return pointWithLine(point, line) && lineLength([line[0], point]) <= l && lineLength([line[1], point]) <= l;
  }
  function pointWithLine(point, line) {
    return cross(point, line[0], line[1]) === 0;
  }

  // Returns a boolean.

  function lineIntersectsPolygon(line, polygon) {
    var intersects = false;
    var closed = close(polygon);

    for (var i = 0, l = closed.length - 1; i < l; i++) {
      var v0 = closed[i],
          v1 = closed[i + 1];

      if (lineIntersectsLine(line, [v0, v1]) || pointOnLine(v0, line) && pointOnLine(v1, line)) {
        intersects = true;
        break;
      }
    }

    return intersects;
  }

  // Determines whether a point is inside of a polygon, represented as an array of vertices.
  // From https://github.com/substack/point-in-polygon/blob/master/index.js,
  // based on the ray-casting algorithm from https://web.archive.org/web/20180115151705/https://wrf.ecse.rpi.edu//Research/Short_Notes/pnpoly.html
  // Wikipedia: https://en.wikipedia.org/wiki/Point_in_polygon#Ray_casting_algorithm
  // Returns a boolean.
  function pointInPolygon(point, polygon) {
    var x = point[0],
        y = point[1],
        inside = false;

    for (var i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      var xi = polygon[i][0],
          yi = polygon[i][1],
          xj = polygon[j][0],
          yj = polygon[j][1];

      if (yi > y != yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi) {
        inside = !inside;
      }
    }

    return inside;
  }

  // Returns a boolean.

  function pointOnPolygon(point, polygon) {
    var on = false;
    var closed = close(polygon);

    for (var i = 0, l = closed.length - 1; i < l; i++) {
      if (pointOnLine(point, [closed[i], closed[i + 1]])) {
        on = true;
        break;
      }
    }

    return on;
  }

  // Polygons are represented as an array of vertices, each of which is an array of two numbers,
  // where the first number represents its x-coordinate and the second its y-coordinate.
  // Returns a boolean.

  function polygonInPolygon(polygonA, polygonB) {
    var inside = true;
    var closed = close(polygonA);

    for (var i = 0, l = closed.length - 1; i < l; i++) {
      var v0 = closed[i]; // Points test  

      if (!pointInPolygon(v0, polygonB)) {
        inside = false;
        break;
      } // Lines test


      if (lineIntersectsPolygon([v0, closed[i + 1]], polygonB)) {
        inside = false;
        break;
      }
    }

    return inside;
  }

  // Polygons are represented as an array of vertices, each of which is an array of two numbers,
  // where the first number represents its x-coordinate and the second its y-coordinate.
  // Returns a boolean.

  function polygonIntersectsPolygon(polygonA, polygonB) {
    var intersects = false,
        onCount = 0;
    var closed = close(polygonA);

    for (var i = 0, l = closed.length - 1; i < l; i++) {
      var v0 = closed[i],
          v1 = closed[i + 1];

      if (lineIntersectsPolygon([v0, v1], polygonB)) {
        intersects = true;
        break;
      }

      if (pointOnPolygon(v0, polygonB)) {
        ++onCount;
      }

      if (onCount === 2) {
        intersects = true;
        break;
      }
    }

    return intersects;
  }

  // Returns the angle of reflection given an angle of incidence and a surface angle.
  function angleReflect(incidenceAngle, surfaceAngle) {
    var a = surfaceAngle * 2 - incidenceAngle;
    return a >= 360 ? a - 360 : a < 0 ? a + 360 : a;
  }

  exports.lineAngle = lineAngle;
  exports.lineInterpolate = lineInterpolate;
  exports.lineLength = lineLength;
  exports.lineMidpoint = lineMidpoint;
  exports.pointRotate = pointRotate;
  exports.pointTranslate = pointTranslate;
  exports.polygonArea = polygonArea;
  exports.polygonBounds = polygonBounds;
  exports.polygonCentroid = polygonCentroid;
  exports.polygonHull = polygonHull;
  exports.polygonLength = polygonLength;
  exports.polygonMean = polygonMean;
  exports.polygonRegular = polygonRegular;
  exports.polygonRotate = polygonRotate;
  exports.polygonScale = polygonScale;
  exports.polygonTranslate = polygonTranslate;
  exports.lineIntersectsLine = lineIntersectsLine;
  exports.lineIntersectsPolygon = lineIntersectsPolygon;
  exports.pointInPolygon = pointInPolygon;
  exports.pointOnPolygon = pointOnPolygon;
  exports.pointLeftofLine = pointLeftofLine;
  exports.pointRightofLine = pointRightofLine;
  exports.pointOnLine = pointOnLine;
  exports.pointWithLine = pointWithLine;
  exports.polygonInPolygon = polygonInPolygon;
  exports.polygonIntersectsPolygon = polygonIntersectsPolygon;
  exports.angleReflect = angleReflect;
  exports.angleToDegrees = angleToDegrees;
  exports.angleToRadians = angleToRadians;

  Object.defineProperty(exports, '__esModule', { value: true });

})));

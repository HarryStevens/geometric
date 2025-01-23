// https://github.com/HarryStevens/geometric#readme Version 3.0.0. Copyright 2025 Harry Stevens.
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.geometric = {}));
})(this, (function (exports) { 'use strict';

  // Converts radians to degrees.
  function angleToDegrees(angle) {
    return angle * 180 / Math.PI;
  }

  // Calculates the angle of a line, in degrees.
  function lineAngle(line) {
    return angleToDegrees(Math.atan2(line[1][1] - line[0][1], line[1][0] - line[0][0]));
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i);
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
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }
  function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  // Returns an interpolator function given a line [a, b].
  // The returned interpolator function takes a single argument t, where t is a number ranging from 0 to 1;
  // a value of 0 returns a, while a value of 1 returns b.
  // Intermediate values interpolate from start to end along the line segment.
  // By default, the returned interpolator will clamp the output to the ends of the line segment.
  // You can pass an optional boolean indicating whether to return points outside the line segment
  // if t is greater than 1 or less than 0.
  function lineInterpolate(line) {
    var clamp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var _line = _slicedToArray(line, 2),
      _line$ = _slicedToArray(_line[0], 2),
      x1 = _line$[0],
      y1 = _line$[1],
      _line$2 = _slicedToArray(_line[1], 2),
      x2 = _line$2[0],
      y2 = _line$2[1];
    var x = function x(v) {
      return (x2 - x1) * v + x1;
    };
    var y = function y(v) {
      return (y2 - y1) * v + y1;
    };
    return function (t) {
      var t0 = clamp ? t < 0 ? 0 : t > 1 ? 1 : t : t;
      return [x(t0), y(t0)];
    };
  }

  // Calculates the distance between the endpoints of a line segment.
  function lineLength(line) {
    return Math.sqrt(Math.pow(line[1][0] - line[0][0], 2) + Math.pow(line[1][1] - line[0][1], 2));
  }

  // Calculates the midpoint of a line segment.
  function lineMidpoint(line) {
    return [(line[0][0] + line[1][0]) / 2, (line[0][1] + line[1][1]) / 2];
  }

  // Converts degrees to radians.
  function angleToRadians(angle) {
    return angle / 180 * Math.PI;
  }

  // Rotates a point by an angle in degrees around an origin.
  function pointRotate(point, angle, origin) {
    var r = angleToRadians(angle || 0);
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
  }
  function rotate(point, angle) {
    // See: https://en.wikipedia.org/wiki/Cartesian_coordinate_system#Rotation
    return [point[0] * Math.cos(angle) - point[1] * Math.sin(angle), point[0] * Math.sin(angle) + point[1] * Math.cos(angle)];
  }

  // Returns the coordinates resulting from rotating a line about an origin by an angle in degrees.
  // If origin is not specified, the origin defaults to the midpoint of the line.
  function lineRotate(line, angle, origin) {
    return line.map(function (point) {
      return pointRotate(point, angle, origin || lineMidpoint(line));
    });
  }

  // Translates a point by an angle in degrees and distance
  function pointTranslate(point) {
    var angle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var distance = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var r = angleToRadians(angle);
    return [point[0] + distance * Math.cos(r), point[1] + distance * Math.sin(r)];
  }

  // Returns the coordinates resulting from translating a line by an angle in degrees and a distance.
  function lineTranslate(line, angle, distance) {
    return line.map(function (point) {
      return pointTranslate(point, angle, distance);
    });
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
    if (!vertices.length) return [];
    if (vertices.length === 1) return vertices[0];
    if (vertices.length === 2) return lineMidpoint(vertices);
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

  // Closes a polygon if it's not closed already. Does not modify input polygon.
  function polygonClose(polygon) {
    return polygonClosed(polygon) ? polygon : [].concat(_toConsumableArray(polygon), [polygon[0]]);
  }

  // Tests whether a polygon is closed
  function polygonClosed(polygon) {
    var first = polygon[0],
      last = polygon[polygon.length - 1];
    return first[0] === last[0] && first[1] === last[1];
  }

  // See https://en.wikibooks.org/wiki/Algorithm_Implementation/Geometry/Convex_hull/Monotone_chain#JavaScript
  // and https://math.stackexchange.com/questions/274712/calculate-on-which-side-of-a-straight-line-is-a-given-point-located
  function cross(a, b, o) {
    return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  }

  // Caclulates the convex hull of a set of points.
  // See https://en.wikibooks.org/wiki/Algorithm_Implementation/Geometry/Convex_hull/Monotone_chain#JavaScript
  function polygonHull(points) {
    if (points.length < 3) {
      return null;
    }
    var pointsCopy = points.slice().sort(function (a, b) {
      return a[0] === b[0] ? a[1] - b[1] : a[0] - b[0];
    });
    var lower = [];
    for (var i = 0; i < pointsCopy.length; i++) {
      while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], pointsCopy[i]) <= 0) {
        lower.pop();
      }
      lower.push(pointsCopy[i]);
    }
    var upper = [];
    for (var _i = pointsCopy.length - 1; _i >= 0; _i--) {
      while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], pointsCopy[_i]) <= 0) {
        upper.pop();
      }
      upper.push(pointsCopy[_i]);
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

  // Returns an interpolator function given a polygon of vertices [a, b, ..., n]. 
  // The returned interpolator function takes a single argument t,
  // where t is a number in [0, 1]; 
  // a value of 0 returns a, while a value of 1 returns n.
  // Intermediate values interpolate from a to n along the polygon's perimeter.
  // You can pass an optional boolean, which defaults to true, indicating whether to <i>clamp</i> t to the range [0, 1]. 
  // When clamp is false, the interpolator applies modular arithmetic to t.
  // If t is less than 0, the interpolator wraps around the polygon's perimeter in reverse.
  // If t is greater than 1, the interpolator continues forward along the perimeter.

  function polygonInterpolate(polygon) {
    var clamp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var closed = polygonClose(polygon);
    var length = polygonLength(closed);
    var segments = [];
    for (var i = 0; i < closed.length - 1; i++) {
      var p0 = closed[i];
      var p1 = closed[i + 1];
      var l = [p0, p1];
      segments.push([p0, lineLength(l), lineAngle(l)]);
    }
    return function (t) {
      if (clamp) {
        if (t <= 0) return polygon[0];
        if (t >= 1) return closed[closed.length - 1];
      }
      var mod = t % 1;
      var target = length * (mod < 0 ? 1 + mod : mod);
      var track = 0;
      for (var _i = 0, _segments = segments; _i < _segments.length; _i++) {
        var _segments$_i = _slicedToArray(_segments[_i], 3),
          point = _segments$_i[0],
          _length = _segments$_i[1],
          angle = _segments$_i[2];
        var delta = target - (track += _length);
        if (delta < 0) {
          return pointTranslate(point, angle, _length + delta);
        }
      }
      return closed[closed.length - 1];
    };
  }

  // Calculates the arithmetic mean of a polygon's vertices.
  function polygonMean(vertices) {
    if (!vertices.length) return [];
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

  // Scales a polygon by a scale factor (where 1 is the original size) from an origin point.
  // The returned polygon's area is equal to the input polygon's area multiplied by the scaleFactor.
  // The origin defaults to the polygon's centroid.
  function polygonScaleArea(polygon, scale, origin) {
    if (!origin) {
      origin = polygonCentroid(polygon);
    }
    var p = [];
    for (var i = 0, l = polygon.length; i < l; i++) {
      var v = polygon[i],
        d = lineLength([origin, v]),
        a = lineAngle([origin, v]);
      p[i] = pointTranslate(origin, a, d * Math.sqrt(scale));
    }
    return p;
  }

  // Translates a polygon by an angle in degrees and distance.
  function polygonTranslate(polygon, angle, distance) {
    var p = [];
    for (var i = 0, l = polygon.length; i < l; i++) {
      p[i] = pointTranslate(polygon[i], angle, distance);
    }
    return p;
  }

  // Returns a random polygon according to the specific number of sides, area, and centroid.
  // Based on an algorithm by Pavel Valtr and an implementation by Maneesh Agrawala: https://observablehq.com/@magrawala/random-convex-polygon
  function polygonRandom() {
    var sides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;
    var area = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
    var centroid = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [0, 0];
    var r = Math.sqrt(area / Math.PI),
      xs = Array.from({
        length: sides
      }, function () {
        return 2 * r * Math.random();
      }),
      ys = Array.from({
        length: sides
      }, function () {
        return 2 * r * Math.random();
      });
    xs.sort(function (a, b) {
      return a - b;
    });
    ys.sort(function (a, b) {
      return a - b;
    });
    var vecXS = chain(xs, xs[0], xs[xs.length - 1]),
      vecYS = chain(ys, ys[0], ys[ys.length - 1]);
    shuffle(vecYS);

    //Make polygon coordinates from the vecs by laying them out end to end
    var polygon = [],
      x = 0,
      y = 0;

    // Zip the vector arrays together
    // Then, sort the vectors by angle, in a counter clockwise fashion. 
    // a and b are tuples representing vectors. Compute angle for each vector and compare them.
    vecXS.map(function (d, i) {
      return [d, vecYS[i]];
    }).sort(function (a, b) {
      return Math.atan2(b[1], b[0]) - Math.atan2(a[1], a[0]);
    }).forEach(function (vec) {
      x += vec[0] * 1;
      y += vec[1] * 1;
      polygon.push([x, y]);
    });

    // Scale and translate
    var c = polygonCentroid(polygon);
    return polygonTranslate(polygonScaleArea(polygon, area / polygonArea(polygon)), lineAngle([c, centroid]), lineLength([c, centroid]));
  }
  function chain(values, min, max) {
    var lastMin = min,
      lastMax = min;
    var output = [];
    for (var i = 1; i < values.length - 1; i++) {
      var val = values[i];
      if (Math.random() > 0.5) {
        output.push(val - lastMin);
        lastMin = val;
      } else {
        output.push(lastMax - val);
        lastMax = val;
      }
    }
    output.push(max - lastMin);
    output.push(lastMax - max);
    return output;
  }
  function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var _ref = [array[j], array[i]];
      array[i] = _ref[0];
      array[j] = _ref[1];
    }
  }

  // Reflects a polygon over its vertical midline.
  // Pass an optional reflectFactor between 0 and 1,
  // where 1 indicates a full reflection,
  // 0 leaves the polygon unchanged,
  // and 0.5 collapses the polygon on its vertical midline.
  function polygonReflectX(polygon) {
    var reflectFactor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var _polygonBounds = polygonBounds(polygon),
      _polygonBounds2 = _slicedToArray(_polygonBounds, 2),
      _polygonBounds2$ = _slicedToArray(_polygonBounds2[0], 2),
      min = _polygonBounds2$[0];
      _polygonBounds2$[1];
      var _polygonBounds2$2 = _slicedToArray(_polygonBounds2[1], 2),
      max = _polygonBounds2$2[0];
      _polygonBounds2$2[1];
    var p = [];
    for (var i = 0, l = polygon.length; i < l; i++) {
      var _polygon$i = _slicedToArray(polygon[i], 2),
        x = _polygon$i[0],
        y = _polygon$i[1];
      var r = [min + max - x, y];
      if (reflectFactor === 0) {
        p[i] = [x, y];
      } else if (reflectFactor === 1) {
        p[i] = r;
      } else {
        var t = lineInterpolate([[x, y], r]);
        p[i] = t(Math.max(Math.min(reflectFactor, 1), 0));
      }
    }
    return p;
  }

  // Reflects a polygon over its horizontal midline.
  // Pass an optional reflectFactor between 0 and 1,
  // where 1 indicates a full reflection,
  // 0 leaves the polygon unchanged,
  // and 0.5 collapses the polygon on its horizontal midline.
  function polygonReflectY(polygon) {
    var reflectFactor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var _polygonBounds = polygonBounds(polygon),
      _polygonBounds2 = _slicedToArray(_polygonBounds, 2),
      _polygonBounds2$ = _slicedToArray(_polygonBounds2[0], 2);
      _polygonBounds2$[0];
      var min = _polygonBounds2$[1],
      _polygonBounds2$2 = _slicedToArray(_polygonBounds2[1], 2);
      _polygonBounds2$2[0];
      var max = _polygonBounds2$2[1];
    var p = [];
    for (var i = 0, l = polygon.length; i < l; i++) {
      var _polygon$i = _slicedToArray(polygon[i], 2),
        x = _polygon$i[0],
        y = _polygon$i[1];
      var r = [x, min + max - y];
      if (reflectFactor === 0) {
        p[i] = [x, y];
      } else if (reflectFactor === 1) {
        p[i] = r;
      } else {
        var t = lineInterpolate([[x, y], r]);
        p[i] = t(Math.max(Math.min(reflectFactor, 1), 0));
      }
    }
    return p;
  }

  // Returns the vertices of a regular polygon of the specified number of sides, area, and center coordinates.
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

  // Rotates a polygon by an angle in degrees around an origin.
  function polygonRotate(polygon, angle, origin) {
    var p = [];
    for (var i = 0, l = polygon.length; i < l; i++) {
      p[i] = pointRotate(polygon[i], angle, origin);
    }
    return p;
  }

  // Scales a polygon by a scale factor (where 1 is the original size) from an origin point.
  // The returned polygon's area is equal to the input polygon's area multiplied by the square of the scaleFactor.
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

  // Scales a polygon's x-coordinates by a scale factor (where 1 is the original size) from an origin point.
  // The origin defaults to the polygon's centroid.
  function polygonScaleX(polygon, scale, origin) {
    if (!origin) {
      origin = polygonCentroid(polygon);
    }
    var p = [];
    for (var i = 0, l = polygon.length; i < l; i++) {
      var v = polygon[i],
        d = lineLength([origin, v]),
        a = lineAngle([origin, v]),
        t = pointTranslate(origin, a, d * scale);
      p[i] = [t[0], v[1]];
    }
    return p;
  }

  // Scales a polygon's y-coordinates by a scale factor (where 1 is the original size) from an origin point.
  // The origin defaults to the polygon's centroid.
  function polygonScaleY(polygon, scale, origin) {
    if (!origin) {
      origin = polygonCentroid(polygon);
    }
    var p = [];
    for (var i = 0, l = polygon.length; i < l; i++) {
      var v = polygon[i],
        d = lineLength([origin, v]),
        a = lineAngle([origin, v]),
        t = pointTranslate(origin, a, d * scale);
      p[i] = [v[0], t[1]];
    }
    return p;
  }

  // Returns a polygon in the specified winding order.
  // If order is passed as a strings of "cw" or "clockwise", returns a polygon with a clockwise winding order.
  // Otherwise, returns a polygon with a counter-clockwise winding order.
  function polygonWind(polygon) {
    var order = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "ccw";
    if (polygon.length < 3) return null;
    var reversed = polygon.slice().reverse();
    var isClockwise = polygonArea(polygon, true) < 0;
    if (order === "cw" || order === "clockwise") {
      return isClockwise ? polygon : reversed;
    } else {
      return isClockwise ? reversed : polygon;
    }
  }

  // See https://math.stackexchange.com/questions/274712/calculate-on-which-side-of-a-straight-line-is-a-given-point-located
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
    var epsilon = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var l = lineLength(line);
    return pointWithLine(point, line, epsilon) && lineLength([line[0], point]) <= l && lineLength([line[1], point]) <= l;
  }
  function pointWithLine(point, line) {
    var epsilon = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    return Math.abs(cross(point, line[0], line[1])) <= epsilon;
  }

  // Returns a point where line <i>a</i> intersects line <i>b</i>.
  // If the two lines do not intersect, returns null.
  function lineIntersection(a, b) {
    var _a$ = _slicedToArray(a[0], 2),
      a0x = _a$[0],
      a0y = _a$[1],
      _a$2 = _slicedToArray(a[1], 2),
      a1x = _a$2[0],
      a1y = _a$2[1];
    var _b$ = _slicedToArray(b[0], 2),
      b0x = _b$[0],
      b0y = _b$[1],
      _b$2 = _slicedToArray(b[1], 2),
      b1x = _b$2[0],
      b1y = _b$2[1]; // Bounding box overlap check
    if (Math.min(a0x, a1x) > Math.max(b0x, b1x) || Math.min(b0x, b1x) > Math.max(a0x, a1x) || Math.min(a0y, a1y) > Math.max(b0y, b1y) || Math.min(b0y, b1y) > Math.max(a0y, a1y)) {
      return null;
    }

    // Shared points or points on line
    if (a0x === b0x && a0y === b0y || pointOnLine(a[0], b)) return a[0];
    if (a1x === b1x && a1y === b1y || pointOnLine(a[1], b)) return a[1];
    if (pointOnLine(b[0], a)) return b[0];
    if (pointOnLine(b[1], a)) return b[1];

    // Vectorized calculation
    var dxA = a1x - a0x,
      dyA = a1y - a0y;
    var dxB = b1x - b0x,
      dyB = b1y - b0y;
    var denom = dyB * dxA - dxB * dyA;
    if (denom === 0) return null; // Parallel lines

    var dy = a0y - b0y,
      dx = a0x - b0x;
    var numerA = dxB * dy - dyB * dx;
    var numerB = dxA * dy - dyA * dx;
    var quotA = numerA / denom,
      quotB = numerB / denom;
    return quotA >= 0 && quotA <= 1 && quotB >= 0 && quotB <= 1 ? [a0x + quotA * dxA, a0y + quotA * dyA] : null;
  }

  // Determines whether a line intersects a polygon.
  // Returns a boolean.
  function lineIntersectsPolygon(line, polygon) {
    var intersects = false;
    var closed = polygonClose(polygon);
    for (var i = 0, l = closed.length - 1; i < l; i++) {
      var v0 = closed[i],
        v1 = closed[i + 1];
      if (lineIntersection(line, [v0, v1]) || pointOnLine(v0, line) && pointOnLine(v1, line)) {
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

  // Determines whether a point is located on one of the edges of a polygon.
  // Returns a boolean.
  function pointOnPolygon(point, polygon) {
    var epsilon = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var on = false;
    var closed = polygonClose(polygon);
    for (var i = 0, l = closed.length - 1; i < l; i++) {
      if (pointOnLine(point, [closed[i], closed[i + 1]], epsilon)) {
        on = true;
        break;
      }
    }
    return on;
  }

  // Determines whether a polygon is contained by another polygon.
  // Polygons are represented as an array of vertices, each of which is an array of two numbers,
  // where the first number represents its x-coordinate and the second its y-coordinate.
  // Returns a boolean.
  function polygonInPolygon(polygonA, polygonB) {
    var inside = true;
    var closed = polygonClose(polygonA);
    for (var i = 0, l = closed.length - 1; i < l; i++) {
      var v0 = closed[i];

      // Points test  
      if (!pointInPolygon(v0, polygonB)) {
        inside = false;
        break;
      }

      // Lines test
      if (lineIntersectsPolygon([v0, closed[i + 1]], polygonB)) {
        inside = false;
        break;
      }
    }
    return inside;
  }

  // Determines whether a polygon intersects but is not contained by another polygon.
  // Polygons are represented as an array of vertices, each of which is an array of two numbers,
  // where the first number represents its x-coordinate and the second its y-coordinate.
  // Returns a boolean.
  function polygonIntersectsPolygon(polygonA, polygonB) {
    var intersects = false,
      onCount = 0;
    var closed = polygonClose(polygonA);
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
    return (surfaceAngle * 2 - incidenceAngle % 360 + 360) % 360;
  }

  exports.angleReflect = angleReflect;
  exports.angleToDegrees = angleToDegrees;
  exports.angleToRadians = angleToRadians;
  exports.lineAngle = lineAngle;
  exports.lineInterpolate = lineInterpolate;
  exports.lineIntersection = lineIntersection;
  exports.lineIntersectsPolygon = lineIntersectsPolygon;
  exports.lineLength = lineLength;
  exports.lineMidpoint = lineMidpoint;
  exports.lineRotate = lineRotate;
  exports.lineTranslate = lineTranslate;
  exports.pointInPolygon = pointInPolygon;
  exports.pointLeftofLine = pointLeftofLine;
  exports.pointOnLine = pointOnLine;
  exports.pointOnPolygon = pointOnPolygon;
  exports.pointRightofLine = pointRightofLine;
  exports.pointRotate = pointRotate;
  exports.pointTranslate = pointTranslate;
  exports.pointWithLine = pointWithLine;
  exports.polygonArea = polygonArea;
  exports.polygonBounds = polygonBounds;
  exports.polygonCentroid = polygonCentroid;
  exports.polygonClose = polygonClose;
  exports.polygonClosed = polygonClosed;
  exports.polygonHull = polygonHull;
  exports.polygonInPolygon = polygonInPolygon;
  exports.polygonInterpolate = polygonInterpolate;
  exports.polygonIntersectsPolygon = polygonIntersectsPolygon;
  exports.polygonLength = polygonLength;
  exports.polygonMean = polygonMean;
  exports.polygonRandom = polygonRandom;
  exports.polygonReflectX = polygonReflectX;
  exports.polygonReflectY = polygonReflectY;
  exports.polygonRegular = polygonRegular;
  exports.polygonRotate = polygonRotate;
  exports.polygonScale = polygonScale;
  exports.polygonScaleArea = polygonScaleArea;
  exports.polygonScaleX = polygonScaleX;
  exports.polygonScaleY = polygonScaleY;
  exports.polygonTranslate = polygonTranslate;
  exports.polygonWind = polygonWind;

}));

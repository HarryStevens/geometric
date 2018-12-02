// https://github.com/HarryStevens/geometric#readme Version 0.0.6. Copyright 2018 Harry Stevens.
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.geometric = {})));
}(this, (function (exports) { 'use strict';

  // Calculate the angle between two points, in degrees.
  // Takes two arguments, each of which is a point represented as an array of two numbers,
  // where the first number is its x coordinate and the second number is its y coordinate.
  function angleDegrees(a, b){
    return Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI;
  }

  // Calculate the angle between two points, in radians.
  // Takes two arguments, each of which is a point represented as an array of two numbers,
  // where the first number is its x coordinate and the second number is its y coordinate.
  function angleRadians(a, b){
    return Math.atan2(b[1] - a[1], b[0] - a[0]);
  }

  // Calculates the distance between two points.
  // Takes two arguments, each of which is a point represented as an array of two numbers,
  // where the first number is its x coordinate and the second number is its y coordinate.
  function distance(a, b){
    return Math.sqrt(Math.pow(b[0] - a[0], 2) + Math.pow(b[1] - a[1], 2));
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
  function polygonsIntersect(verticesA, verticesB){
    return verticesA.some(function(p){ return pointInPolygon(p, verticesB); }) &&
          !verticesA.every(function(p){ return pointInPolygon(p, verticesB); });
  }

  // Calculates the midpoint between two points.
  // Takes two arguments, each of which is a point represented as an array of two numbers,
  // where the first number is its x coordinate and the second number is its y coordinate.
  function midpoint(a, b){
    return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]
  }

  // Translates a point (p) by an angle in radians (a) and distance (d)
  function translateDegrees(p, a, d){
    a = a / 180 * Math.PI;
    return [p[0] + d * Math.cos(a), p[1] + d * Math.sin(a)]
  }

  // Translates a point (p) by an angle in degrees (a) and distance (d)
  function translateRadians(p, a, d){
    return [p[0] + d * Math.cos(a), p[1] + d * Math.sin(a)]
  }

  exports.angleDegrees = angleDegrees;
  exports.angleRadians = angleRadians;
  exports.distance = distance;
  exports.pointInPolygon = pointInPolygon;
  exports.polygonInPolygon = polygonInPolygon;
  exports.polygonsIntersect = polygonsIntersect;
  exports.midpoint = midpoint;
  exports.translateDegrees = translateDegrees;
  exports.translateRadians = translateRadians;

  Object.defineProperty(exports, '__esModule', { value: true });

})));

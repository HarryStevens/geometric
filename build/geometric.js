// https://github.com/HarryStevens/geometric#readme Version 0.0.1. Copyright 2018 undefined.
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.geometric = {})));
}(this, (function (exports) { 'use strict';

  // Calculate the angle between two points.
  // Takes two arguments, each of which is a point represented as an array of two numbers,
  // where the first number is its x coordinate and the second number is its y coordinate.
  function angleDegrees(a, b){
    return Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI;
  }

  exports.angleDegrees = angleDegrees;

  Object.defineProperty(exports, '__esModule', { value: true });

})));

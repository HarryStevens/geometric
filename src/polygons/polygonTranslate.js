import {pointTranslate} from "../points/pointTranslate";

// Translates a polygon by an angle in degrees and distance.
export function polygonTranslate(polygon, angle, distance){
  var p = [];
  for (var i = 0, l = polygon.length; i < l; i++){
    p.push(pointTranslate(polygon[i], angle, distance));
  }
  return p;
}
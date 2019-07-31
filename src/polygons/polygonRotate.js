import { pointRotate } from "../points/pointRotate";

// Rotates a polygon by an angle in degrees around an origin.
export function polygonRotate(polygon, angle, origin){
  let out = [];
  for (let i = 0, l = polygon.length; i < l; i++){
    out.push(pointRotate(polygon[i], angle, origin));
  }
  return out;
}
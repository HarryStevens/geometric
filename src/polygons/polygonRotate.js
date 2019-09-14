import { pointRotate } from "../points/pointRotate";

// Rotates a polygon by an angle in degrees around an origin.
export function polygonRotate(polygon, angle, origin){
  let p = [];

  for (let i = 0, l = polygon.length; i < l; i++){
    p[i] = pointRotate(polygon[i], angle, origin);
  }
  
  return p;
}
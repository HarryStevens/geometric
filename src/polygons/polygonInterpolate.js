import { lineAngle } from "../lines/lineAngle";
import { lineLength } from "../lines/lineLength";
import { pointTranslate } from "../points/pointTranslate";
import { polygonClose } from "./polygonClose";
import { polygonLength } from "./polygonLength";

// Returns an interpolator function given a polygon of vertices [a, b, ..., n]. 
// The returned interpolator function takes a single argument t,
// where t is a number in [0, 1]; 
// a value of 0 returns a, while a value of 1 returns n.
// Intermediate values interpolate from a to n along the polygon's perimeter.
// You can pass an optional boolean, which defaults to true, indicating whether to <i>clamp</i> t to the range [0, 1]. 
// When clamp is false, the interpolator applies modular arithmetic to t.
// If t is less than 0, the interpolator wraps around the polygon's perimeter in reverse.
// If t is greater than 1, the interpolator continues forward along the perimeter.

export function polygonInterpolate(polygon, clamp = true){
  const closed = polygonClose(polygon);
  const length = polygonLength(closed);
  
  const segments = [];
  for (let i = 0; i < closed.length - 1; i++) {
    const p0 = closed[i];
    const p1 = closed[i + 1];
    const l = [p0, p1];
    segments.push([ p0, lineLength(l), lineAngle(l) ]);
  }

  return (t) => {
    if (clamp) {
      if (t <= 0) return polygon[0];
      if (t >= 1) return closed[closed.length - 1];
    }

    const mod = t % 1;
    const target = length * (mod < 0 ? 1 + mod : mod);
    let track = 0;
  
    for (const [ point, length, angle ] of segments) {
      const delta = target - (track += length);

      if (delta < 0) {
        return pointTranslate(point, angle, length + delta);
      }
    }
  
    return closed[closed.length - 1];
  }
}
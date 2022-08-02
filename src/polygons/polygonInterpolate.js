import { close } from "../utils/closePolygon";
import { lineAngle } from "../lines/lineAngle";
import { lineLength } from "../lines/lineLength";
import { pointTranslate } from "../points/pointTranslate";
import { polygonLength } from "./polygonLength";

export function polygonInterpolate(polygon){
  return (t) => {
    if (t <= 0){
      return polygon[0];
    }
  
    const closed = close(polygon);
      
    if (t >= 1){
      return closed[closed.length - 1];
    }
    
    const target = polygonLength(closed) * t;
    let point = [], track = 0;
  
    for (let i = 0; i < closed.length - 1; i++){
      const side = [closed[i], closed[i + 1]],
            length = lineLength(side),
            angle = lineAngle(side),
            delta = target - (track += length);
  
      if (delta < 0){
        point = pointTranslate(side[0], angle, length + delta);
        break;
      }
  
      else if (i === polygon.length - 2){
        point = pointTranslate(side[0], angle, delta);
      }
    }
  
    return point;
  }
}
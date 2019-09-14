import { lineAngle } from "../lines/lineAngle";
import { lineLength } from "../lines/lineLength";
import { pointTranslate } from "../points/pointTranslate";
import { polygonTranslate } from "./polygonTranslate";

// Returns the vertices of a regular polygon of the specified number of sides, area, and center coordinates.
export function polygonRegular(sides = 3, area = 100, center){ 
  let polygon = [],
      point = [0, 0],
      sum = [0, 0],
      angle = 0;
  
  for (let i = 0; i < sides; i++){
    polygon[i] = point;
    sum[0] += point[0];
    sum[1] += point[1];
    point = pointTranslate(point, angle, Math.sqrt((4 * area) * Math.tan(Math.PI / sides) / sides)); // https://web.archive.org/web/20180404142713/http://keisan.casio.com/exec/system/1355985985
    angle -= 360 / sides;
  }

  if (center){
    const line = [[sum[0] / sides, sum[1] / sides], center]
    polygon = polygonTranslate(polygon, lineAngle(line), lineLength(line));    
  }
  
  return polygon;
}
import {cross} from "./utils/crossProduct"

// See https://math.stackexchange.com/questions/274712/calculate-on-which-side-of-a-straight-line-is-a-given-point-located
function topPointFirst(line){
  return line[1][1] > line[0][1] ? line : [line[1], line[0]];
}

export function pointLeftOfLine(point, line){
  var t = topPointFirst(line);
  return cross(point, t[1], t[0]) < 0;
}
export function pointRightOfLine(point, line){
  var t = topPointFirst(line);
  return cross(point, t[1], t[0]) > 0;
}
export function pointOnLine(point, line){
  return cross(point, line[0], line[1]) === 0;
}
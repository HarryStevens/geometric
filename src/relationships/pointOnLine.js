import { lineLength } from "../lines/lineLength.js";
import { cross } from "../utils/crossProduct";

// See https://math.stackexchange.com/questions/274712/calculate-on-which-side-of-a-straight-line-is-a-given-point-located
function topPointFirst(line){
  return line[1][1] > line[0][1] ? line : [line[1], line[0]];
}

export function pointLeftofLine(point, line){
  const t = topPointFirst(line);
  return cross(point, t[1], t[0]) < 0;
}
export function pointRightofLine(point, line){
  const t = topPointFirst(line);
  return cross(point, t[1], t[0]) > 0;
}
export function pointOnLine(point, line){
  const l = lineLength(line);
  return pointWithLine(point, line) && lineLength([line[0], point]) <= l && lineLength([line[1], point]) <= l;
}
export function pointWithLine(point, line){
  return cross(point, line[0], line[1]) === 0;
}
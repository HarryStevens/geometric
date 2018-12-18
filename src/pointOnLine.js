// See https://math.stackexchange.com/questions/274712/calculate-on-which-side-of-a-straight-line-is-a-given-point-located
function sign(point, line){
  var x = point[0],
      y = point[1],
      a = line[0],
      x1 = a[0],
      y1 = a[1],
      b = line[1],
      x2 = b[0],
      y2 = b[1];

  return (x - x1) * (y2 - y1) - (y - y1) * (x2 - x1);      
}
function topPointFirst(line){
  return line[1][1] > line[0][1] ? line : [line[1], line[0]];
}

export function pointLeftOfLine(point, line){
  return sign(point, topPointFirst(line)) < 0;
}
export function pointRightOfLine(point, line){
  return sign(point, topPointFirst(line)) > 0;
}
export function pointOnLine(point, line){
  return sign(point, line) === 0;
}
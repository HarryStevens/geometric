// Calculates the bounds of a polygon.
export function polygonBounds(polygon){
  if (polygon.length < 3){
    return null;
  }

  let xMin = polygon[0][0],
      xMax = xMin,
      yMin = polygon[0][1],
      yMax = yMin;

  for (let i = 1, l = polygon.length; i < l; i++){
    const p = polygon[i],
          x = p[0],
          y = p[1];

    if (x < xMin) xMin = x;
    if (x > xMax) xMax = x;
    if (y < yMin) yMin = y;
    if (y > yMax) yMax = y;
  }

  return [[xMin, yMin], [xMax, yMax]];
}
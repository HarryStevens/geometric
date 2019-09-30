// Calculates the bounds of a polygon.
export function polygonBounds(polygon){
  if (polygon.length < 3){
    return null;
  }

  let xMin = Infinity,
      xMax = -Infinity,
      yMin = Infinity,
      yMax = -Infinity,
      found = false;

  for (let i = 0, l = polygon.length; i < l; i++){
    const p = polygon[i],
          x = p[0],
          y = p[1];

    if (x != null && isFinite(x) && y != null && isFinite(y)){
      found = true;
      if (x < xMin) xMin = x;
      if (x > xMax) xMax = x;
      if (y < yMin) yMin = y;
      if (y > yMax) yMax = y;      
    }
  }

  return found ? [[xMin, yMin], [xMax, yMax]] : null;
}
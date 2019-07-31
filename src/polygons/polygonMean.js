// Calculates the arithmetic mean of a polygon's vertices.
export function polygonMean(vertices){
  let x = 0, y = 0, l = vertices.length;

  for (let i = 0; i < l; i++) {
    const v = vertices[i];        

    x += v[0];
    y += v[1];
  }

  return [x / l, y / l];
}
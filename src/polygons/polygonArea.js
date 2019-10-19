// Calculates the area of a polygon.
export function polygonArea(vertices, signed = false){
  let a = 0;

  for (let i = 0, l = vertices.length; i < l; i++) {
    const v0 = vertices[i],
          v1 = vertices[i === l - 1 ? 0 : i + 1];

    a += v0[0] * v1[1];
    a -= v1[0] * v0[1];
  }

  return signed ? a / 2 : Math.abs(a / 2);
}
// Calculates the weighted centroid a polygon.
export function polygonCentroid(vertices){
  var a = 0, x = 0, y = 0, l = vertices.length;

  for (var i = 0; i < l; i++) {
    var s = i === l - 1 ? 0 : i + 1,
        v0 = vertices[i],
        v1 = vertices[s],
        f = (v0[0] * v1[1]) - (v1[0] * v0[1]);

    a += f;
    x += (v0[0] + v1[0]) * f;
    y += (v0[1] + v1[1]) * f;
  }

  var d = a * 3;

  return [x / d, y / d];
}
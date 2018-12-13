// Calculates the area of a polygon.
export default function area(vertices){
  var a = 0;

  for (var i = 0, l = vertices.length; i < l; i++) {
    var s = i === l - 1 ? 0 : i + 1;

    a += vertices[i][0] * vertices[s][1];
    a -= vertices[s][0] * vertices[i][1];
  }

  return Math.abs(a / 2);
}
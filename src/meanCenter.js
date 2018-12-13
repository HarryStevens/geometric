// Calculates the arithmetic mean of a polygon's vertices. Not to be confused with a centroid (https://github.com/Turfjs/turf/issues/334).
export default function meanCenter(vertices){
  var x = 0, y = 0, l = vertices.length;

  for (var i = 0; i < l; i++) {
    var v = vertices[i];        

    x += v[0];
    y += v[1];
  }

  return [x / l, y / l];
}
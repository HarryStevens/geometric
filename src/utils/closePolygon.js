export function close(polygon){
  return polygon[0] !== polygon[polygon.length - 1] ? [...polygon, polygon[0]] : polygon;
}
// Closes a polygon if it's not closed already. Does not modify input polygon.
export function close(polygon){
  return isClosed(polygon) ? polygon : [...polygon, polygon[0]];
}

// Tests whether a polygon is closed
export function isClosed(polygon){
  return polygon[0] === polygon[polygon.length - 1];
}
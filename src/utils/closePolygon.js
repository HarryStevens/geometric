// Closes a polygon if it's not closed already. Does not modify input polygon.
export function close(polygon){
  return isClosed(polygon) ? polygon : [...polygon, polygon[0]];
}

// Tests whether a polygon is closed
export function isClosed(polygon){
  const first = polygon[0],
        last = polygon[polygon.length - 1];
  return first[0] === last[0] && first[1] === last[1];
}
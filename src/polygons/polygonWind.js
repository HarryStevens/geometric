import { polygonArea } from "./polygonArea";

// Returns a polygon in the specified winding order.
// If order is passed as a strings of "cw" or "clockwise", returns a polygon with a clockwise winding order.
// Otherwise, returns a polygon with a counter-clockwise winding order.
export function polygonWind(polygon, order = "ccw") {
  if (polygon.length < 3) return null;
  
  const reversed = polygon.slice().reverse();
  const isClockwise = polygonArea(polygon, true) > 0;
  
  if (order === "cw" || order === "clockwise") {
    return isClockwise ? polygon : reversed;
  }
  else {
    return isClockwise ? reversed : polygon;
  }
}
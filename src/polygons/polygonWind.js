import { polygonArea } from "./polygonArea.js";

/**
 * @typedef {import("../types.js").Polygon} Polygon
 */

// Returns a <i>polygon</i> in the specified winding order. If an <i>order</i> string is passed as either "cw" or "clockwise", returns a polygon with a clockwise winding order. Otherwise, returns a polygon with a counter-clockwise winding order. Returns null if the <i>polygon</i> has fewer than three points.
//
// Uses the convention that a polygon with a negative signed area has a clockwise winding order, and a polygon with a positive signed area has a counter-clockwise winding order. As a result, the winding order will appear reversed on computer screens where the y-axis is reversed (i.e. 0 is on top rather than on bottom).
/**
 * @param {Polygon} polygon
 * @param {"cw" | "clockwise" | "ccw" | "counterclockwise"} [order="ccw"]
 * @returns {Polygon | null}
 */
export function polygonWind(polygon, order = "ccw") {
  if (polygon.length < 3) return null;

  const reversed = polygon.slice().reverse();
  const isClockwise = polygonArea(polygon, true) < 0;

  if (order === "cw" || order === "clockwise") {
    return isClockwise ? polygon : reversed;
  } else {
    return isClockwise ? reversed : polygon;
  }
}

import { Polygon, Point } from "../common";

export function polygonInterpolate(polygon: Polygon): (t: number) => Point;
import { Point, Line } from "../common";

export function pointLeftofLine(point: Point, line: Line): boolean;
export function pointRightofLine(point: Point, line: Line): boolean;
export function pointOnLine(point: Point, line: Line, epsilon?: number): boolean;
export function pointWithLine(point: Point, line: Line, epsilon?: number): boolean;
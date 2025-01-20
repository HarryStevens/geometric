// Defines a 2D point as a tuple of two numbers: [x, y]
export type Point = [number, number];

// Defines a line as an array of two Points: [startPoint, endPoint]
export type Line = [Point, Point];

// Defines a polygon as an array of Points
export type Polygon = Point[];
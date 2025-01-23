// Defines a 2D point as a tuple of two numbers: [x, y]
type Point = [number, number];

// Defines a line as an array of two Points: [startPoint, endPoint]
type Line = [Point, Point];

// Defines a polygon as an array of Points
type Polygon = Point[];

declare function lineAngle(line: Line): number;

declare function lineInterpolate(
  line: Line,
  clamp?: boolean
): (t: number) => Point;

declare function lineLength(line: Line): number;

declare function lineMidpoint(line: Line): Point;

declare function lineRotate(line: Line, angle: number, origin?: Point): Line;

declare function lineTranslate(line: Line, angle?: number, distance?: number): Line;

declare function pointRotate(point: Point, angle?: number, origin?: Point): Point;

declare function pointTranslate(point: Point, angle?: number, distance?: number): Point;

declare function polygonArea(vertices: Polygon, signed?: boolean): number;

declare function polygonBounds(polygon: Polygon): [Point, Point] | null;

declare function polygonCentroid(vertices: Polygon): Point;

declare function polygonClose(polygon: Polygon): Polygon;
declare function polygonClosed(polygon: Polygon): boolean;

declare function polygonHull(points: Point[]): Polygon | null;

declare function polygonInterpolate(polygon: Polygon): (t: number) => Point;

declare function polygonLength(vertices: Polygon): number;

declare function polygonMean(vertices: Polygon): Point;

declare function polygonRandom(sides?: number, area?: number, centroid?: Point): Polygon;

declare function polygonReflectX(polygon: Polygon, reflectFactor?: number): Polygon;

declare function polygonReflectY(polygon: Polygon, reflectFactor?: number): Polygon;

declare function polygonRegular(sides?: number, area?: number, center?: Point): Polygon;

declare function polygonRotate(polygon: Polygon, angle: number, origin?: Point): Polygon;

declare function polygonScale(polygon: Polygon, scale: number, origin?: Point): Polygon;

declare function polygonScaleArea(polygon: Polygon, scale: number, origin?: Point): Polygon;

declare function polygonScaleX(polygon: Polygon, scale: number, origin?: Point): Polygon;

declare function polygonScaleY(polygon: Polygon, scale: number, origin?: Point): Polygon;

declare function polygonTranslate(polygon: Polygon, angle: number, distance: number): Polygon;

declare function polygonWind(polygon: Polygon, order?: string): Polygon | null;

declare function lineIntersection(lineA: Line, lineB: Line): Point | null;

declare function lineIntersectsPolygon(line: Line, polygon: Polygon): boolean;

declare function pointInPolygon(point: Point, polygon: Polygon): boolean;

declare function pointOnPolygon(point: Point, polygon: Polygon, epsilon?: number): boolean;

declare function pointLeftofLine(point: Point, line: Line): boolean;
declare function pointRightofLine(point: Point, line: Line): boolean;
declare function pointOnLine(point: Point, line: Line, epsilon?: number): boolean;
declare function pointWithLine(point: Point, line: Line, epsilon?: number): boolean;

declare function polygonInPolygon(polygonA: Polygon, polygonB: Polygon): boolean;

declare function polygonIntersectsPolygon(polygonA: Polygon, polygonB: Polygon): boolean;

declare function angleReflect(incidenceAngle: number, surfaceAngle: number): number;

declare function angleToDegrees(angle: number): number;

declare function angleToRadians(angle: number): number;

export { angleReflect, angleToDegrees, angleToRadians, lineAngle, lineInterpolate, lineIntersection, lineIntersectsPolygon, lineLength, lineMidpoint, lineRotate, lineTranslate, pointInPolygon, pointLeftofLine, pointOnLine, pointOnPolygon, pointRightofLine, pointRotate, pointTranslate, pointWithLine, polygonArea, polygonBounds, polygonCentroid, polygonClose, polygonClosed, polygonHull, polygonInPolygon, polygonInterpolate, polygonIntersectsPolygon, polygonLength, polygonMean, polygonRandom, polygonReflectX, polygonReflectY, polygonRegular, polygonRotate, polygonScale, polygonScaleArea, polygonScaleX, polygonScaleY, polygonTranslate, polygonWind };

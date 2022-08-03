declare type Point = number[];
declare type Line = [Point, Point];
declare type Polygon = Point[];

interface GeometricStatic {
    lineAngle(line: Line): number;
    lineInterpolate(line: Line): (t: number) => Point;
    lineLength(line: Line): number;
    lineMidpoint(line: Line): Point;
    pointRotate(point: Point, angle: number, origin?: Point): Point;
    pointTranslate(point: Point, angle: number, distance: number): Point;
    polygonArea(polygon: Polygon): number;
    polygonBounds(polygon: Polygon): [Point, Point] | null;
    polygonCentroid(polygon: Polygon): Point;
    polygonHull(polygon: Polygon): Polygon;
    polygonLength(polygon: Polygon): number;
    polygonMean(polygon: Polygon): [number, number];
    polygonRegular(sides = 3, area = 100, center?: Point): Polygon;
    polygonRotate(polygon: Polygon, angle: number, origin?: Point): Polygon;
    polygonScale(polygon: Polygon, scale: number, origin?: Point): Polygon;
    polygonScaleX(polygon: Polygon, scale: number, origin?: Point): Polygon;
    polygonScaleY(polygon: Polygon, scale: number, origin?: Point): Polygon;
    polygonTranslate(polygon: Polygon, angle: number, distance: number): Polygon;
    lineIntersectsLine(lineA: Line, lineB: Line): boolean;
    lineIntersectsPolygon(line: Line, polygon: Polygon): boolean;
    pointInPolygon(point: Point, polygon: Polygon): boolean;
    pointOnPolygon(point: Point, polygon: Polygon): boolean;
    pointLeftofLine(point: Point, line: Line): boolean;
    pointRightofLine(point: Point, line: Line): boolean;
    pointOnLine(point: Point, line: Line): boolean;
    pointWithLine(point: Point, line: Line): boolean;
    polygonInPolygon(polygonA: Polygon, polygonB: Polygon): boolean;
    polygonIntersectsPolygon(polygonA: Polygon, polygonB: Polygon): boolean;
    angleReflect(incidenceAngle: number, surfaceAngle: number): number;
    angleToDegrees(angle: number): number;
    angleToRadians(angle: number): number;
}

declare const exports: GeometricStatic;
export = exports;

export as namespace geometric;

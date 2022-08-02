import { close } from "../utils/closePolygon.js";
import { lineAngle } from "../lines/lineAngle.js";
import { lineLength } from "../lines/lineLength.js";
import { polygonArea } from "./polygonArea.js";
import { polygonCentroid } from "./polygonCentroid.js";
import { polygonScaleArea } from "./polygonScaleArea.js";
import { polygonTranslate } from "./polygonTranslate.js";

// Returns a random polygon according to the specific number of sides, area, and centroid.
// Based on an algorithm by Pavel Valtr and an implementation by Maneesh Agrawala: https://observablehq.com/@magrawala/random-convex-polygon
export function polygonRandom(sides = 3, area = 100, centroid = [0, 0]) {
  const r = Math.sqrt(area / Math.PI),
        xs = Array.from({ length: sides }, () => 2 * r * Math.random()),
        ys = Array.from({ length: sides }, () => 2 * r * Math.random());
  
  xs.sort((a, b) => a - b);
  ys.sort((a, b) => a - b);

  const vecXS = chain(xs, xs[0], xs[xs.length-1]),
        vecYS = chain(ys, ys[0], ys[ys.length-1]);

  shuffle(vecYS);

  //Make polygon coordinates from the vecs by laying them out end to end
  let polygon = [],
      x = 0, y = 0;
  
  // Zip the vector arrays together
  // Then, sort the vectors by angle, in a counter clockwise fashion. 
  // a and b are tuples representing vectors. Compute angle for each vector and compare them.
  const vecs = vecXS
    .map((d, i) => [d, vecYS[i]])
    .sort((a, b) => Math.atan2(a[1], a[0]) - Math.atan2(b[1], b[0]))
    .forEach(vec => {
      x += vec[0] * 1;
      y += vec[1] * 1;
      polygon.push([x,y])
    });

  // Scale and translate
  const c = polygonCentroid(polygon);
  
  return polygonTranslate(
    polygonScaleArea(polygon, area / polygonArea(polygon)),
    lineAngle([c, centroid]),
    lineLength([c, centroid])
  );
}

function chain(values, min, max) {
  let lastMin = min, lastMax = min;
  const output = []
  
  for (let i = 1; i < values.length - 1; i++) {
    const val = values[i];

    if (Math.random() > 0.5) {
      output.push(val - lastMin);
      lastMin = val;
    } else {
      output.push(lastMax - val);
      lastMax = val;
    }
  }
  
  output.push(max - lastMin);
  output.push(lastMax - max);
  
  return output;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
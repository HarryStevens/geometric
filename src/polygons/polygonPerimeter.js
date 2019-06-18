import { lineLength } from "../lines/lineLength";

export function polygonPerimeter(vertices){
  let perimeter = 0;
  const n = vertices.length;
  for (let i = 0; i < n; i++){
    perimeter += lineLength([vertices[i], vertices[i === n - 1 ? 0 : i + 1]]);
  }
  return perimeter;
}
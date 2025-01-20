export default function roundArray(array: number[], precision: number): number[] {
  return array.map(n => +n.toFixed(precision));
}
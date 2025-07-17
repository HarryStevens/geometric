module.exports = function roundArray(array, precision){
  return array.map(n => +n.toFixed(precision));
}
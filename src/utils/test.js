function resolved(width, height, isVertical, distance) {
  let matrix = Array.from(Array(width), () => Array(height).fill(1));
  let result = [];
  for (let i = 0; i < isVertical.length; i++) {
    if (isVertical[i]) {
      matrix = matrix.filter((e, index) => index != distance[i]);
    } else {
      let newMar = [];
      matrix.forEach(e => {
        const newArr = e.filter((e, index) => index != distance[i]);
        newMar.push(newArr);
      });
      matrix = newMar;
    }
    let newMar = matrix.flat();
    result.push(newMar.length);
  }

  return result;
}
const resulf = resolved(4, 4, [false, true], [3, 1]);
console.log('first', resulf);
function ngamSao(
  data = [
    [1, 1],
    [3, 1],
    [3, 2],
    [3, 3],
    [1, 3],
    [2, 5],
    [1, 5],
    [-1, -1],
    [-1, -2],
    [-2, -3],
    [-4, -4],
  ],
) {
    let localDefaut = [0,0]
    let rotate = 45
    let result = new Array(100).fill(0)
    array.forEach(e => ++result[e])
}
console.log('Ngamw sao', ngamSao())



function createRandom2DArray(
  rows: number,
  cols: number,
  min: number,
  max: number
) {
  // Initialize the 2D array
  const array = new Array(rows);

  for (let i = 0; i < rows; i++) {
    array[i] = new Array(cols); // Create a new row
    for (let j = 0; j < cols; j++) {
      // Set a random value between min and max
      array[i][j] = Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }

  return array;
}

export default createRandom2DArray;

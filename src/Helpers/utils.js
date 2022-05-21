export function getInputsValueFromEvent(e) {
  const formData = new FormData(e.target);
  return Object.fromEntries(formData.entries());
}

export function createBoxes(row, col) {
  let arr = [];

  arr.push(
    Array.from({ length: row }, (_, i) =>
      Array.from({ length: col }, (_, i) => null)
    )
  );

  arr[0][row / 2][col / 2] = 'empty';

  return arr[0];
}

export function createBoxesMap(boxes) {
  const copy = structuredClone(boxes);

  copy.forEach((row, rowIndex) => {
    row.forEach((el, elIndex) => {
      if (el && el !== 'empty') {
        if (!copy[rowIndex - 1][elIndex]) {
          copy[rowIndex - 1][elIndex] = 'empty';
        }
        if (!copy[rowIndex][elIndex - 1]) {
          copy[rowIndex][elIndex - 1] = 'empty';
        }
        if (!copy[rowIndex][elIndex + 1]) {
          copy[rowIndex][elIndex + 1] = 'empty';
        }
        if (!copy[rowIndex + 1][elIndex]) {
          copy[rowIndex + 1][elIndex] = 'empty';
        }
      }
    });
  });

  return copy;
}

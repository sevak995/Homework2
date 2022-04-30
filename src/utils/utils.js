export const returnMean = function (input) {
  const sum = input.reduce(
    (previousInput, currentInput) => previousInput + currentInput.value,
    0
  );

  const mean = sum / input.length;

  return mean;
};

export function getInputsValueFromEvent(e) {
  const formData = new FormData(e.target);
  return Object.fromEntries(formData.entries());
}

export function createBoxes(BOXES_AMOUNT) {
  return Array.from({ length: BOXES_AMOUNT }, (_, i) => 'box' + i);
}

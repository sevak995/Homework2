export function getInputsValueFromEvent(e) {
  const formData = new FormData(e.target);
  return Object.fromEntries(formData.entries());
}

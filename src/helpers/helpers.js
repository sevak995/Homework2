export function getInputsFromEvent(e) {
  const formData = new FormData(e.target);
  return Object.fromEntries(formData.entries());
}

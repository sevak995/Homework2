export function passportValidator(value, message) {
  return value.includes('AM')
    ? { valid: true, error: null }
    : { valid: false, error: message ?? `Passport ID must include "AM"` };
}

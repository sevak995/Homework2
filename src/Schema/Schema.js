export default class Schema {
  constructor(validators) {
    this.existingValidators = validators;
  }

  min(value, min, message) {
    return value.length >= min
      ? { valid: true, error: null }
      : {
          valid: false,
          error: message ?? `Miniumum ${min} characters required !`,
        };
  }

  max(value, max, message) {
    return value.length <= max
      ? { valid: true, error: null }
      : {
          valid: false,
          error: message ?? `Maximum ${max} characters required !`,
        };
  }

  email(value, message) {
    const atSymbol = value.indexOf('@');
    const dot = value.indexOf('.');
    return atSymbol < 1 || dot <= atSymbol + 2 || dot === value.length - 1
      ? {
          valid: false,
          error: message ?? `Invalid Email address !`,
        }
      : { valid: true, error: null };
  }

  required(value, message) {
    return value.trim() !== ''
      ? { valid: true, error: null }
      : {
          valid: false,
          error: message ?? `This input field must not be empty !`,
        };
  }

  url(value, message) {
    let url;

    try {
      url = new URL(value);
    } catch (_) {
      return {
        valid: false,
        error: message ?? `URL is invalid !`,
      };
    }

    return url.protocol === 'http:' || url.protocol === 'https:'
      ? { valid: true, error: null }
      : {
          valid: false,
          error: message ?? `URL is invalid !`,
        };
  }

  phone(value, message) {
    return value.length === 8 && Number.isInteger(+value)
      ? { valid: true, error: null }
      : {
          valid: false,
          error: message ?? `Invalid phone number, must be 8 numbers!`,
        };
  }

  validate(inputObj) {
    const { existingValidators } = this;

    const validationStatus = {};

    for (const inputType in inputObj) {
      if (!existingValidators[inputType]) {
        return;
      }

      const { validators: validatorsList, message } =
        existingValidators[inputType];

      validatorsList.forEach((validator) => {
        const inputValue = inputObj[inputType];

        if (typeof validator === 'string') {
          validationStatus[inputType] = this[validator](inputValue, message);
        }

        if (typeof validator === 'object') {
          const validatorName = Object.keys(validator)[0];
          const threshold = validator[validatorName];

          validationStatus[inputType] = this[validatorName](
            inputValue,
            threshold,
            message
          );
        }

        if (typeof validator === 'function') {
          validationStatus[inputType] = validator(inputValue);
        }
      });
    }

    return validationStatus;
  }
}

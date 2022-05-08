import { passportValidator } from './customValidators';

export const existingValidators = {
  firstName: {
    type: 'string',
    validators: [{ min: 3 }],
    message: 'The field must contain min 3 letters',
  },
  email: {
    type: 'string',
    validators: ['email'],
  },
  age: {
    type: 'number',
    validators: ['required'],
  },
  passport: {
    type: 'string',
    validators: [{ max: 9 }, passportValidator],
    message: 'Invalid phone inputs',
  },
  website: {
    type: 'string',
    validators: ['url'],
  },
  phoneNumbers: {
    type: 'array[string]',
    validators: ['phone'],
  },
};

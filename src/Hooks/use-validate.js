import { useCallback, useState } from 'react';
import Schema from '../Schema/Schema';
import { existingValidators } from '../Schema/existingValidators';

const schema = new Schema(existingValidators);

export const useValidate = () => {
  const [validationState, setValidationState] = useState({});

  const validate = useCallback((inputsValue) => {
    const result = schema.validate(inputsValue);

    let formIsValid = true;

    for (const type in result) {
      if (!result[type].valid) {
        formIsValid = false;
      }
    }

    setValidationState({ ...result, formIsValid });
  }, []);

  return [validationState, validate];
};

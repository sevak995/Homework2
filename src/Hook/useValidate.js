import { useCallback, useState } from 'react';
import Schema from '../Schema/Schema';
import { existingValidators } from '../Schema/existingValidators';

const schema = new Schema(existingValidators);

export const useValidate = () => {
  const [validationState, setValidationState] = useState({});

  const validate = useCallback((AllInputs) => {
    const result = schema.validate(AllInputs);
    setValidationState(result);
  }, []);

  return [validationState, validate];
};

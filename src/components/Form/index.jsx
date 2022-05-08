import { useValidate } from '../../Hooks/use-validate';
import { getInputsValueFromEvent } from '../../helpers';
import { useRef } from 'react';
import Input from '../Input';
import SuccessMessage from '../SuccessMessage';
import styles from './Form.module.css';

function Form() {
  const inputs = [
    { name: 'Email', type: 'email' },
    { name: 'FirstName', type: 'firstName' },
    { name: 'Age', type: 'age' },
    { name: 'Passport', type: 'passport' },
    { name: 'Url', type: 'website' },
    { name: 'PhoneNumbers', type: 'phoneNumbers' },
  ];

  const [validationState, validate] = useValidate();
  const { form, btn } = styles;
  const formRef = useRef();

  function onSubmit(event) {
    event.preventDefault();

    const inputsValue = getInputsValueFromEvent(event);

    validate(inputsValue);
  }

  if (validationState.formIsValid) {
    formRef.current.reset();
  }

  return (
    <form onSubmit={(e) => onSubmit(e)} className={form} ref={formRef}>
      {validationState.formIsValid && <SuccessMessage />}
      {inputs.map((input, i) => {
        const { name, type } = input;
        return (
          <Input
            name={name}
            type={type}
            validation={validationState[type]}
            key={i}
          />
        );
      })}
      <button type="submit" className={btn}>
        SUBMIT
      </button>
    </form>
  );
}

export default Form;

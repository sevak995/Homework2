import { useValidate } from '../../Hook/useValidate';
import { getInputsFromEvent } from '../../helpers/helpers';
import Input from '../Input/Input';
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

  function onSubmit(event) {
    event.preventDefault();

    const AllInputs = getInputsFromEvent(event);

    validate(AllInputs);
  }

  return (
    <form onSubmit={(e) => onSubmit(e)} className={form}>
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
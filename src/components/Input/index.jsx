import ErrorMessage from '../ErrorMessage';
import styles from './Input.module.css';
import { useRef } from 'react';

const Input = (props) => {
  const { validation, type, name } = props;

  const inputRef = useRef();

  if (validation?.error) {
    inputRef.current.focus();
  }

  const { form, form_label, form_input, form_input__error } = styles;

  const inputClass = validation?.error
    ? form_input + ' ' + form_input__error
    : form_input;

  return (
    <div className={form}>
      <label htmlFor={type} className={form_label}>
        {name}
      </label>
      <input
        ref={inputRef}
        id={type}
        name={type}
        className={inputClass}
      ></input>
      {validation?.error && <ErrorMessage errors={validation?.error} />}
    </div>
  );
};

export default Input;

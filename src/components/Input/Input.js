import styles from './Input.module.css';

const Input = (props) => {
  return (
    <div className={styles.input_form}>
      <label htmlFor={props.name}>{props.name}</label>
      <input id={props.name} name={props.name}></input>
    </div>
  );
};

export default Input;

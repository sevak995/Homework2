import styles from './ErrorMessage.module.css';

const ErrorMessage = (props) => {
  const { error } = styles;

  return <div className={error}>{props.errors}</div>;
};

export default ErrorMessage;

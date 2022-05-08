import styles from './ErrorMessage.module.css';

export default function ErrorMessage(props) {
  const { error } = styles;

  return <div className={error}>{props.errors}</div>;
}

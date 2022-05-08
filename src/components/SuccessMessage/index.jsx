import styles from './SuccessMessage.module.css';

export default function SuccessMessage() {
  const { success } = styles;

  return (
    <div className={success}>Your form has been successfully submitted!</div>
  );
}

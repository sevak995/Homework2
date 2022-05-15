import Input from '../Input/Input';
import { getInputsValueFromEvent } from '../../Helpers/utils';
import { useState } from 'react';
import styles from './Form.module.css';
import Modal from '../Modal/Modal';

export default function Form({ attributes, setProps }) {
  const [showModal, setShowModal] = useState(false);

  function onSubmit(event) {
    event.preventDefault();

    setShowModal((boo) => !boo);

    const inputValue = getInputsValueFromEvent(event);

    setProps(inputValue);
  }

  return (
    <div>
      <button
        onClick={() => setShowModal((boo) => !boo)}
        className={styles.btn}
      >
        Change attributes
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal((boo) => !boo)}>
          <form onSubmit={onSubmit} className={styles.form}>
            {attributes.map((atr) => (
              <Input key={atr} name={atr} />
            ))}
            <button type="submit" className={styles.btn}>
              SUBMIT
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}

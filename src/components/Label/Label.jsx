import { ElementsContext } from '../../Context/ElementsContext';
import { useContext } from 'react';
import styles from './Label.module.css';

export default function Label({ name }) {
  const { dispatch } = useContext(ElementsContext);

  function onDragStart(event) {
    const elementType = event.target.innerText;
    const actionType = event.type;
    dispatch({ type: actionType, elementType });
  }

  function onDragEnd(event) {
    event.preventDefault();
    dispatch({ type: event.type });
  }

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className={styles.element}
    >
      {name}
    </div>
  );
}

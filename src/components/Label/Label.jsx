import styles from './Label.module.css';
import { useDispatch } from 'react-redux';
import { elementActions } from '../../store/elements';

export default function Label({ name }) {
  const dispatch = useDispatch();

  const { dragstart, dragend } = elementActions;

  function onDragStart(event) {
    const elementType = event.target.innerText;

    dispatch(dragstart({ elementType }));
  }

  function onDragEnd(event) {
    event.preventDefault();

    dispatch(dragend());
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

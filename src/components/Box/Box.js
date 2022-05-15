import { useContext } from 'react';
import { ElementsContext } from '../../Context/ElementsContext';
import styles from './Box.module.css';
import Dropped from '../Dropped/Dropped';

export default function Box({ id }) {
  const { elementsState, dispatch } = useContext(ElementsContext);

  const isDropped = Boolean(elementsState.droppedElements[id]);

  function onDragEnter(event) {
    event.preventDefault();

    if (isDropped) {
      return;
    }

    event.target.className = styles.droppable;
  }

  function onDragOver(event) {
    event.preventDefault();

    if (isDropped) {
      return;
    }
  }

  function onDragLeave(event) {
    event.preventDefault();

    if (isDropped) {
      return;
    }
    event.target.className = styles.box;
  }

  function onDrop(event) {
    event.preventDefault();

    if (isDropped) {
      return;
    }

    event.target.className = styles.dropped;

    const actionType = event.type;

    const boxName = event.target.id;

    dispatch({ type: actionType, boxName });
  }

  return (
    <div
      id={id}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={
        isDropped
          ? styles.dropped
          : elementsState.draggedElement
          ? styles.box
          : null
      }
    >
      {isDropped && <Dropped box={id} />}
    </div>
  );
}

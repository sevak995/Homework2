import styles from './Box.module.css';
import Dropped from '../Dropped/Dropped';
import { elements } from '../../Helpers/elements';
import { useDispatch, useSelector } from 'react-redux';
import { elementActions } from '../../store/elements';

export default function Box({ id, row, col }) {
  const dispatch = useDispatch();

  const currentStep = useSelector((state) => state.elements.step);
  const element = useSelector(
    (state) => state.elements.boxes[currentStep][row][col]
  );
  const draggedElement = useSelector((state) => state.elements.draggedElement);

  let attributes = [];

  if (id !== 'empty') {
    // console.log(id);
    const { attributes: attr } = elements.find((el) => el.tag === element);
    attributes = attr;
  }

  const customAttributes = ['label', 'width'];

  const allAttributes = [...attributes, ...customAttributes];

  const isDropped = Boolean(id !== 'empty');

  function onDragEnter(event) {
    event.preventDefault();

    if (isDropped) {
      return;
    }
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
  }

  function onDrop(event) {
    event.preventDefault();

    if (isDropped) {
      return;
    }

    const actionType = event.type;

    const boxData = { boxName: event.target.id, row, col };

    dispatch(elementActions.drop({ type: actionType, boxData }));
  }

  return (
    <>
      {id && (
        <div
          id={id}
          onDragEnter={onDragEnter}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={
            isDropped
              ? styles.dropped
              : draggedElement
              ? styles.box
              : styles.def
          }
        >
          {isDropped && (
            <Dropped element={element} allAttributes={allAttributes} />
          )}
        </div>
      )}
    </>
  );
}

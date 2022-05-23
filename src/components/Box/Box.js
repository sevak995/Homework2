import styles from "./Box.module.css";
import Dropped from "../Dropped/Dropped";
import { elements } from "../../Helpers/elements";
import { useDispatch, useSelector } from "react-redux";
import { elementActions } from "../../store/elements";
import { customAttributes } from "../../Helpers/config";

export default function Box({ element, row, col }) {
  const dispatch = useDispatch();

  const draggedElement = useSelector((state) => state.elements.draggedElement);

  const isDropped = Boolean(element !== "empty");

  let attributes = [];

  if (isDropped) {
    const { attributes: elementAttributes } = elements.find(
      (el) => el.tag === element
    );
    attributes = elementAttributes;
  }

  const allAttributes = [...attributes, ...customAttributes];

  function onDragOver(event) {
    event.preventDefault();
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

  return (
    <>
      {element && (
        <div
          onDragOver={onDragOver}
          onDragEnter={onDragEnter}
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

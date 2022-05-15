import { useContext, useState } from 'react';
import { ElementsContext } from '../../Context/ElementsContext';
import { elements } from '../../Helpers/elements';
import Form from '../Form/Form';
import Element from '../Element/Element';
import styles from './Dropped.module.css';

const Dropped = ({ box }) => {
  const [props, setProps] = useState({});

  const { elementsState } = useContext(ElementsContext);

  const element = elementsState.droppedElements[box];

  const { attributes } = elements.find((el) => el.tag === element);

  const customAttributes = ['label', 'width'];

  const allAttributes = [...attributes, ...customAttributes];

  return (
    <div className={styles.element}>
      <div className={styles.label}>
        <label htmlFor={props.label ?? ''}>
          {props.label ?? 'Label, which we should choose from the Modal )))'}
        </label>
        <Element
          {...props}
          type={element}
          id={element}
          style={{ width: props.width }}
        />
      </div>
      <Form attributes={allAttributes} setProps={setProps} />
    </div>
  );
};

export default Dropped;

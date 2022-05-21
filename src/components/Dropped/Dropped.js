import { useState } from 'react';
import Form from '../Form/Form';
import Element from '../Element/Element';
import styles from './Dropped.module.css';

const Dropped = ({ element, allAttributes }) => {
  const [props, setProps] = useState({});

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

import styles from './Sidebar.module.css';
import Label from '../Label/Label';
import { useContext } from 'react';
import { ElementsContext } from '../../Context/ElementsContext';
import { sidebarElements } from '../../Helpers/config';

const Sidebar = () => {
  const { dispatch } = useContext(ElementsContext);

  return (
    <div className={styles.flex}>
      <button
        onClick={() => dispatch({ type: 'reset' })}
        className={styles.btn}
      >
        RESET
      </button>
      {sidebarElements.map((element, i) => (
        <Label key={i} name={element} />
      ))}
    </div>
  );
};

export default Sidebar;

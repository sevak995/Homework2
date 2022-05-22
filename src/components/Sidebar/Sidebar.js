import styles from './Sidebar.module.css';
import Label from '../Label/Label';
import { useDispatch } from 'react-redux';
import { elementActions } from '../../store/elements';
import { sidebarElements } from '../../Helpers/config';

const Sidebar = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles.flex}>
      <button
        onClick={() => dispatch(elementActions.reset())}
        className={styles.btn}
      >
        RESET
      </button>
      <button
        onClick={() => dispatch(elementActions.redo())}
        className={styles.btn}
      >
        REDO
      </button>
      {sidebarElements.map((element, i) => (
        <Label key={i} name={element} />
      ))}
    </div>
  );
};

export default Sidebar;

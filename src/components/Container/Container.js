import styles from './Container.module.css';
import { useSelector } from 'react-redux';
import BoxRow from '../BoxRow/BoxRow';

const Container = () => {
  const currentStep = useSelector((state) => state.elements.step);
  const boxes = useSelector((state) => state.elements.boxes);

  return (
    <div className={styles.container}>
      {boxes[currentStep].flatMap((row, rowIndex) => {
        if (row.find((el) => el !== null)) {
          return <BoxRow key={rowIndex} row={row} rowIndex={rowIndex} />;
        }
      })}
    </div>
  );
};

export default Container;

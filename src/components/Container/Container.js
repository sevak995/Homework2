import styles from './Container.module.css';
import Box from '../Box/Box';
import { createBoxes } from '../../Helpers/utils';
import { BOXES_AMOUNT } from '../../Helpers/config';

const Container = () => {
  const boxes = createBoxes(BOXES_AMOUNT);

  return (
    <div className={styles.container}>
      {boxes.map((box) => (
        <Box key={box} id={box} />
      ))}
    </div>
  );
};

export default Container;

import styles from './BoxRow.module.css';
import Box from '../Box/Box';

export default function BoxRow({ row, rowIndex }) {
  // console.log(row);
  return (
    <div key={rowIndex} className={styles.col}>
      {row.flatMap((el, elIndex) =>
        el ? <Box key={elIndex} id={el} row={rowIndex} col={elIndex} /> : []
      )}
    </div>
  );
}

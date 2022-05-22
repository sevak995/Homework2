import styles from './BoxRow.module.css';
import Box from '../Box/Box';

export default function BoxRow({ row, rowIndex }) {
  return (
    <div key={rowIndex} className={styles.col}>
      {row.flatMap((el, elIndex) =>
        el ? (
          <Box key={elIndex} element={el} row={rowIndex} col={elIndex} />
        ) : (
          []
        )
      )}
    </div>
  );
}

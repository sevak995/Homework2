import styles from './Container.module.css';
import Box from '../Box/Box';
import { useSelector } from 'react-redux';

const Container = () => {
  const boxes = useSelector((state) => state.elements.boxes);

  const rows = boxes.filter((row) => {
    return row.find((el) => el !== null);
  });

  console.log('rows', rows.length);

  function getColomns(rows) {
    let colomns = 1;

    rows.forEach((col) => {
      if (col.filter((el) => el !== null).length > colomns) {
        colomns = col.filter((el) => el !== null).length;
      }
    });

    return colomns;
  }

  const collms = getColomns(rows);

  console.log('collms', collms);

  return (
    <div
      className={styles.container}
      style={{
        gridTemplateRows: `repeat(${rows.length}, 1fr)`,
        gridTemplateColumns: `repeat(${collms}, 1fr)`,
      }}
    >
      {boxes.flatMap((row, rowIndex) => {
        if (row.find((el) => el !== null)) {
          return (
            <div key={rowIndex} style={{ gridRow: `${rowIndex + 1} / 1` }}>
              {row.flatMap((el, elIndex) =>
                el ? (
                  <Box key={elIndex} id={el} row={rowIndex} col={elIndex} />
                ) : (
                  []
                )
              )}
            </div>
          );
        }
      })}
    </div>
  );
};

export default Container;

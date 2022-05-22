import { createSlice, current } from '@reduxjs/toolkit';
import { createBoxes, createBoxesMap } from '../Helpers/utils';

const initialBoxes = createBoxes(10, 10);

const initialState = {
  draggedElement: null,
  boxes: [initialBoxes],
  step: 0,
};

const elementSlice = createSlice({
  name: 'elements',
  initialState: initialState,
  reducers: {
    dragstart(state, action) {
      state.draggedElement = action.payload.elementType;
    },

    drop(state, action) {
      const boxClone = structuredClone(current(state).boxes[state.step]);

      boxClone[action.payload.boxData.row][action.payload.boxData.col] =
        state.draggedElement;

      console.log('boxClone', boxClone);

      const updatedBoxes = createBoxesMap(boxClone, state.step);
      state.step++;

      state.boxes.push(updatedBoxes);
    },

    dragend(state) {
      state.draggedElement = null;
    },

    redo(state) {
      if (state.step > 0) {
        state.step--;
      }
    },

    reset(state) {
      state.draggedElement = null;
      state.boxes = [initialBoxes];
      state.step = 0;
    },
  },
});

export const elementActions = elementSlice.actions;

export default elementSlice.reducer;

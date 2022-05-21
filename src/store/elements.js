import { createSlice, current } from '@reduxjs/toolkit';
import { createBoxes, createBoxesMap } from '../Helpers/utils';

const initialBoxes = createBoxes(10, 10);

const initialState = {
  draggedElement: null,
  boxes: initialBoxes,
};

const elementSlice = createSlice({
  name: 'elements',
  initialState: initialState,
  reducers: {
    dragstart(state, action) {
      state.draggedElement = action.payload.elementType;
    },

    drop(state, action) {
      const boxClone = structuredClone(current(state).boxes);

      boxClone[action.payload.boxData.row][action.payload.boxData.col] =
        state.draggedElement;

      const updatedBoxes = createBoxesMap(boxClone);
      state.boxes = [...updatedBoxes];
    },

    dragend(state) {
      state.draggedElement = null;
    },

    reset(state) {
      state.draggedElement = null;
      state.boxes = initialBoxes;
    },
  },
});

export const elementActions = elementSlice.actions;

export default elementSlice.reducer;

import React, { useReducer } from 'react';

export const ElementsContext = React.createContext();

function reducer(state, action) {
  switch (action.type) {
    case 'dragstart':
      return { ...state, draggedElement: action.elementType };
    case 'drop':
      return {
        ...state,
        droppedElements: {
          ...state.droppedElements,
          [action.boxName]: state.draggedElement,
        },
      };
    case 'dragend':
      return { ...state, draggedElement: action.elementType };
    case 'reset':
      return {
        droppedElements: {},
      };
    default:
      console.log(`Action does not exist!`);
  }
}

const ElementsProvider = ({ children }) => {
  const [elementsState, dispatch] = useReducer(reducer, {
    droppedElements: {},
  });

  const value = { elementsState, dispatch };
  return (
    <ElementsContext.Provider value={value}>
      {children}
    </ElementsContext.Provider>
  );
};

export default ElementsProvider;

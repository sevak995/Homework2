import { configureStore } from '@reduxjs/toolkit';
import elementReducer from './elements';

const store = configureStore({
  reducer: { elements: elementReducer },
});

export default store;

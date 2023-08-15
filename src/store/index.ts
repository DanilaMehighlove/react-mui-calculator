import { configureStore } from '@reduxjs/toolkit';
import historyReducer from './features/historySlice';

const store = configureStore({
  reducer: {
    history: historyReducer
  }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
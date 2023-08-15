import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

export interface IHistoryItem {
  id: number;
  text: string;
}

interface IHistory {
  list: IHistoryItem[];
};

const initialState: IHistory = {
  list: []
};

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addHistory: (state, action: PayloadAction<string>) => {
      if (action.payload) {
        state.list = [
          {
            id: state.list.length ? Math.max(...state.list.map(r => r.id)) + 1 : 0,
            text: action.payload
          },
          ...state.list
        ];
      }
    }
  }
});

export const { addHistory } = historySlice.actions;
export const selectHistory = (state: RootState) => state.history.list;
export default historySlice.reducer;
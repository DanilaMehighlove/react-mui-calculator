import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

type historyItemType = 'calculator' | 'conerter'

export interface IHistoryItem {
  id: number;
  expression: string;
  result: string;
  type: historyItemType;
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
    addHistory: (state, action: PayloadAction<{expression: string, result: string, type: historyItemType}>) => {
      if (action.payload) {
        state.list = [
          {
            id: state.list.length ? Math.max(...state.list.map(r => r.id)) + 1 : 0,
            expression: action.payload.expression,
            result: action.payload.result,
            type: action.payload.type
          },
          ...state.list
        ];
      }
    },
    deleteHistory: (state, action: PayloadAction<number>) => {
      const index = state.list.findIndex(item => item.id === action.payload);
      if (index === -1) return;
      state.list.splice(index, 1);
    }
  }
});

export const { addHistory, deleteHistory } = historySlice.actions;
export const selectHistory = (state: RootState) => state.history.list;
export default historySlice.reducer;
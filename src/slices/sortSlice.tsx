import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SortState {
    activeSort: string
}

const initialState: SortState = {
  activeSort: 'cheapest',
};

const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setActiveSort: (state, action:PayloadAction<string>): void => {
      state.activeSort = action.payload;
    },
  },
});

export const { setActiveSort } = sortSlice.actions;
export default sortSlice.reducer;

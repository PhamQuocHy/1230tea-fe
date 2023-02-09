import { createSlice } from "@reduxjs/toolkit";

interface poolView {
  listPool: any;
}

const initialState: poolView = {
  listPool: [],
};

export const poolSlice = createSlice({
  name: "pool",
  initialState,
  reducers: {
    savelistPool: (state, action) => {
      state.listPool = action.payload;
    },
  },
});

export const { savelistPool } = poolSlice.actions;

export default poolSlice.reducer;

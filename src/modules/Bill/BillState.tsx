import React from "react";

import { createSlice } from "@reduxjs/toolkit";

interface BillState {
  listBill: any;
}

const initialState: BillState = {
  listBill: [],
};

export const BillSlice = createSlice({
  name: "Bill",
  initialState,
  reducers: {
    saveListBill: (state, action) => {
      state.listBill = action.payload;
    },
    reset: () => initialState,
  },
});

export const { saveListBill, reset } = BillSlice.actions;

export default BillSlice.reducer;

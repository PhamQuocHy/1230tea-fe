import { createSlice } from "@reduxjs/toolkit";
import React from "react";

interface HistoryStateProps {
  historyList: any;
}

const initialState: HistoryStateProps = {
  historyList: [],
};

export const HistorySlice = createSlice({
  name: "History",
  initialState,
  reducers: {
    saveHistory: (state, action) => {
      state.historyList = [...state.historyList, action.payload];
    },

    resetHistory: () => initialState,
  },
});

export const { saveHistory, resetHistory } = HistorySlice.actions;

export default HistorySlice.reducer;

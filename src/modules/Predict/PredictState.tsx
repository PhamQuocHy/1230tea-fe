import React from "react";

import { createSlice } from "@reduxjs/toolkit";

interface PredictState {
  listPredict: any;
}

const initialState: PredictState = {
  listPredict: [],
};

export const PredictSlice = createSlice({
  name: "Predict",
  initialState,
  reducers: {
    saveListPredict: (state, action) => {
      state.listPredict = action.payload;
    },
    reset: () => initialState,
  },
});

export const { saveListPredict, reset } = PredictSlice.actions;

export default PredictSlice.reducer;

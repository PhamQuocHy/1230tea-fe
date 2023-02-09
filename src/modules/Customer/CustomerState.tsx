import React from "react";

import { createSlice } from "@reduxjs/toolkit";

interface CustomerState {
  listCustomer: any;
}

const initialState: CustomerState = {
  listCustomer: [],
};

export const CustomerSlice = createSlice({
  name: "Customer",
  initialState,
  reducers: {
    saveListCustomer: (state, action) => {
      state.listCustomer = action.payload;
    },
    reset: () => initialState,
  },
});

export const { saveListCustomer, reset } = CustomerSlice.actions;

export default CustomerSlice.reducer;

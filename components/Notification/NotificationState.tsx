import React from "react";

import { createSlice } from "@reduxjs/toolkit";

interface notificationView {
  notification: any
}

const initialState: notificationView = {
  notification: {}
};

export const NotificationSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    saveNotification: (state, action) => {
      state.notification = action
    }
  },
});

export const {
  saveNotification
} = NotificationSlice.actions;

export default NotificationSlice.reducer;

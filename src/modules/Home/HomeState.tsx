import React from "react";

import { createSlice } from "@reduxjs/toolkit";

interface homeView {
  listStatusRoom: any;
  listOrderService: any;
  listFloorHome: any;
  listUnit: any;
  listItemMenu: any;
  listRoomBooked: any;
  listServiceRoom: any;
  listRoomReport: any;
}

const initialState: homeView = {
  listStatusRoom: [],
  listOrderService: [],
  listFloorHome: [],
  listUnit: [],
  listItemMenu: [],
  listRoomBooked: [],
  listServiceRoom: [],
  listRoomReport: []
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    saveListStatusRoom: (state, action) => {
      state.listStatusRoom = action.payload;
    },

    saveListOrderService: (state, action) => {
      state.listOrderService = action.payload;
    },

    saveListFloorHome: (state, action) => {
      state.listFloorHome = action.payload;
    },

    saveListUnit: (state, action) => {
      state.listUnit = action.payload;
    },

    saveListItemMenu: (state, action) => {
      state.listItemMenu = action.payload;
    },
    saveListRoomBooked: (state, action) => {
      state.listRoomBooked = action.payload;
    },
    saveListServiceRoom: (state, action) => {
      state.listServiceRoom = action.payload;
    },

    saveListRoomReport: (state, action) => {
      state.listRoomReport = action.payload;
    },

    reset: () => initialState,
  },
});

export const {
  saveListStatusRoom,
  reset,
  saveListFloorHome,
  saveListOrderService,
  saveListUnit,
  saveListItemMenu,
  saveListRoomBooked,
  saveListServiceRoom,
  saveListRoomReport
} = homeSlice.actions;

export default homeSlice.reducer;

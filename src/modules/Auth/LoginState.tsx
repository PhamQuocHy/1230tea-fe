import { createSlice } from "@reduxjs/toolkit";

export interface loginState {
  token: any;
  user: any;
  handhover: boolean;
  userAssigned: any;
  general_setting: any;
}

const initialState: loginState = {
  token: null,
  user: {},
  handhover: false,
  userAssigned: {},
  general_setting: {},
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    saveToken: (state, aciton) => {
      state.token = aciton.payload;
    },

    saveUser: (state, action) => {
      state.user = action.payload;
    },

    saveHandhover: (state, action) => {
      state.handhover = action.payload;
    },

    saveUserAssigned: (state, action) => {
      state.userAssigned = action.payload;
    },
    saveGeneralSetting: (state, action) => {
      state.general_setting = action.payload;
    },

    reset: () => initialState,
  },
});

export const {
  saveToken,
  saveUser,
  saveHandhover,
  saveUserAssigned,
  saveGeneralSetting,
  reset,
} = loginSlice.actions;

export default loginSlice.reducer;

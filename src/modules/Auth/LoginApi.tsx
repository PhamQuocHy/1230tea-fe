import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  hideLoading,
  showLoading,
} from "../../components/LoadingView/LoadingState";
import { url } from "../../utils/ApiUrl";
import axiosClient from "../../utils/axiosClient";
import { CONSTANTS } from "../../utils/contanst";
import { NoticationView } from "../../utils/NotificationView";
// import { getSettingGeneral } from "../Setting/SettingApi";
import { saveGeneralSetting, saveToken, saveUser } from "./LoginState";

// user login
export const userLogin = createAsyncThunk(
  "login/userLogin",
  async (data: any, thunkyApi) => {
    try {
      thunkyApi.dispatch(showLoading());
      const reps = await axiosClient.post(url.LOGIN, data);
      thunkyApi.dispatch(hideLoading());
      if (reps.data.result) {
        // thunkyApi.dispatch(getSettingGeneral({}));
        window.localStorage.setItem(
          CONSTANTS.TOKEN,
          reps.data.data.access_token
        );
        window.localStorage.setItem(
          CONSTANTS.USER,
          JSON.stringify(reps.data.data.user)
        );
        thunkyApi.dispatch(saveToken(reps.data.data.access_token));
        thunkyApi.dispatch(saveUser(reps.data.data.user));
        NoticationView(true, "Thông báo", reps.data.message);
        console.log("Show PopUp");

        return true;
      } else {
        NoticationView(false, "Thông báo", reps.data.message);
        return false;
      }
    } catch (error) {
      console.log("errror", error);
    }
  }
);

export const userLogout = createAsyncThunk(
  "login/userLogout",
  async (data: any, thunkyApi) => {
    try {
      thunkyApi.dispatch(showLoading());
      const reps = await axiosClient.post(url.LOGOUT, data);
      thunkyApi.dispatch(hideLoading());
      if (reps.data.result) {
        NoticationView(true, "Thông báo", reps.data.message);
        return true;
      } else {
        NoticationView(false, "Thông báo", reps.data.message);
        return false;
      }
    } catch (error) {
      console.log("errror", error);
    }
  }
);

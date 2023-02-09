import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../utils/axiosClient";
import { url } from "../../utils/ApiUrl";
import {
  hideLoading,
  showLoading,
} from "../../components/LoadingView/LoadingState";
import { NoticationView } from "../../utils/NotificationView";
import { saveListPredict } from "./PredictState";

//Get list flort
export const getListPredict = createAsyncThunk(
  "Predict/getListFlort",
  async (data: any, thunkyApi) => {
    try {
      thunkyApi.dispatch(showLoading());
      const reps: any = await axiosClient.get(url.PREDICT_INDEX, {
        params: data,
      });
      thunkyApi.dispatch(hideLoading());
      if (reps) {
        thunkyApi.dispatch(saveListPredict(reps ? reps.data : reps));
        return {
          action: true,
          total: reps,
          page: reps.data.data.current_page,
        };
      } else {
        thunkyApi.dispatch(saveListPredict([]));
        return { action: false };
      }
    } catch (error) {
      console.log("errror", error);
    }
  }
);

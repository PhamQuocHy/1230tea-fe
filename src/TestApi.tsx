import { createAsyncThunk } from "@reduxjs/toolkit";
import { hideLoading, showLoading } from "./components/LoadingView/LoadingState";
import { saveToken, saveUser } from "./modules/Auth/LoginState";
import { url } from "./utils/ApiUrl";
import axiosClient from "./utils/axiosClient";
import { CONSTANTS } from "./utils/contanst";
import { NoticationView } from "./utils/NotificationView";

export const testProduct = createAsyncThunk(
    "test/product",
    async (data: any, thunkyApi) => {
      try { 
        console.log("loading")
        thunkyApi.dispatch(showLoading());
        const reps = await axiosClient.get(url.PRODUCT_ZODIAC_INDEX, {params:{zodiac_id:10,currentBranch:7,}});
        thunkyApi.dispatch(hideLoading());
        if (reps.data.result) {
          console.log(reps.data.data)
          return reps.data.data;
        } else {
          NoticationView(false, "Thông báo", reps.data.message);
          return false;
        }
      } catch (error) {
        console.log("errror", error);
      }
    }
  );
  
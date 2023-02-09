import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../utils/axiosClient";
import { url } from "../../utils/ApiUrl";
import {
  hideLoading,
  showLoading,
} from "../../components/LoadingView/LoadingState";
import { NoticationView } from "../../utils/NotificationView";
import { saveListBill } from "./BillState";

//Get list flort
export const getListBill = createAsyncThunk(
  "Bill/getListFlort",
  async (data: any, thunkyApi) => {
    try {
      thunkyApi.dispatch(showLoading());
      const reps: any = await axiosClient.get(url.Bill_INDEX, {
        params: data,
      });
      thunkyApi.dispatch(hideLoading());

      if (reps) {
        thunkyApi.dispatch(saveListBill(reps ? reps.data.data.data : reps));
        return {
          action: true,
          total: reps,
          page: reps.data.data.current_page,
        };
      } else {
        thunkyApi.dispatch(saveListBill([]));
        return { action: false };
      }
    } catch (error) {
      console.log("errror", error);
    }
  }
);

//edit Bill
export const editBill = createAsyncThunk(
  "Bill/editBill",
  async (formData: { id: any; data: any }, thunkyApi) => {
    try {
      thunkyApi.dispatch(showLoading());
      const reps: any = await axiosClient.post(
        url.EDIT_Bill + `/${formData.id}`,
        formData.data
      );
      thunkyApi.dispatch(hideLoading());
      if (reps.data.result) {
        NoticationView(reps.data.result, "Thành công", reps.data.message);
        return true;
      } else {
        NoticationView(reps.data.result, "Thất bại", reps.data.message);
        return false;
      }
    } catch (error) {
      console.log("errror", error);
    }
  }
);

//store Bill
export const storeBill = createAsyncThunk(
  "Bill/storeBill",
  async (formData: { data: any }, thunkyApi) => {
    try {
      thunkyApi.dispatch(showLoading());
      const reps: any = await axiosClient.post(url.ADD_Bill, formData.data);
      thunkyApi.dispatch(hideLoading());
      if (reps.data.result) {
        NoticationView(reps.data.result, "Thành công", reps.data.message);
        return true;
      } else {
        NoticationView(reps.data.result, "Thất bại", reps.data.message);
        return false;
      }
    } catch (error) {
      console.log("errror", error);
    }
  }
);

//destroy Billt
export const destroyBill = createAsyncThunk(
  "Bill/destroyBill",
  async (formData: { id: any }, thunkyApi) => {
    try {
      thunkyApi.dispatch(showLoading());
      const reps: any = await axiosClient.post(
        url.DELETE_Bill + `/${formData.id}`
      );
      thunkyApi.dispatch(hideLoading());
      if (reps.data.result) {
        NoticationView(reps.data.result, "Thành công", reps.data.message);
        return true;
      } else {
        NoticationView(reps.data.result, "Thất bại", reps.data.message);
        return false;
      }
    } catch (error) {
      console.log("errror", error);
    }
  }
);

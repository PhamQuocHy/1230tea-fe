import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../utils/axiosClient";
import { url } from "../../utils/ApiUrl";
import {
  hideLoading,
  showLoading,
} from "../../components/LoadingView/LoadingState";
import { NoticationView } from "../../utils/NotificationView";
import { saveListCustomer } from "./CustomerState";

//Get list flort
export const getListCustomer = createAsyncThunk(
  "Customer/getListFlort",
  async (data: any, thunkyApi) => {
    try {
      thunkyApi.dispatch(showLoading());
      const reps: any = await axiosClient.get(url.Bill_INDEX, {
        params: data,
      });
      thunkyApi.dispatch(hideLoading());
      // console.log(
      //   "👾👾👾👾👾👾👾👾👾 ~ file: CustomerHistoryViewManager.tsx:87 ~ loadData ~ resultCustomer",
      //   reps,
      // );
      if (reps) {
        thunkyApi.dispatch(saveListCustomer(reps ? reps.data : reps));
        return {
          action: true,
          total: reps,
          page: reps.data.data.current_page,
        };
      } else {
        thunkyApi.dispatch(saveListCustomer([]));
        return { action: false };
      }
    } catch (error) {
      console.log("errror", error);
    }
  }
);

//edit Customer
export const editCustomer = createAsyncThunk(
  "Customer/editCustomer",
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

//store Customer
export const storeCustomer = createAsyncThunk(
  "Customer/storeCustomer",
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

//destroy Customert
export const destroyCustomer = createAsyncThunk(
  "Customer/destroyCustomer",
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

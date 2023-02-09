import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  hideLoading,
  showLoading,
} from "../../components/LoadingView/LoadingState";
import { url } from "../../utils/ApiUrl";
import axiosClient from "../../utils/axiosClient";

export const ForgotPasswordApi = createAsyncThunk(
  "auth/forgotPassword",
  async (data: any, thunkAPI) => {
    try {
      thunkAPI.dispatch(showLoading());
      const response = await axiosClient.post(url.AUTH_FORGET_PASSWORD, data);
      thunkAPI.dispatch(hideLoading());
      return response.data;
    } catch (error) {
      console.log("errror", error);
    }
  }
);

export const VerifyOtpApi = createAsyncThunk(
  "auth/verifyOtp",
  async (data: any, thunkAPI) => {
    try {
      thunkAPI.dispatch(showLoading());
      const response = await axiosClient.post(url.AUTH_VERIFY_OTP, data);
      thunkAPI.dispatch(hideLoading());
      return response.data;
    } catch (error) {
      console.log("errror", error);
    }
  }
);

export const NewPasswordApi = createAsyncThunk(
  "auth/newPassword",
  async (data: any, thunkAPI) => {
    try {
      thunkAPI.dispatch(showLoading());
      const response = await axiosClient.post(url.AUTH_NEW_PASSWORD, data);
      thunkAPI.dispatch(hideLoading());
      return response.data;
    } catch (error) {
      console.log("errror", error);
    }
  }
);

export const NewOtpApi = createAsyncThunk(
  "auth/newOtp",
  async (data: any, thunkAPI) => {
    try {
      thunkAPI.dispatch(showLoading());
      const response = await axiosClient.post(url.AUTH_NEW_OTP, data);
      thunkAPI.dispatch(hideLoading());
      return response.data;
    } catch (error) {
      console.log("error", error);
    }
  }
);

export const CheckPhoneApi = createAsyncThunk(
  "auth/checkPhone",
  async (data: any, thunkAPI) => {
    try {
      thunkAPI.dispatch(showLoading());
      const response = await axiosClient.post(url.AUTH_CHECK_PHONE, data);
      thunkAPI.dispatch(hideLoading());
      return response.data;
    } catch (error) {
      console.log("error", error);
    }
  }
);

export const RegisterWebApi = createAsyncThunk(
  "auth/registerWeb",
  async (data: any, thunkAPI) => {
    try {
      thunkAPI.dispatch(showLoading());
      const response = await axiosClient.post(url.AUTH_REGISTER_WEB, data);
      thunkAPI.dispatch(hideLoading());
      return response.data;
    } catch (error) {
      console.log("error", error);
    }
  }
);

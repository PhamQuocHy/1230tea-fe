import { createAsyncThunk } from "@reduxjs/toolkit";
import React from "react";
import {
  hideLoading,
  showLoading,
} from "../../components/LoadingView/LoadingState";
import { url } from "../../utils/ApiUrl";
import axiosClient from "../../utils/axiosClient";

export interface OrderTelegramType {
  customer: CustomerTelegramType;
  products: ProductTelegramType[];
  note: string;
  total: number;
}

interface CustomerTelegramType {
  name: string;
  phone: string;
  address: string;
  birthday: string;
}

interface ProductTelegramType {
  id: string;
  quantity: number;
  note: string;
  topping: ToppingTelegramType[];
}

interface ToppingTelegramType {
  id: string;
  quantity: number;
}

export const productZodiacIndexApi = createAsyncThunk(
  "productZodiac/index",
  async (data: any, thunkApi) => {
    try {
      thunkApi.dispatch(showLoading());
      const response = await axiosClient.get(url.PRODUCT_ZODIAC_INDEX, {
        params: data,
      });
      thunkApi.dispatch(hideLoading());
      return response.data;
    } catch (error) {
      console.log("error", error);
    }
  }
);

export const orderWebTelegramApi = createAsyncThunk(
  "orderWebTelegram",
  async (data: OrderTelegramType, thunkApi) => {
    try {
      thunkApi.dispatch(showLoading());
      const response = await axiosClient.post(url.ORDER_WEB_TELEGRAM, data);
      thunkApi.dispatch(hideLoading());
      return response.data;
    } catch (error) {
      console.log("error", error);
    }
  }
);

import { createSlice } from "@reduxjs/toolkit";
import React from "react";

interface OrderStateProps {
  menuList: any;
  cart: any;
}

const initialState: OrderStateProps = {
  menuList: [],
  cart: [],
};

export const OrderSlice = createSlice({
  name: "Order",
  initialState,
  reducers: {
    saveMenuList: (state, action) => {
      state.menuList = action.payload;
    },
    addToCart: (state, action) => {
      state.cart = [...state.cart, action.payload];
    },
    updateItem: (state, action) => {
      const index = state.cart.findIndex(
        (item: any) => item.cart_id === action.payload.cart_id
      );
      state.cart[index] = action.payload;
    },
    increaseQuantity: (state, action) => {
      const index = state.cart.findIndex(
        (item: any) => item.cart_id === action.payload
      );
      state.cart[index].quantity += 1;
    },
    decreaseQuantity: (state, action) => {
      const index = state.cart.findIndex(
        (item: any) => item.cart_id === action.payload
      );
      console.log(index);
      console.log(state.cart);
      state.cart[index].quantity -= 1;
    },
    removeItem: (state, action) => {
      const index = state.cart.findIndex(
        (item: any) => item.cart_id === action.payload
      );
      state.cart.splice(index, 1);
    },
    resetOrder: () => initialState,
  },
});

export const {
  saveMenuList,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  updateItem,
  resetOrder,
} = OrderSlice.actions;

export default OrderSlice.reducer;

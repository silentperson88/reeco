import { createSlice } from "@reduxjs/toolkit";
import jsonData from "../../data/orderData.json";

const initialState = {
  loading: "idle",
  orderList: [],
};

export const orderSlice = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {
    fetchData: (state, action) => {
      state.loading = "pending";
      state.orderList = jsonData;
    },
    updateMissingProduct: (state, action) => {
      const { id, type } = action.payload;
      const order = state.orderList.find((order) => order.id === id);
      order.status = type;
    },
    approveOrder: (state, action) => {
      const id = action.payload;
      const order = state.orderList.find((order) => order.id === id);
      order.status = "Approved";
    },
    editOrder: (state, action) => {
      const { id, product } = action.payload;
      const orderIndex = state.orderList.findIndex((order) => order.id === id);
      let status = "";

      if (orderIndex.price !== product?.price) {
        status = "Price updated";
      }

      if (orderIndex.quantity !== product?.quantity) {
        status = "Quantity updated";
      }

      if (
        orderIndex.price !== product?.price &&
        orderIndex.quantity !== product?.quantity
      ) {
        status = "Price and Quantity updated";
      }

      state.orderList[orderIndex] = {
        ...state.orderList[orderIndex],
        ...product,
        status,
      };
    },
  },
  extraReducers: {},
});

export const { fetchData, updateMissingProduct, approveOrder, editOrder } =
  orderSlice.actions;
export default orderSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder } from './orderAPI';
import {fetchAllOrders,updateOrder } from './orderAPI';

const initialState = {
  orders: [],
  status: 'idle',
  lastOrder: null,
  totalOrders: 0,
};

export const updateOrderAsync = createAsyncThunk(
  'order/updateOrder',
  async (order) => {
    const response = await updateOrder(order);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchAllOrdersAsync = createAsyncThunk(
  'order/fetchAllOrders',
  async ({sort, pagination}) => {
    const response = await fetchAllOrders(sort,pagination);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async (order) => {
    const response = await createOrder(order);
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetLastOrder: (state) => {
      state.lastOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push( action.payload );
        state.lastOrder = action.payload;
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.totalOrders;
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index =  state.orders.findIndex(order=>order.id===action.payload.id)
        state.orders[index] = action.payload;
      })
  },
});

export const { resetLastOrder } = orderSlice.actions;

export const selectOrders = (state) => state.order.orders;
export const selectTotalOrders = (state) => state.order.totalOrders;

export const selectLastOrder = (state) => state.order.lastOrder;

export default orderSlice.reducer;

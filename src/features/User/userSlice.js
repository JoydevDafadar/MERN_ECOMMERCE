import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchOrders, fetchUser, updateUser } from './userAPI';

const initialState = {
  orders: [],
  status: 'idle',
  userInfo: null,
};

export const fetchOrdersAsync = createAsyncThunk(
  'user/fetchOrders',
  async (userId) => {
    // console.log( userId );
    const response = await fetchOrders(userId);
    // console.log( response.data );
    return response.data;
  }
);
export const fetchUserAsync = createAsyncThunk(
  'user/fetchUser',
  async (userId) => {
    // console.log( userId );
    const response = await fetchUser(userId);
    // console.log( response.data );
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (userData) => {
    const response = await updateUser(userData);
    return response.data;
  }
);


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders = action.payload;
      })
      .addCase(fetchUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      })
  },
});

export const { increment } = userSlice.actions;

export const selectOrdedrs = (state) => state.user.orders;
export const selecctUserInfo = (state) => state.user.userInfo;

export default userSlice.reducer;

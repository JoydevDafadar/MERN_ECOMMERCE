import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart, deleteCart, fetchCartItem, resetCart, updateCart } from './cartAPI';

const initialState = {
  items: [],
  status: 'idle',
};

export const addItemAsync = createAsyncThunk(
  'cart/addToCart',
  async (item) => {
    const response = await addToCart(item);
    return response.data;
  }
);
export const fetchItemAsync = createAsyncThunk(
  'cart/fetchItem',
  async (userId) => {
    const response = await fetchCartItem(userId);
    return response.data;
  }
);
export const updateCartAsync = createAsyncThunk(
  'cart/updateCart',
  async (item) => {
    const response = await updateCart(item);
    return response.data;
  }
);
export const deleteCartAsync = createAsyncThunk(
  'cart/deleteCart',
  async (itemId) => {
    const response = await deleteCart(itemId);
    return response.data;
  }
);
export const resetCartAsync = createAsyncThunk(
  'cart/resetCart',
  async (itemId) => {
    const response = await resetCart(itemId);
    // return response.data;
  }
);

export const counterSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItemAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(fetchItemAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        state.items[index] = action.payload;
      })
      .addCase(deleteCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        state.items.splice(index,1);
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetCartAsync.fulfilled, (state) => {
        state.status = 'idle';
        state.items = [];
      })
  },
});

export const { increment } = counterSlice.actions;

export const selectItem = (state) => state.cart.items;

export default counterSlice.reducer;

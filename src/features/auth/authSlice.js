import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser, cheackUser, updateUser, logoutUser, recheckUser } from './authAPI';

const initialState = {
  loggedinUser: null,
  status: 'idle',
  error: null,
};

export const checkUserAsync = createAsyncThunk(
  'auth/recheckUser',
  async() => {
    const res = await recheckUser();

    return res.data;
  }
)

export const signupUser = createAsyncThunk(
  'auth/createUser',
  async (userData, {rejectWithValue}) => {
    try {
      const response = await createUser(userData);
      return response.data;
      
    } catch (error) {
      // console.log( error );
      return rejectWithValue(error.data)
    }
  }
);

export const logoutUserAsync = createAsyncThunk(
  'auth/logoutUser',
  async (userId) => {
    const response = await logoutUser(userId);
    return response.data;
  }
);

export const signinUser = createAsyncThunk(
  'auth/checkuser',
  async (userData, {rejectWithValue}) => {

    try {
      const response = await cheackUser(userData);
      return response.data;
      
    } catch (error) {
      return rejectWithValue(error.data)
    }
  }
);

export const counterSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedinUser = action.payload.user;
        state.error = null;
      })
      .addCase(signupUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedinUser = action.payload.user;
        state.error = null;
        localStorage.setItem('e-commerce-token', action.payload.token);
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
        // console.log(action.payload)
      })
      .addCase(signinUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedinUser = action.payload.user.user;
        state.error = null;
        localStorage.setItem('e-commerce-token', action.payload.user.token);
      })
      .addCase(signinUser.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
        // console.log( action.payload );
      })
      .addCase(logoutUserAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(logoutUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedinUser = null;
        state.error = null;
        localStorage.removeItem('e-commerce-token')
      })
  },
});

export const { increment } = counterSlice.actions;

export const selectUser = (state) => state.auth.loggedinUser;
export const selectError = (state) => state.auth.error;

export default counterSlice.reducer;

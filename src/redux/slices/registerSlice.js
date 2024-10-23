import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const initialState = {
  data: JSON.parse(localStorage.getItem('login_status')) || false,
  loading: 'idle',
  error: null,
};

// Create an async thunk for fetching the department data
export const LoginStatus = createAsyncThunk('', async (data) => {
  try {
    return {
      data: data,
      success: true,
      code: 200,
    };
  } catch (error) {
    console.error('error', error);
  }
});

// Create a slice for the department
const login_StatusSlice = createSlice({
  name: 'login_Status',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(LoginStatus.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(LoginStatus.fulfilled, (state, action) => {
        const { code, success, data } = action.payload;
        if (code === 200 && success) {
          state.data = data;
          state.loading = 'succeed';
        } else {
          state.loading = 'failed';
        }
      })
      .addCase(LoginStatus.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message;
      });
  },
});

// Selector to access the department data
export const login_status = (state) => state.login_Status.data;

export default login_StatusSlice.reducer;

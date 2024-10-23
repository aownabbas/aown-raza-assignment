import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const initialState = {
  data: [],
  loading: 'idle',
  error: null,
};

// Create an async thunk for fetching the department data
export const CartSlice = createAsyncThunk('', async (data) => {
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
const CartSliceReducer = createSlice({
  name: 'addToCart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CartSlice.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(CartSlice.fulfilled, (state, action) => {
        const { code, success, data } = action.payload;
        if (code === 200 && success) {
          state.data = data;
          state.loading = 'succeed';
        } else {
          state.loading = 'failed';
        }
      })
      .addCase(CartSlice.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message;
      });
  },
});

// Selector to access the department data
export const addToCart = (state) => state.addToCart;

export default CartSliceReducer.reducer;

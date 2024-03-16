// redux/slices/userSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  userInfo: any; // You might want to define a more specific type for user information
}

const initialState: UserState = {
  isAuthenticated: false,
  loading: false,
  error: null,
  userInfo: null,
};

// Async thunk for handling user registration
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (formData: { email: string; password: string; name?: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, formData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message || 'Could not register');
    }
  }
);

// Async thunk for handling user login
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (formData: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, formData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message || 'Invalid login credentials');
    }
  }
);

// Async thunk for handling forgot-password logic
export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/forgot-password`, email);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message || 'Could not process forgot password request');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Reducer for handling user logout
    logout: (state) => {
      state.isAuthenticated = false;
      state.userInfo = null;
      // Add any additional logic here if needed, such as clearing local storage or tokens
    },
    // Add any other reducers that directly mutate the state here
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.loading = false;
        state.userInfo = action.payload; // Assuming the payload includes user info
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.loading = false;
        state.userInfo = action.payload; // Handle user data or token as needed
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally handle state changes for confirmation messages
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;

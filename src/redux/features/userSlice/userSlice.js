import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000";

// Async thunk to add a user
export const addUser = createAsyncThunk(
  "user/addUser",
  async (newUser, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/users`, newUser, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Async thunk to get all users
export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/users`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch users");
    }
  }
);

// Async thunk to get the current user
export const getCurrentUser = createAsyncThunk(
  "user/getCurrentUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/currentUser`, userData, {
        withCredentials: true,
      });
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch user");
    }
  }
);

// Async thunk to check if the user is an admin
export const checkAdmin = createAsyncThunk(
  "user/checkAdmin",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/isAdmin/${email}`);
      return response.data.isAdmin;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to check admin status"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    currentUser: null,
    isAdmin: false,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.data;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.data; 
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(checkAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAdmin = action.payload;
      })
      .addCase(checkAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000"; // Change this if needed

// Fetch all blogs
export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/blogs`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch blogs");
    }
  }
);

// Add a new blog
export const addBlog = createAsyncThunk(
  "blogs/addBlog",
  async (blogData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/blogs`, blogData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add blog");
    }
  }
);

// Delete a blog
export const deleteBlog = createAsyncThunk(
  "blogs/deleteBlog",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/blogs/${id}`);
      return id; // Return ID to remove from state
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete blog");
    }
  }
);

// Update a blog using the ID
export const updateBlog = createAsyncThunk(
  "blogs/updateBlog",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${BASE_URL}/blogs/approve/${id}`); 
      return response.data; // Assuming the backend returns the updated blog data
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update blog");
    }
  }
);

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addBlog.fulfilled, (state, action) => {
        state.blogs.push(action.payload);
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter((blog) => blog._id !== action.payload);
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.map((blog) =>
          blog._id === action.payload._id
            ? { ...blog, ...action.payload }
            : blog
        );
      });
  },
});

export default blogSlice.reducer;

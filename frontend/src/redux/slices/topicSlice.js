import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchTopics = createAsyncThunk("topics/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get("/topics");
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch topics");
  }
});

const topicSlice = createSlice({
  name: "topics",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopics.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTopics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default topicSlice.reducer;

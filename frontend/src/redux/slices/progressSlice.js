import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchProgress = createAsyncThunk("progress/fetch", async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get("/progress");
    return data.completedProblems || [];
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch progress");
  }
});

export const toggleProgress = createAsyncThunk(
  "progress/toggle",
  async (problemId, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`/progress/${problemId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update progress");
    }
  }
);

const progressSlice = createSlice({
  name: "progress",
  initialState: { completedProblems: [], loading: false, error: null, message: "" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProgress.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.completedProblems = action.payload;
      })
      .addCase(fetchProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(toggleProgress.fulfilled, (state, action) => {
        state.completedProblems = action.payload.completedProblems;
        state.message = action.payload.message;
      })
      .addCase(toggleProgress.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default progressSlice.reducer;

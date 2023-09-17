import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getSingleRaidForm = createAsyncThunk(
  "get/raidForm",
  async (id) => {
    try {
      const { data } = axios.get(`/api/raidform/${id}`);
      return data;
    } catch (error) {
      return error.message;
    }
  }
);

export const postRaidForm = createAsyncThunk("post/raidForm", async (info) => {
  try {
    const { data } = await axios.post("/api/raidform", info);
    return data;
  } catch (error) {
    return error.message;
  }
});

const raidformSlice = createSlice({
  name: "raidform",
  initialState: {
    raidform: [],
    createStatus: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSingleRaidForm.fulfilled, (state, action) => {
      state.raidform = action.payload;
    });
    builder.addCase(postRaidForm.fulfilled, (state, action) => {
      state.createStatus = action.payload;
    });
  },
});

export const getRaidForm = (state) => state.raidform.raidform;
export const getRaidFormCreateStatus = (state) => state.raidform.createStatus;

export default raidformSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createUser = createAsyncThunk("createUser", async (userInfo) => {
  try {
    const { data } = await axios.post("/api/user", userInfo);
    return data;
  } catch (err) {
    console.log(err);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const { setUser } = userSlice.actions;
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;

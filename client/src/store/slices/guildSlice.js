import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllGuilds = createAsyncThunk("fetchAllGuilds", async () => {
  try {
    const { data } = await axios.get("/api/guild");
    return data;
  } catch (err) {
    console.log(err);
  }
});

export const fetchSingleGuild = createAsyncThunk(
  "fetchSingleGuild",
  async (name) => {
    try {
      const { data } = await axios.get(`/api/guild/${name}`);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const fetchSingleGuildById = createAsyncThunk(
  "get/singleGuildById",
  async (id) => {
    try {
      const { data } = await axios.get(`/api/guild/id/${id}`);
      return data;
    } catch (error) {
      return error.message;
    }
  }
);

export const createGuild = createAsyncThunk("createGuild", async (info) => {
  try {
    const { data } = await axios.post("/api/guild", info);
    return data;
  } catch (err) {
    return err.message;
  }
});

export const deleteGuild = createAsyncThunk("deleteGuild", async (name) => {
  try {
    const { data } = await axios.delete(`/api/guild/${name}`);
    return data;
  } catch (err) {
    console.log(err);
  }
});

export const updateGuild = createAsyncThunk(
  "updateGuild",
  async ({ name, info }) => {
    try {
      const { data } = await axios.put(`/api/guild/${name}`, info);
      return data;
    } catch (err) {
      return err.message;
    }
  }
);

const guildSlice = createSlice({
  name: "guild",
  initialState: {
    allguild: [],
    singleguild: {},
    createStatus: null,
    updateStatus: null,
    error: null,
  },
  reducers: {
    resetCreateStatus(state, action) {
      state.createStatus = null;
    },
    resetUpdateStatus(state, action) {
      state.updateStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllGuilds.fulfilled, (state, action) => {
      state.allguild = action.payload;
    });
    builder.addCase(fetchSingleGuild.fulfilled, (state, action) => {
      state.singleguild = action.payload;
    });
    builder.addCase(fetchSingleGuildById.fulfilled, (state, action) => {
      state.singleguild = action.payload;
    });
    builder
      .addCase(createGuild.fulfilled, (state, action) => {
        console.log("action from fullfilled", action);
        state.createStatus = action.payload;
      })
      .addCase(createGuild.rejected, (state, action) => {
        console.log("action from rejected", action);
        state.createStatus = action.payload;
      });
    builder.addCase(deleteGuild.fulfilled, (state, action) => {
      state.singleguild = {};
    });
    builder.addCase(updateGuild.fulfilled, (state, action) => {
      state.updateStatus = action.payload;
    });
  },
});

export const selectAllGuilds = (state) => state.guild.allguild;
export const selectSingleGuild = (state) => state.guild.singleguild;
export const getGuildCreateStatus = (state) => state.guild.createStatus;
export const selectError = (state) => state.guild.error;
export const getGuildUpdateStatus = (state) => state.guild.updateStatus;
export const { resetCreateStatus, resetUpdateStatus } = guildSlice.actions;

export default guildSlice.reducer;

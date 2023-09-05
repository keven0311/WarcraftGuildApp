import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSingleCharacter = createAsyncThunk(
  "fetchSingleCharacter",
  async (name) => {
    try {
      const { data } = await axios.get(`/api/character/${name}`);
      return data;
    } catch (error) {
      return error.message;
    }
  }
);

export const fetchGuildCharacters = createAsyncThunk(
  "get/singleGuildCharacters",
  async (id) => {
    try {
      const { data } = await axios.get(`/api/character/guild/${id}`);
      return data;
    } catch (error) {}
  }
);

export const createCharacter = createAsyncThunk(
  "post/character",
  async (info) => {
    try {
      const { data } = await axios.post(`/api/character`, info);
      return data;
    } catch (err) {
      return err.message;
    }
  }
);

export const getUserCharacters = createAsyncThunk(
  "get/userCharacters",
  async (userId) => {
    try {
      const { data } = await axios.get(`/api/character/user/${userId}`);
      return data;
    } catch (err) {
      return err.message;
    }
  }
);

export const updateCharacter = createAsyncThunk(
  "put/character",
  async ({ server, name, info }) => {
    try {
      const { data } = await axios.put(
        `/api/character/${server}/${name}`,
        info
      );
      return data;
    } catch (err) {
      return err.message;
    }
  }
);

export const deleteCharacter = createAsyncThunk(
  "delete/character",
  async ({ server, name }) => {
    try {
      const { data } = await axios.delete(`/api/character/${server}/${name}`);
      return data;
    } catch (error) {
      return error.message;
    }
  }
);

const characterSlice = createSlice({
  name: "character",
  initialState: {
    singlecharacter: {},
    userCharacters: [],
    guildCharacters: [],
    createStatus: "",
    updateStatus: "",
    deleteStatus: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleCharacter.fulfilled, (state, action) => {
      state.singlecharacter = action.payload;
    });
    builder.addCase(createCharacter.fulfilled, (state, action) => {
      state.createStatus = action.payload;
    });
    builder.addCase(getUserCharacters.fulfilled, (state, action) => {
      state.userCharacters = action.payload;
    });
    builder.addCase(updateCharacter.fulfilled, (state, action) => {
      state.updateStatus = action.payload;
    });
    builder.addCase(deleteCharacter.fulfilled, (state, action) => {
      state.deleteStatus = action.payload;
    });
    builder.addCase(fetchGuildCharacters.fulfilled, (state, action) => {
      state.guildCharacters = action.payload;
    });
  },
});

export const selectSingleCharacter = (state) => state.character.singlecharacter;
export const getCharacterCreateStatus = (state) => state.character.createStatus;
export const selectUserCharacters = (state) => state.character.userCharacters;
export const getCharacterUpdateStatus = (state) => state.character.updateStatus;
export const getCharacterDeleteStatus = (state) => state.character.deleteStatus;
export const getSingleGuildCharacters = (state) =>
  state.character.guildCharacters;

export default characterSlice.reducer;

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

const characterSlice = createSlice({
  name: "character",
  initialState: {
    singlecharacter: {},
    userCharacters: [],
    createStatus: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleCharacter.fulfilled, (state, action) => {
      state.singlemember = action.payload;
    });
    builder.addCase(createCharacter.fulfilled, (state, action) => {
      state.createStatus = action.payload;
    });
    builder.addCase(getUserCharacters.fulfilled, (state, action) => {
      state.userCharacters = action.payload;
    });
  },
});

export const selectSingleMember = (state) => state.character.singlecharacter;
export const getCharacterCreateStatus = (state) => state.character.createStatus;
export const selectUserCharacters = (state) => state.character.userCharacters;

export default characterSlice.reducer;

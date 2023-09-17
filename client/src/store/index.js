import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import guildSlice from "./slices/guildSlice";
import characterSlice from "./slices/characterSlice";
import raidFormSlice from "./slices/raidFormSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    guild: guildSlice,
    character: characterSlice,
    raidform: raidFormSlice,
  },
});

export default store;

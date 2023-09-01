import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import guildSlice from "./slices/guildSlice";
import characterSlice from "./slices/characterSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    guild: guildSlice,
    character: characterSlice,
  },
});

export default store;

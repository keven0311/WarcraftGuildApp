import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import guildSlice from "./slices/guildSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    guild: guildSlice,
  },
});

export default store;

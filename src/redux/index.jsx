import { configureStore } from "@reduxjs/toolkit";
import personSlice from "./userSlice";

export const store = configureStore({
  reducer: {
    userReducer: personSlice,
  },
});

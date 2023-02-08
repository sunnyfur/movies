import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./reducers/moviesSlice";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
});

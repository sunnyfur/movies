import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  movie: null,
  isLoadingMovies: true,
  isLoadingMovie: true,
  serverError: null,
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    loadMoviesStart(state) {
      state.isLoadingMovies = true;
    },
    loadMoviesEnd(state, action) {
      state.isLoadingMovies = false;
      state.movies = action.payload;
    },
    loadMoviesError(state, action) {
      state.isLoadingMovies = false;
      state.serverError = action.payload;
    },
    loadMovieStart(state) {
      state.isLoadingMovie = true;
    },
    loadMovieEnd(state, action) {
      state.isLoadingMovie = false;
      state.movie = action.payload;
    },
    loadMovieError(state, action) {
      state.isLoadingMovie = false;
      state.serverError = action.payload;
    },
  },
});
export const moviesActions = moviesSlice.actions;
export default moviesSlice.reducer;

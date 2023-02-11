import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  movie: null,
  pagesCount: 9,
  currPage: 1,

  header: "Топ 250 фильмов",
  path: "/films/top",
  pathParams: {},
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
      state.movies = action.payload.movies;
      state.pagesCount = action.payload.pagesCount;
      state.currPage = action.payload.currPage;
      state.path = action.payload.path;
      state.pathParams = action.payload.pathParams;
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
    loadFiltersAll(state, action) {
      state.filtersAll = action.payload;
    },
    setHeader(state, action) {
      state.header = action.payload;
    },
  },
});

export const moviesActions = moviesSlice.actions;
export default moviesSlice.reducer;

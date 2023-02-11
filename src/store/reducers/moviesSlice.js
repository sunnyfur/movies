import { createSlice } from "@reduxjs/toolkit";
// const TOP_250_BEST_FILMS="Топ 250 фильмов";
const links = {
  top: {
    url: "/films/top",
    title: "Топ 250 фильмов",
  },
  people: {
    url: "/persons",
    title: "",
  },
};

const initialState = {
  movies: [],
  movie: null,
  pagesCount: 9,
  currPage: 1,
  filtersAll: { genres: [], countries: [] },
  type: links.top,
  header: "Топ 250 фильмов",
  url: "/films/top",
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
  },
});

export const moviesActions = moviesSlice.actions;
export default moviesSlice.reducer;
